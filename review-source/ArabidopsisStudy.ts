import {ArabidopsisUI} from "./ArabidopsisUI"
import {R35LeafSurfaces} from "./R35LeafSurfaces"
import {applyR25BotanicalOptics} from "./R25BotanicalOptics"
import {makeBuilder,addBox} from "./TwoOaksGeometry"
import {R27SpatialStation} from "./R27SpatialStation"
import {LessonEvent,LessonState,initialLesson,reduceLesson,presentLesson,R35_SCENES} from "./R35LessonState"
import {R35Illustrations,detailGuide,selectionRing,tag} from "./R35Illustrations"
import {R36SpecimenControl} from "./R36SpecimenControl"
const pos=(x:number,y:number,z=0)=>new vec3(x,y,z)
const smooth=(v:number)=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)}

@component
export class ArabidopsisStudy extends BaseScriptComponent {
  @input ui:ArabidopsisUI
  @input wildLeaf:ObjectPrefab
  @input smoothLeaf:ObjectPrefab
  @input trichome:ObjectPrefab
  @input stageMaterial:Material
  @input laboratory:SceneObject
  @input @allowUndefined inspectionKey:LightSource
  @input playbackSpeed:number=1
  @input @allowUndefined referenceWhole:ObjectPrefab
  @input @allowUndefined referenceCodon:ObjectPrefab
  @input @allowUndefined referencePair:ObjectPrefab
  @input @allowUndefined variantWhole:ObjectPrefab
  @input @allowUndefined variantCodon:ObjectPrefab
  @input @allowUndefined variantPair:ObjectPrefab
  @input @allowUndefined tissueCutaway:ObjectPrefab
  @input @allowUndefined outcomeSurface:ObjectPrefab
  @input @allowUndefined confocalNucleus:ObjectPrefab
  @input @allowUndefined ribosome80S:ObjectPrefab
  @input @allowUndefined gl1ReferenceProtein:ObjectPrefab
  @input @allowUndefined serineResidue:ObjectPrefab
  @input @allowUndefined phenylalanineResidue:ObjectPrefab
  private state:LessonState=initialLesson()
  private station!:R27SpatialStation
  private surface!:R35LeafSurfaces
  private illustrations!:R35Illustrations
  private leaves:SceneObject[]=[]
  private macro!:SceneObject
  private atom!:SceneObject
  private atomVisual:SceneObject|null=null
  private atomKey=""
  private atomTag!:Text
  private tags:Text[]=[]
  private group!:SceneObject
  private cue!:SceneObject
  private heldTarget:SceneObject|null=null
  private guides:SceneObject[]=[]
  private specimens:R36SpecimenControl[]=[]
  private ready=false
  private previous=""
  private brightness:{material:Material,property:string,original:vec4}[]=[]
  private emission:{material:Material,original:vec3}[]=[]
  private specimenLayer=LayerSet.makeUnique()
  private specimenCameras:Camera[]=[]
  private briefLight=-1
  onAwake(){
    if(!this.ui||!this.laboratory||!this.wildLeaf||!this.smoothLeaf||!this.trichome||!this.stageMaterial){print("[TwoOaks R35] Required scene binding missing");return}
    this.laboratory.enabled=true
    this.prepareRoom()
    this.cue=selectionRing(this.sceneObject,this.stageMaterial);this.assignSpecimenLayer(this.cue)
    this.ui.onPressFocus=(o,down)=>this.focus(o,down)
    this.group=this.node(this.sceneObject,"R35 lesson exhibits")
    const optics:SceneObject[]=[]
    for(let i=0;i<3;i++){
      const host=this.node(this.group,["Reference leaf","Unchanged S92F control","New rescued leaf"][i])
      const visual=(i===1?this.smoothLeaf:this.wildLeaf).instantiate(host);optics.push(visual)
      host.getTransform().setLocalRotation(quat.fromEulerAngles(-.27,.22,0));this.leaves.push(host)
      this.selectable(host,()=>{if(this.state.scene==="leaf")this.command("next")})
    }
    this.macro=this.node(this.group,"Branched trichome reconstruction")
    const hair=this.trichome.instantiate(this.macro);optics.push(hair)
    applyR25BotanicalOptics(optics)
    this.surface=new R35LeafSurfaces(this.group,this.outcomeSurface)
    for(const side of [-1,1])this.guides.push(detailGuide(this.group,this.stageMaterial,side))
    for(const o of this.surface.roots)this.selectable(o,()=>{if(this.state.scene==="leaf")this.command("next")})
    hair.getTransform().setLocalScale(vec3.one().uniformScale(128))
    this.macro.getTransform().setLocalRotation(quat.fromEulerAngles(-1.15,.1,-.08))
    this.atom=this.node(this.group,"GL1 atomic structural model")
    this.atomTag=tag(this.group,"Atomic caption","",pos(0,-11.5,5),94,65)
    for(let i=0;i<3;i++)this.tags.push(tag(this.group,"Exhibit label "+i,"",pos(0,-10,5),58,48))
    this.illustrations=new R35Illustrations(this.group,this.stageMaterial,{tissue:this.tissueCutaway,surface:this.outcomeSurface,nucleus:this.confocalNucleus,ribosome:this.ribosome80S,protein:this.gl1ReferenceProtein,ser:this.serineResidue,phe:this.phenylalanineResidue,referenceCodon:this.referenceCodon})
    for(const o of [this.macro,this.atom,...this.illustrations.rotatableModels])this.selectable(o,()=>{})
    this.assignSpecimenLayer(this.group);this.lightStudy()
    this.station=new R27SpatialStation(this,this.sceneObject,this.ui.sceneObject,this.stageMaterial,()=>this.dispatch({type:"explore"}))
    this.station.setFrameVisible(false)
    this.createEvent("OnStartEvent").bind(()=>{
      this.ui.onAction.add(raw=>this.command(this.ui.resolve(raw)));this.ready=true;this.render();this.enablePreviewPointer()
      print("[TwoOaks R35] lesson ready; GL1 model bindings="+this.prefabs().filter(Boolean).length+"/6")
    })
    this.createEvent("UpdateEvent").bind(()=>{if(this.ready){if(!this.ui.settingsOpen&&!this.ui.chaptersOpen)this.state=reduceLesson(this.state,{type:"tick",seconds:getDeltaTime()*this.playbackSpeed});this.render()}})
  }
  private enablePreviewPointer(){
    if(!global.deviceInfoSystem.isEditor())return
    // Editor touches use screen coordinates directly; hardware keeps native SIK.
    const visit=(o:SceneObject)=>{
      if(o.name==="MouseInteractor")o.enabled=false
      for(let i=0;i<o.getChildrenCount();i++)visit(o.getChild(i))
    }
    for(let i=0;i<global.scene.getRootObjectsCount();i++)visit(global.scene.getRootObject(i))
    let model:R36SpecimenControl|null=null,button:string|null=null,start:vec2|null=null,last:vec2|null=null,dragged=false
    let movingStation=false,stationDepth=0
    const camera=this.specimenCameras[0]
    this.createEvent("TouchStartEvent").bind(e=>{
      if(model)model.pointerEnd(true)
      if(button)this.ui.pointerFocus(button,false)
      const point=e.getTouchPosition();start=point;last=point;dragged=false;model=null;movingStation=false;button=this.ui.buttonAt(point,camera)
      if(button){this.ui.pointerFocus(button,true);return}
      if(this.ui.settingsOpen){
        const transform=this.station.grip.getTransform(),world=transform.getWorldTransform()
        const corners=[[-9,-2.25],[9,-2.25],[9,2.25],[-9,2.25]].map(p=>camera.worldSpaceToScreenSpace(world.multiplyPoint(new vec3(p[0],p[1],0))))
        movingStation=point.x>=Math.min(...corners.map(p=>p.x))&&point.x<=Math.max(...corners.map(p=>p.x))&&point.y>=Math.min(...corners.map(p=>p.y))&&point.y<=Math.max(...corners.map(p=>p.y))
        if(movingStation){stationDepth=transform.getWorldPosition().sub(camera.getSceneObject().getTransform().getWorldPosition()).length;return}
      }
      let best=Infinity
      for(const item of this.specimens){const score=item.screenScore(point,camera);if(score<best){best=score;model=item}}
      if(model)model.pointerStart()
    })
    this.createEvent("TouchMoveEvent").bind(e=>{
      if(!start||!last)return
      const point=e.getTouchPosition();if(point.sub(start).length>.006)dragged=true
      if(movingStation&&dragged){const t=this.station.root.getTransform();t.setWorldPosition(t.getWorldPosition().add(camera.screenSpaceToWorldSpace(point,stationDepth).sub(camera.screenSpaceToWorldSpace(last,stationDepth))))}
      if(model&&dragged)model.pointerMove(point.sub(last));last=point
    })
    this.createEvent("TouchEndEvent").bind(e=>{
      if(button){const key=button;this.ui.pointerFocus(key,false);if(!dragged&&this.ui.buttonAt(e.getTouchPosition(),camera)===key)this.command(this.ui.resolve(key))}
      if(model)model.pointerEnd();model=null;button=null;start=null;last=null;movingStation=false
    })
  }
  private prefabs(){return [this.referenceWhole,this.referenceCodon,this.referencePair,this.variantWhole,this.variantCodon,this.variantPair]}
  private node(parent:SceneObject,name:string){const o=global.scene.createSceneObject(name);o.setParent(parent);return o}
  private selectable(host:SceneObject,selected:()=>void){
    this.specimens.push(new R36SpecimenControl(this,host,
      ()=>this.state.mode==="explore"&&!this.state.evidenceOpen&&!this.ui.settingsOpen&&!this.ui.chaptersOpen,
      selected,(o,down)=>this.focus(o,down)))
  }
  private focus(target:SceneObject,down:boolean){
    if(!this.cue)return
    if(down){
      this.heldTarget=target
      const p=target.getTransform().getWorldPosition()
      this.cue.getTransform().setWorldPosition(p.add(pos(0,0,7)))
      this.cue.enabled=true
    }else if(this.heldTarget===target){this.cue.enabled=false;this.heldTarget=null}
  }
  private prepareRoom(){
    const cache=new Map<string,Material>()
    let monitor:RenderMeshVisual|null=null
    const visit=(o:SceneObject)=>{
      if(!o.enabled)return
      for(const visual of o.getComponents("Component.RenderMeshVisual") as RenderMeshVisual[]){
        if(o.name==="R12 computer screen")monitor=visual
        const mats:Material[]=[]
        for(const original of visual.materials){let mat=cache.get(original.uniqueIdentifier)
          if(!mat){mat=original.clone();cache.set(original.uniqueIdentifier,mat)
            const pass=mat.mainPass;
            if(/computer screen|spatiallab \/ screen/i.test(o.name)){if(pass.emissiveFactor!==undefined)pass.emissiveFactor=vec3.zero();if(pass.baseColorFactor!==undefined)pass.baseColorFactor=new vec4(.08,.16,.17,1);if(pass.baseColor!==undefined)pass.baseColor=new vec4(.08,.16,.17,1)}
            const property=pass.baseColorFactor!==undefined?"baseColorFactor":pass.baseColor!==undefined?"baseColor":""
            if(pass.emissiveFactor!==undefined)this.emission.push({material:mat,original:pass.emissiveFactor})
            if(property)this.brightness.push({material:mat,property,original:pass[property]})
          }
          if(original.name.toLowerCase().includes("glass")){mat.mainPass.depthWrite=false;visual.setRenderOrder(20)}mats.push(mat)
        }
        if(mats.length){visual.clearMaterials();for(const mat of mats)visual.addMaterial(mat)}
      }
      for(let i=0;i<o.getChildrenCount();i++)visit(o.getChild(i))
    }
    visit(this.laboratory)
    if(monitor)this.monitorDisplay(monitor)
    for(const [name,angles,strength] of [["R35 key",[24,-38,0],.82],["R35 rim",[-18,123,0],.46]] as [string,number[],number][]){
      const o=this.node(this.sceneObject,name);o.getTransform().setLocalRotation(quat.fromEulerAngles(...angles.map(v=>v*Math.PI/180) as [number,number,number]))
      const light=o.createComponent("Component.LightSource") as LightSource;light.lightType=LightType.Directional;light.color=pos(.97,.98,1);light.intensity=strength
    }
  }
  private monitorDisplay(screen:RenderMeshVisual){
    const lo=screen.worldAabbMin(),hi=screen.worldAabbMax(),size=hi.sub(lo).uniformScale(.5)
    const face=this.node(this.laboratory,"Bench monitor · idle display"),tr=face.getTransform()
    tr.setWorldPosition(lo.add(hi).uniformScale(.5).add(pos(0,0,.65)))
    tr.setWorldRotation(quat.quatIdentity());tr.setWorldScale(vec3.one())
    const mesh=makeBuilder(),indices:number[]=[]
    let index=addBox(mesh,indices,0,0,0,size.x,size.y,.04,[.024,.061,.060,1],0)
    // The quiet instrument readout covers only the physical monitor inside its bezel.
    for(let row=0;row<3;row++){
      const w=size.x*(.28-.055*row)
      index=addBox(mesh,indices,-size.x*.8+w,size.y*(.55-.24*row),.09,w,.19,.03,[.16,.32,.29,1],index)
    }
    mesh.appendIndices(indices)
    const visual=face.createComponent("Component.RenderMeshVisual") as RenderMeshVisual
    visual.mesh=mesh.getMesh();visual.mainMaterial=this.stageMaterial;mesh.updateMesh()
  }
  private assignSpecimenLayer(o:SceneObject){o.layer=this.specimenLayer;for(let i=0;i<o.getChildrenCount();i++)this.assignSpecimenLayer(o.getChild(i))}
  private lightStudy(){
    const visit=(o:SceneObject)=>{
      for(const c of o.getComponents("Component.Camera") as Camera[]){c.renderLayer=c.renderLayer.union(this.specimenLayer);this.specimenCameras.push(c)}
      for(const l of o.getComponents("Component.LightSource") as LightSource[]){
        if(o.name==="R35 key"||o.name==="R35 rim")l.renderLayer=this.specimenLayer
        else if(l.lightType===LightType.Envmap)l.renderLayer=l.renderLayer.union(this.specimenLayer)
        else l.renderLayer=l.renderLayer.except(this.specimenLayer)
      }
      for(let j=0;j<o.getChildrenCount();j++)visit(o.getChild(j))
    }
    for(let j=0;j<global.scene.getRootObjectsCount();j++)visit(global.scene.getRootObject(j))
    this.createEvent("LateUpdateEvent").bind(()=>{for(const c of this.specimenCameras)if(!c.renderLayer.contains(this.specimenLayer))c.renderLayer=c.renderLayer.union(this.specimenLayer)})
  }
  private dispatch(e:LessonEvent){this.state=reduceLesson(this.state,e);this.render()}
  command(id:string){
    const s=this.state
    if(id==="chapters"||id==="settings"){
      const open=id==="chapters"?!this.ui.chaptersOpen:!this.ui.settingsOpen
      this.ui.chaptersOpen=id==="chapters"&&open;this.ui.settingsOpen=id==="settings"&&open
      this.dispatch({type:"evidence",open:false});return
    }
    if(id.startsWith("chapter-")){
      const chapter=R35_SCENES.find(v=>v.id===id.slice(8));if(!chapter)return
      this.ui.chaptersOpen=false;this.ui.settingsOpen=false
      if(chapter.id===s.scene){this.render();return}
      this.dispatch({type:"go",scene:chapter.id});return
    }
    if(id==="lab"){this.ui.laboratoryVisible=!this.ui.laboratoryVisible;this.render();return}
    if(id==="source-page"){this.ui.evidencePage=1-this.ui.evidencePage;this.render();return}
    if(id==="view"){for(const item of this.specimens)item.reset();this.render();return}
    if(id==="home"||id==="reset"||(id==="next"&&s.scene==="conclusion")){
      this.ui.settingsOpen=false;this.ui.chaptersOpen=false;this.ui.evidencePage=0
      for(const item of this.specimens)item.reset();this.station.restorePlacement();this.dispatch({type:"reset"});return
    }
    if(id==="film"){this.dispatch({type:"start-demo"});return}
    if(id==="pause"){this.dispatch({type:s.playing?"pause":"resume"});return}
    if(id==="next"){this.dispatch({type:"next"});return}
    if(id==="back"||id==="explore"){this.dispatch({type:id});return}
    if(id==="retry"){this.dispatch({type:"restart-experiment"});return}
    if(id==="evidence"||id==="close"){this.ui.chaptersOpen=false;this.ui.settingsOpen=false;this.ui.evidencePage=0;this.dispatch({type:"evidence",open:id==="evidence"});return}
    if(id==="atomic"){this.dispatch({type:"representation",value:s.representation==="letters"?"atoms":"letters"});return}
    if(id==="variant"){this.dispatch({type:"compare-dna",variant:s.dna==="reference"?"S92F":"reference"});return}
    if(id==="detail"){this.dispatch({type:"representation",value:"atoms"});this.dispatch({type:"detail",value:s.detail==="whole"?"codon92":s.detail==="codon92"?"pair5":"whole"});return}
    if(id==="hair"||id==="smooth"){this.dispatch({type:"predict",value:id==="hair"?"trichomes":"no-trichomes"});return}
    if(id==="copy")this.dispatch({type:"add-working-copy"})
  }
  /** Used by the native capture/QA harness and the on-screen seek transport. */
  seek(seconds:number){this.dispatch({type:"seek",seconds})}
  get sceneStatus(){return {revision:35,scene:this.state.scene,seconds:this.state.seconds,playing:this.state.playing,mode:this.state.mode,prediction:this.state.prediction,copy:this.state.workingCopyAdded,growth:this.state.newLeafProgress,controlHair:false,lab:this.laboratory.enabled,atomic:this.atom.enabled?this.atomKey:"",assets:this.prefabs().filter(Boolean).length,evidence:this.state.evidenceOpen}}
  private model(s:LessonState){
    const visible=s.scene==="atoms"&&s.representation==="atoms";this.atom.enabled=visible
    this.atomTag.getSceneObject().enabled=s.scene==="atoms"
    if(s.scene!=="atoms")return
    this.atomTag.text=!visible?"Coding DNA     "+(s.dna==="reference"?"T C T":"T T T"):s.detail==="whole"?"GL1 DNA · 18 base pairs · model":"GL1 DNA · same position in both plants"
    if(!visible)return
    const k=s.dna+" "+s.detail
    if(k!==this.atomKey){if(this.atomVisual){this.atomVisual.destroy();this.atomVisual=null}
      const index=s.detail==="whole"?0:s.detail==="codon92"?1:2,asset=this.prefabs()[index+(s.dna==="S92F"?3:0)]
      if(asset){this.atomVisual=asset.instantiate(this.atom);this.assignSpecimenLayer(this.atomVisual);this.atomVisual.getTransform().setLocalScale(vec3.one().uniformScale(index===0?86:index===1?240:326))}
      else print("[TwoOaks R35] Missing atomic asset "+k)
      this.atomKey=k
      this.specimens.find(v=>v.host===this.atom)?.fit()
    }
    this.atom.getTransform().setLocalPosition(pos(s.detail==="whole"?0:13,5.7,0))
    this.atom.getTransform().setLocalRotation(s.detail==="whole"?quat.fromEulerAngles(.06,-.14,-.20):s.detail==="codon92"?quat.fromEulerAngles(.23,-.68,.02):quat.quatIdentity())
  }
  private label(j:number,value:string,x:number,y:number,size=80){
    const t=this.tags[j];t.getSceneObject().enabled=true;t.text=value;t.size=size*1.17;t.getSceneObject().getTransform().setLocalPosition(pos(x,y,5))
  }
  private leaf(i:number,x:number,y:number,scale:number){
    const o=this.leaves[i];o.enabled=true;o.getTransform().setLocalPosition(pos(x,y,0));o.getTransform().setLocalScale(vec3.one().uniformScale(scale))
  }
  private pair(x:number,y:number,scale:number,i:number){
    const o=this.surface.roots[i];o.enabled=true;o.getTransform().setLocalPosition(pos(x,y,3));o.getTransform().setLocalScale(vec3.one().uniformScale(scale))
  }
  private render(){
    if(!this.ready)return
    for(const item of this.specimens)item.before()
    const s=this.state,t=s.sceneSeconds
    this.ui.render(s);this.laboratory.enabled=this.ui.laboratoryVisible
    this.group.enabled=!s.evidenceOpen&&!this.ui.settingsOpen&&!this.ui.chaptersOpen
    this.station.setInteractive(this.ui.settingsOpen)
    if(s.evidenceOpen||this.ui.settingsOpen||this.ui.chaptersOpen){for(const item of this.specimens)item.after();return}
    const chapterChanged=this.previous!==s.scene;this.previous=s.scene
    const target=["nucleus","atoms","expression","regulation"].includes(s.scene)?.43:.84
    if(target!==this.briefLight){this.briefLight=target;for(const item of this.brightness){const x=item.original;item.material.mainPass[item.property]=new vec4(x.x*target,x.y*target,x.z*target,x.w)}for(const item of this.emission)item.material.mainPass.emissiveFactor=item.original.uniformScale(target*.8)}
    // Keep visible interactables continuously enabled throughout a chapter.
    if(chapterChanged){
      for(const o of this.leaves)o.enabled=false
      for(const o of this.surface.roots)o.enabled=false
      for(const label of this.tags)label.getSceneObject().enabled=false
      this.macro.enabled=false
    }
    const comparison=s.scene==="leaf"||s.scene==="conclusion"||s.scene==="rescue"
    for(let j=0;j<2;j++){
      const guide=this.guides[j]
      guide.enabled=comparison&&(s.scene!=="rescue"||j===0||(s.workingCopyAdded&&s.newLeafProgress>.65))
      if(guide.enabled)guide.getTransform().setLocalPosition(pos((j?1:-1)*(s.scene==="rescue"?14:15),0,0))
    }
    this.model(s);this.illustrations.update(s)
    if(s.scene==="leaf"||s.scene==="conclusion"){
      const k=s.scene==="leaf"?smooth(t/4):1
      for(let i=0;i<2;i++){const x=i?15:-15;this.leaf(i,x,12,.66-.12*k);this.pair(x,-2,1.45+.55*k,i)}
      if(s.scene==="conclusion")this.label(2,"GL1 DNA   →   GL1 protein   →   leaf hair",0,-11,88)
      else {this.label(0,"Branched hairs",-15,-11);this.label(1,"Smooth surface",15,-11)}
    }else if(s.scene==="microscopy"){
      this.macro.enabled=true;this.macro.getTransform().setLocalPosition(pos(-14,2,-6));this.macro.getTransform().setLocalScale(vec3.one().uniformScale(.96+.30*smooth(t/4)))
      this.label(0,"3D model · one trichome",-14,-11,56)
    }else if(s.scene==="evidence"){
      this.leaf(0,-23,6,.57);this.leaf(1,-12,6,.57)
      this.label(0,"01  Compare leaves",-17,-5,88)
      this.label(1,t>=3?"02   Read GL1 DNA":"",13,7,92)
      this.label(2,t>=7?"03   Test GL1 function":"",13,-3,92)
    }else if(s.scene==="rescue"){
      this.label(2,"Model experiment · early leaves",0,19,61)
      this.leaf(1,-14,12,.60);this.pair(-14,-4,1.65,1);this.label(0,"Variant control",-14,-10)
      this.leaves[2].enabled=s.workingCopyAdded
      const p=smooth(s.newLeafProgress)
      this.surface.roots[2].enabled=s.workingCopyAdded&&p>.12
      if(s.workingCopyAdded){
        this.leaf(2,14,12,Math.max(.01,.60*p))
        if(p>.12){this.pair(14,-4,1.65*(.55+.45*smooth((p-.12)/.45)),2);this.surface.setNewLeafGrowth(smooth((p-.25)/.65))}
        this.label(1,"New leaf + working GL1",14,-10,54)
      }
      if(!s.workingCopyAdded)this.label(1,s.prediction?(s.prediction==="trichomes"?"Prediction: trichomes":"Prediction: no trichomes"):"Predict the new leaf",14,4,83)
    }
    for(const item of this.specimens)item.after()
    if(chapterChanged)print("[TwoOaks R35] "+s.scene)
  }
}

