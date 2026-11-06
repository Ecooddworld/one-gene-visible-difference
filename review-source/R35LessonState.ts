/** Engine-independent R35 lesson logic. Shared by Explore and the native guided walkthrough. */
export type SceneId = 'leaf'|'microscopy'|'evidence'|'nucleus'|'atoms'|'expression'|'regulation'|'rescue'|'conclusion'
export type Prediction = 'trichomes'|'no-trichomes'
export type LessonState = {
  mode:'explore'|'demo', playing:boolean, seconds:number, scene:SceneId, sceneSeconds:number,
  dna:'reference'|'S92F', representation:'letters'|'atoms', detail:'whole'|'codon92'|'pair5',
  prediction:Prediction|null, workingCopyAdded:boolean, newLeafProgress:number,
  evidenceOpen:boolean, notice:string, comparedVariants:boolean
}
export type LessonEvent =
  {type:'tick',seconds:number}|{type:'next'}|{type:'back'}|{type:'go',scene:SceneId}|
  {type:'compare-dna',variant:'reference'|'S92F'}|
  {type:'representation',value:'letters'|'atoms'}|{type:'detail',value:'whole'|'codon92'|'pair5'}|
  {type:'predict',value:Prediction}|{type:'add-working-copy'}|{type:'restart-experiment'}|
  {type:'evidence',open:boolean}|{type:'start-demo'}|{type:'pause'}|{type:'resume'}|
  {type:'seek',seconds:number}|{type:'explore'}|{type:'reset'}

export const R35_DURATION=170
export const R35_SCENES:readonly {id:SceneId,start:number,end:number}[]=[
  {id:'leaf',start:0,end:15},{id:'microscopy',start:15,end:33},
  {id:'evidence',start:33,end:46},{id:'nucleus',start:46,end:64},
  {id:'atoms',start:64,end:88},{id:'expression',start:88,end:117},
  {id:'regulation',start:117,end:138},{id:'rescue',start:138,end:159},
  {id:'conclusion',start:159,end:170}
]
const clamp=(value:number,lo:number,hi:number)=>Math.min(hi,Math.max(lo,value))
const progress=(seconds:number,start:number,duration:number)=>clamp((seconds-start)/duration,0,1)
const COMPLEMENT:Record<string,string>={A:'T',C:'G',G:'C',T:'A'}

export function initialLesson():LessonState {
  return {mode:'explore',playing:false,seconds:0,scene:'leaf',sceneSeconds:0,
    dna:'reference',representation:'letters',detail:'whole',prediction:null,
    workingCopyAdded:false,newLeafProgress:0,evidenceOpen:false,notice:'',comparedVariants:false}
}

/** Demonstration is explicitly scripted, not falsely logged as human input. */
export function demoAt(seconds:number):LessonState {
  if(!Number.isFinite(seconds))throw new Error('A finite playback time is required')
  const t=clamp(seconds,0,R35_DURATION)
  const scene=R35_SCENES.find(s=>t>=s.start&&t<s.end)||R35_SCENES[R35_SCENES.length-1]
  return {...initialLesson(),mode:'demo',playing:t<R35_DURATION,seconds:t,scene:scene.id,sceneSeconds:t-scene.start,
    representation:t>=71?'atoms':'letters',detail:t>=78?'codon92':'whole',
    dna:t>=83?'S92F':'reference',comparedVariants:t>=83,
    prediction:t>=146?'trichomes':null,workingCopyAdded:t>=150,newLeafProgress:progress(t,150,4)}
}

function enter(state:LessonState,scene:SceneId):LessonState {
  const target=R35_SCENES.find(s=>s.id===scene)
  if(!target)throw new Error('Unknown lesson scene')
  return {...state,mode:'explore',playing:false,scene,sceneSeconds:0,seconds:target.start,evidenceOpen:false,notice:''}
}

export function reduceLesson(state:LessonState,event:LessonEvent):LessonState {
  if(event.type==='reset')return initialLesson()
  if(event.type==='start-demo')return demoAt(0)
  if(event.type==='seek')return {...demoAt(event.seconds),playing:state.mode==='demo'&&state.playing&&!state.evidenceOpen&&event.seconds<R35_DURATION,evidenceOpen:state.evidenceOpen}
  if(event.type==='pause')return {...state,playing:false}
  if(event.type==='resume')return {...state,playing:state.mode==='demo'&&state.seconds<R35_DURATION&&!state.evidenceOpen}
  if(event.type==='evidence')return {...state,evidenceOpen:event.open}
  if(event.type==='explore')return {...state,mode:'explore',playing:false,notice:''}
  if(event.type==='tick'){
    if(!Number.isFinite(event.seconds)||event.seconds<0)throw new Error('A nonnegative finite frame interval is required')
    if(state.evidenceOpen)return state
    if(state.mode==='demo')return state.playing?demoAt(state.seconds+event.seconds):state
    return {...state,sceneSeconds:state.sceneSeconds+event.seconds,
      newLeafProgress:state.workingCopyAdded?clamp(state.newLeafProgress+event.seconds/4,0,1):0}
  }
  if(event.type==='go')return enter(state,event.scene)
  if(event.type==='back'){
    const i=R35_SCENES.findIndex(s=>s.id===state.scene)
    return enter(state,R35_SCENES[Math.max(0,i-1)].id)
  }
  if(event.type==='next'){
    if(state.scene==='rescue'&&state.newLeafProgress<1)
      return {...state,notice:state.prediction===null?'Make a prediction first.':!state.workingCopyAdded?'Add a working GL1 copy to test it.':'Watch the new leaf develop.'}
    const i=R35_SCENES.findIndex(s=>s.id===state.scene)
    return enter(state,R35_SCENES[Math.min(R35_SCENES.length-1,i+1)].id)
  }
  if(state.evidenceOpen)return state
  if(event.type==='restart-experiment')return state.scene==='rescue'?{...enter(state,'rescue'),prediction:null,workingCopyAdded:false,newLeafProgress:0}:state
  const s={...state,mode:'explore' as const,playing:false,notice:''}
  if(event.type==='compare-dna'){
    if(state.scene!=='atoms'&&state.scene!=='expression')return state
    return {...s,dna:event.variant,comparedVariants:state.comparedVariants||state.dna!==event.variant}
  }
  if(event.type==='representation')return state.scene==='atoms'?{...s,representation:event.value}:state
  if(event.type==='detail')return state.scene==='atoms'?{...s,detail:event.value}:state
  if(event.type==='predict')return state.scene==='rescue'&&!state.workingCopyAdded?{...s,prediction:event.value}:state
  if(event.type==='add-working-copy'){
    if(state.scene!=='rescue'||state.workingCopyAdded)return state
    if(state.prediction===null)return {...state,notice:'Predict the surface of the next leaf.'}
    return {...s,workingCopyAdded:true,newLeafProgress:0}
  }
  return state
}

/** A single presentation contract keeps every view on the same biological state. */
export function presentLesson(s:LessonState){
  const variant=s.dna==='S92F'
  const sequence=variant?'TGGTTTTTGATAGCTAAA':'TGGTCTTTGATAGCTAAA'
  const template=sequence.split('').map(x=>COMPLEMENT[x]).join('')
  const rna=sequence.replace(/T/g,'U')
  const expression=s.scene==='expression'
  const resultReady=s.workingCopyAdded&&s.newLeafProgress>=1
  return {
    laboratoryVisible:true,narration:false,music:false,scene:s.scene,
    atomic:{state:s.dna,sequence5to3:sequence,templateAligned3to5:template,selectedBase1Based:5,
      visible:s.scene==='atoms',
      representation:s.representation,detail:s.detail,classification:'GL1 DNA fragment · structural model',
      variantAction:'Compare variants',sourceCoordinatesMustNotBeWarped:true},
    expression:{visible:expression,dnaStaysVisible:true,templateUsed:true,
      rna5to3:rna,codonDNA:sequence.slice(3,6),codonRNA:rna.slice(3,6),
      aminoAcid:variant?'Phenylalanine':'Serine',proteinPosition:92,proteinStillPresent:true,
      comparison:[{state:'reference',dna:'TCT',rna:'UCU',aminoAcid:'Serine'},
                  {state:'S92F',dna:'TTT',rna:'UUU',aminoAcid:'Phenylalanine'}],
      transcriptionProgress:progress(s.sceneSeconds,0,9),ribosomeProgress:progress(s.sceneSeconds,9,13),
      aminoAcidAdded:s.sceneSeconds>=22},
    leaves:{referenceHasTrichomes:true,originalVariantHasTrichomes:false,
      newExperimentalLeafVisible:s.workingCopyAdded,newExperimentalLeafProgress:s.newLeafProgress,
      newExperimentalLeafHasTrichomes:resultReady,stage:'early developing leaf'},
    experiment:{label:'Model experiment',intervention:'Add a working GL1 copy',
      originalVariantUnchanged:true,originalMutationReversed:false,
      prediction:s.prediction,canAddCopy:s.scene==='rescue'&&s.prediction!==null&&!s.workingCopyAdded,
      feedback:!resultReady?null:s.prediction==='trichomes'?'Prediction supported':'Revise your prediction: the new leaf develops trichomes.'},
    controls:{canBack:s.scene!=='leaf',canNext:s.scene!=='conclusion'&&(s.scene!=='rescue'||resultReady),
      canReset:true,evidenceOpen:s.evidenceOpen,automaticSceneAdvance:s.mode==='demo'&&s.playing&&!s.evidenceOpen},
    notice:s.notice
  }
}
