import {LessonState,R35_SCENES,presentLesson} from "./R35LessonState"
import {cues,evidence} from "./R35Copy"
import {ButtonPressCapture} from "./R28ButtonCapture"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {ElementContent} from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexAlignSelf, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"

const THEME_FONT=requireAsset("../Fonts/Inter.ttf") as Font
const SCALE = {heading:{size:132,weight:700},body:{size:106,weight:600},caption:{size:70,weight:550}}
type Role = keyof typeof SCALE
function applyTextRole(t:Text, role:Role,scale:number) {t.size=SCALE[role].size*scale;(t as Text & {weight?:number}).weight=SCALE[role].weight}

/** Break long teaching lines at phrases so the caption stays readable at rest. */
function readingLines(text:string){
  if(text.length<=45||text.includes("\n"))return text
  const middle=text.length/2
  const breaks=Array.from(text.matchAll(/ /g),m=>m.index as number).filter(i=>i>middle*.55&&i<middle*1.45)
  if(!breaks.length)return text
  const cost=(i:number)=>Math.abs(middle-i)-(/[.,?]/.test(text[i-1])?7:0)
  const i=breaks.reduce((a,b)=>cost(a)<cost(b)?a:b)
  return text.slice(0,i)+"\n"+text.slice(i+1)
}


@component
export class ArabidopsisUI extends BaseScriptComponent {
  @input textColor:vec4=new vec4(.94,.97,.91,1)
  @input textScale:number=1
  @input microscopyMaterial:Material
  @input leafDistributionMaterial:Material
  @input leafBaseMaterial:Material
  @input trichomeSEMmaterial:Material
  @input papillaSEMmaterial:Material
  @input cleanCapture:boolean=false
  private action=new Event<string>()
  readonly onAction=this.action.publicApi()
  private buttons=new Map<string,Button>()
  private labels:ElementContent[]=[]
  private head!:Text
  private copy!:Text
  private note!:Text
  onPressFocus:(target:SceneObject,active:boolean)=>void=()=>{}
  private footer!:SceneObject
  private source!:SceneObject
  private sourceTitle!:Text
  private sourceText!:Text
  private rail!:SceneObject
  private railDetail!:SceneObject
  private sourceFooter!:Text
  private credit!:Text
  private branchPointer!:SceneObject
  private basePointer!:SceneObject
  private guide!:Text
  private names=["Why is one leaf smooth?","One hair, one cell","Which gene helps hairs grow?","Inside one leaf cell","One letter in GL1","Reading the RNA","How a hair begins","Predict the next leaf","Why the leaves differ"]
  private cards=["microscopy","microscopy","gl1-evidence","nucleus","atomic-model","genetic-code","gl1-evidence","complementation","complementation"]
  private keys:string[]=[]
  settingsOpen=false
  chaptersOpen=false
  private chapters!:SceneObject
  private chapterLabels:ElementContent[]=[]
  private chapterNames=["Leaves","Trichomes","Why GL1?","Cell & nucleus","DNA change","RNA & protein","Hair development","Test prediction","Conclusion"]
  laboratoryVisible=true
  evidencePage=0
  private utilities!:SceneObject
  private lastSignature=""
  onAwake(){
    this.sceneObject.createComponent("Component.Canvas")
    const h=this.panel("R35 chapter",new vec3(0,25.1,3),56,true)
    this.note=this.text(h,"Origin","ARABIDOPSIS   /   SPATIAL GENETICS","caption",2.2)
    this.head=this.text(h,"Chapter","Leaf surfaces","heading",3.8)
    const body=this.panel("R35 caption",new vec3(0,-18.1,5),67,true)
    this.copy=this.text(body,"Visible teaching copy","","body",6.5)
    const controls=this.panel("R35 actions",new vec3(0,-25.5,5),72,false)
    this.footer=controls.getParent()
    const row=this.row(controls,"Action row",69,5)
    for(let j=0;j<5;j++)this.labels.push(this.button(row,"Action "+(j+1),"","r35-slot-"+j,j===1?16:j===3?14:10.5,j===1?"Primary":"Secondary"))
    const tools=this.panel("Study tools",new vec3(0,-32,5),72,false)
    this.utilities=tools.getParent()
    const toolsRow=this.row(tools,"Study tools row",69,4.6)
    for(const [action,label,width] of [["home","Home",9],["view","Reset view",13],["chapters","Chapters",13],["evidence","Evidence",12],["settings","Settings",12]] as [string,string,number][])
      this.button(toolsRow,"Tool "+action,label,action,width)
    const menu=this.panel("Chapter navigation",new vec3(0,3,14),68,true);this.chapters=menu.getParent()
    this.text(menu,"Navigation title","Choose a chapter","heading",3.6)
    this.text(menu,"Navigation guidance","Your prediction and result stay saved.","caption",2.4)
    for(let r=0;r<3;r++){
      const gridRow=this.row(menu,"Chapters "+(r+1),64,6.7)
      for(let col=0;col<3;col++){
        const j=r*3+col
        this.chapterLabels.push(this.button(gridRow,"Chapter "+R35_SCENES[j].id,"","chapter-"+R35_SCENES[j].id,19.5,"Secondary",6.3))
      }
    }
    this.text(menu,"Navigation footer","Home starts the lesson again.","caption",2.4)
    this.chapters.enabled=false
    const src=this.panel("R35 published evidence",new vec3(0,3,14),63,true);this.source=src.getParent()
    this.sourceTitle=this.text(src,"Evidence title","","heading",4);this.sourceText=this.text(src,"Evidence card","","body",18);this.sourceFooter=this.text(src,"Attribution","","caption",4)
    this.sourceText.size=83*this.textScale
    this.source.enabled=false
    const sem=this.panel("R35 published SEM",new vec3(16,2,7),28,true);this.rail=sem.getParent()
    const figure=this.evidencePicture(sem,"Suo A",this.trichomeSEMmaterial,23,20)
    this.branchPointer=this.marker(figure,"Branch marker",-1.5,2.8);this.basePointer=this.marker(figure,"Base marker",.0,-6.7)
    this.guide=this.text(sem,"Image comparison","Follow the branch","caption",2.4)
    this.credit=this.text(sem,"SEM credit","Suo et al. 2013 · Fig. 2A\nCC BY 3.0 · separate specimen","caption",5.4)
    this.rail.enabled=false
    const base=this.panel("R35 published base",new vec3(16,2,7),28,true);this.railDetail=base.getParent()
    this.evidencePicture(base,"Talbot B",this.leafBaseMaterial,23,15.76)
    this.text(base,"SEM base finding","Compare the common base","caption",2.4)
    this.text(base,"SEM base credit","Talbot & White 2013 · Fig. 1B\nCC BY 2.0 · separate specimen","caption",5.4)
    this.railDetail.enabled=false
    // UIKit creates its visual children after OnAwake. Protect each once.
    const protectedVisuals=new Set<string>();let warmFrames=0
    this.createEvent("LateUpdateEvent").bind(()=>{
      if(warmFrames++>90)return
      const visit=(o:SceneObject)=>{
        for(const v of o.getComponents("Component.RenderMeshVisual") as RenderMeshVisual[]){
          if(protectedVisuals.has(v.uniqueIdentifier))continue
          protectedVisuals.add(v.uniqueIdentifier)
          const mats=v.materials.map(m=>{const copy=m.clone();copy.mainPass.depthTest=false;copy.mainPass.depthWrite=false;return copy})
          v.clearMaterials();for(const m of mats)v.addMaterial(m);v.setRenderOrder(1000)
        }
        for(const t of o.getComponents("Component.Text") as Text[]){t.depthTest=false;t.setRenderOrder(1001)}
        for(let i=0;i<o.getChildrenCount();i++)visit(o.getChild(i))
      };visit(this.sceneObject)
    })
  }
  buttonAt(point:vec2,camera:Camera):string|null {
    for(const [key,button] of this.buttons){
      const host=button.getSceneObject();if(!host.isEnabledInHierarchy||button.inactive)continue
      const t=host.getTransform().getWorldTransform(),size=button.size
      let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity
      for(const x of [-size.x/2,size.x/2])for(const y of [-size.y/2,size.y/2]){
        const p=camera.worldSpaceToScreenSpace(t.multiplyPoint(new vec3(x,y,0)))
        x0=Math.min(x0,p.x);x1=Math.max(x1,p.x);y0=Math.min(y0,p.y);y1=Math.max(y1,p.y)
      }
      if(point.x>=x0&&point.x<=x1&&point.y>=y0&&point.y<=y1)return key
    }
    return null
  }
  pointerFocus(key:string,down:boolean){const button=this.buttons.get(key);if(button)this.onPressFocus(button.getSceneObject(),down)}
  resolve(action:string){return action.startsWith("r35-slot-")?this.keys[Number(action.slice(9))]||"":action}
  render(s:LessonState){
    const i=R35_SCENES.findIndex(a=>a.id===s.scene),chapter=R35_SCENES[i]
    const clock=s.mode==="demo"?s.seconds:Math.min(chapter.end-.02,chapter.start+s.sceneSeconds)
    const cue=cues.find(c=>clock>=Number(c[0])&&clock<Number(c[1]))||cues[cues.length-1]
    const t=s.sceneSeconds,v=presentLesson(s),demo=s.mode==="demo"
    const signature=[this.chaptersOpen,this.settingsOpen,this.laboratoryVisible,this.evidencePage,s.scene,cue[0],s.mode,s.playing,s.evidenceOpen,s.prediction,s.workingCopyAdded,v.experiment.feedback,s.newLeafProgress>=1,s.notice,s.dna,s.detail,s.representation,t>=11,t>=7,t>=4].join("|")
    if(signature===this.lastSignature)return
    this.lastSignature=signature
    this.note.text=(i===0?"ONE LETTER, A DIFFERENT LEAF":"ARABIDOPSIS")+"    /    "+String(i+1).padStart(2,"0")+" OF 09"
    this.head.text=i===0&&t>=7?"Leaf surfaces":i===2&&t>=6?"Testing GL1":this.names[i];this.copy.text=String(cue[2])
    if(s.scene==="atoms"&&!demo){
      if(s.representation==="letters")this.copy.text=s.dna==="reference"?"DNA has four letters. Find the middle C in TCT.":"The middle letter is now T. Read TTT."
      else if(s.detail==="whole")this.copy.text="These atoms form the same short piece of GL1 DNA."
      else this.copy.text=s.dna==="reference"?"The reference plant has C at this position.":"The variant has T instead. TCT becomes TTT."
    }
    if(s.scene==="rescue"){
      this.head.text=s.workingCopyAdded?"Test the prediction":"Will hairs return?"
      this.copy.text=s.workingCopyAdded?(s.newLeafProgress>=1?"Only the new leaf with working GL1 grows hairs.":"Compare the new leaf with the untreated control."):
        (s.prediction?"Add working GL1 to test your prediction.":"Predict the surface of the next leaf.")
      if(s.workingCopyAdded&&s.newLeafProgress>=1&&s.prediction==="no-trichomes")this.copy.text="You predicted a smooth leaf. The new leaf grew hairs."
      if(s.notice)this.copy.text=s.notice
    }
    this.copy.text=readingLines(this.copy.text)
    this.source.enabled=s.evidenceOpen||this.settingsOpen
    this.chapters.enabled=this.chaptersOpen
    for(let j=0;j<this.chapterLabels.length;j++){
      this.chapterLabels[j].text=String(j+1).padStart(2,"0")+(j===i?" · Current":"")+"\n"+this.chapterNames[j]
      this.chapterLabels[j].textSize=66*this.textScale
    }
    this.utilities.enabled=!this.cleanCapture||!demo
    this.rail.enabled=s.scene==="microscopy"&&!s.evidenceOpen&&!this.settingsOpen&&!this.chaptersOpen&&t<11
    this.railDetail.enabled=s.scene==="microscopy"&&!s.evidenceOpen&&!this.settingsOpen&&!this.chaptersOpen&&t>=11
    this.branchPointer.enabled=t<7;this.basePointer.enabled=t>=7;this.guide.text=t<7?"SEM · branches":"SEM · shared base"
    if(s.evidenceOpen){const card=evidence[this.cards[i] as keyof typeof evidence]
      this.sourceTitle.text=card[0];this.sourceText.text=card[this.evidencePage+1];this.sourceFooter.text=card[3]+"  ·  "+(this.evidencePage+1)+" / 2"}
    if(this.settingsOpen){
      this.sourceTitle.text="Study settings"
      this.sourceText.text="Drag a model to rotate it. Reset view restores its orientation.\n\nLaboratory "+(this.laboratoryVisible?"on":"off")+". You can move the station using its handle below."
      this.sourceFooter.text="Home returns to the first leaf."
    }
    let slots:[string,string][]=[]
    if(this.chaptersOpen){this.copy.text="Choose a section, or return to the lesson.";slots=[["chapters","Return"]]}
    else if(this.settingsOpen)slots=[["settings","Return"],["lab",this.laboratoryVisible?"Hide laboratory":"Show laboratory"],["view","Reset view"]]
    else if(s.evidenceOpen)slots=[["close","Return"],["source-page",this.evidencePage?"Previous":"Read more"]]
    else if(demo)slots=[["explore","Explore"],["pause",s.playing?"Pause":"Resume"],["evidence","Evidence"],["reset","Restart"]]
    else {
      slots=[["back","Back"],["next",i===8?"Replay":i===0?"Inspect hair":"Continue"]]
      if(i===4){slots.push(["atomic",s.representation==="letters"?"Atoms":"Letters"],["variant",s.dna==="reference"?"Show variant":"Reference"],["detail",s.detail==="whole"?"Codon":s.detail==="codon92"?"Pair":"Whole"])}
      else if(i===7&&!s.workingCopyAdded){slots=[["back","Back"],["copy",s.prediction?"Add working GL1":"Predict first"],["hair","Trichomes"],["smooth","No trichomes"],["evidence","Evidence"]]}
      else slots.push(["evidence","Evidence"],i===7?["retry","Try again"]:["film","Play film"],["reset","Reset"])
    }
    if(demo&&this.cleanCapture&&!s.evidenceOpen&&!this.settingsOpen&&!this.chaptersOpen)slots=[]
    this.footer.enabled=slots.length>0;this.keys=slots.map(pair=>pair[0])
    for(let j=0;j<this.labels.length;j++){const slot=slots[j];this.labels[j].text=slot?slot[1]:"";this.labels[j].textSize=(slot&&slot[0]==="smooth"?63:slot&&slot[1].length>12?62:68)*this.textScale;const button=this.buttons.get("r35-slot-"+j);if(button){
        button.getSceneObject().enabled=!!slot
        button.inactive=!!slot&&((slot[0]==="back"&&i===0)||(slot[0]==="copy"&&!s.prediction)||(slot[0]==="next"&&s.scene==="rescue"&&s.newLeafProgress<1))
      }}
  }
  private marker(fig:SceneObject,name:string,x:number,y:number){const o=this.obj(fig,name);o.getTransform().setLocalPosition(new vec3(x,y,.55));const t=o.createComponent("Component.Text") as Text;t.font=THEME_FONT;t.size=128;t.text="›";t.horizontalAlignment=HorizontalAlignment.Center;t.verticalAlignment=VerticalAlignment.Center;t.layoutRect=Rect.create(-2,2,-2,2);t.textFill.color=new vec4(.98,.72,.32,1);t.depthTest=false;return o}
  private evidencePicture(parent:SceneObject,name:string,material:Material,width:number,height:number):SceneObject{
    const o=this.item(parent,name,width,height)
    const b=new MeshBuilder([{name:"position",components:3},{name:"normal",components:3},{name:"texture0",components:2}]);b.topology=MeshTopology.Triangles;b.indexType=MeshIndexType.UInt16
    const w=width/2,h=height/2
    b.appendVerticesInterleaved([-w,-h,.15,0,0,1,0,0,w,-h,.15,0,0,1,1,0,w,h,.15,0,0,1,1,1,-w,h,.15,0,0,1,0,1]);b.appendIndices([0,1,2,0,2,3])
    const v=o.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;v.mesh=b.getMesh();if(material)v.mainMaterial=material;b.updateMesh();return o
  }
  private obj(parent:SceneObject,name:string):SceneObject {const o=global.scene.createSceneObject(name);o.setParent(parent);return o}
  private panel(name:string,position:vec3,width:number,backing=true):SceneObject {
    const host=this.obj(this.sceneObject,name);host.getTransform().setLocalPosition(position)
    const plate=backing?host.createComponent(BackPlate.getTypeName()) as BackPlate:null
    if(plate){
      plate.style="dark"
      plate.onInitialized.add(()=>this.makeBackingPassive(plate,host))
    }
    const content=this.obj(host,name+"Content");content.getTransform().setLocalPosition(new vec3(0,0,0.6))
    const f=content.createComponent(FlexLayout.getTypeName()) as FlexLayout
    f.autoDiscoverItemsOnStart=false
    f.onInitialized.add(()=>{f.width=width;f.height=-1;f.direction=FlexDirection.Column;f.alignItems=FlexAlign.Stretch;f.justifyContent=FlexJustify.Start;f.rowGap=0.3;f.paddingTop=f.paddingBottom=backing ? .25 : 0;f.paddingLeft=f.paddingRight=backing?1:0})
    if(plate)f.onLayoutComplete.add(r=>{plate.size=new vec2(r.containerWidth,r.containerHeight)})
    return content
  }
  /** Backings are visual only. Buttons on Content retain their own interactables.
   * BackPlate re-enables its managed components whenever its host is shown, and
   * InteractionPlane disabling alone does not disable its separate child collider. */
  private makeBackingPassive(plate:BackPlate,host:SceneObject){
    const disableBackingInteraction=()=>{
      plate.interactable.enabled=false
      const surfaceCollider=host.getComponent("Physics.ColliderComponent") as ColliderComponent
      if(surfaceCollider)surfaceCollider.enabled=false
      const plane=plate.interactionPlane
      if(plane){
        plane.enabled=false
        if(plane.collider)plane.collider.enabled=false
      }
    }
    disableBackingInteraction()
    // This handler is registered after BackPlate's own OnEnable handler.
    plate.createEvent("OnEnableEvent").bind(disableBackingInteraction)
    // Cover the runtime-created InteractionPlane's deferred OnStart lifecycle.
    const afterStart=plate.createEvent("DelayedCallbackEvent")
    afterStart.bind(disableBackingInteraction);afterStart.reset(0)
  }
  private item(parent:SceneObject,name:string,width:number,height:number):SceneObject {
    const host=this.obj(parent,name);const item=host.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth=width;item.overrideHeight=height;item.flexShrink=0;item.alignSelf=FlexAlignSelf.Center
    ;(parent.getComponent(FlexLayout.getTypeName()) as FlexLayout).addItems([item]);return host
  }
  private text(parent:SceneObject,name:string,value:string,role:Role,height:number):Text {
    const host=this.obj(parent,name), item=host.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideHeight=height;item.flexShrink=0;item.alignSelf=FlexAlignSelf.Stretch
    const text=host.createComponent("Component.Text") as Text
    text.text=value;text.font=THEME_FONT;text.textFill.color=this.textColor;text.depthTest=false;applyTextRole(text,role,this.textScale)
    text.layoutRect=Rect.create(-0.5,0.5,-0.5,0.5);text.horizontalAlignment=HorizontalAlignment.Center;text.verticalAlignment=VerticalAlignment.Center
    text.outlineSettings.enabled=true;text.outlineSettings.size=.22;text.outlineSettings.fill.color=new vec4(.027,.045,.047,1);text.horizontalOverflow=HorizontalOverflow.Wrap;text.verticalOverflow=VerticalOverflow.Shrink
    ;(parent.getComponent(FlexLayout.getTypeName()) as FlexLayout).addItems([item]);return text
  }
  private row(parent:SceneObject,name:string,width:number,height:number):SceneObject {
    const host=this.item(parent,name,width,height),f=host.createComponent(FlexLayout.getTypeName()) as FlexLayout
    f.autoDiscoverItemsOnStart=false
    f.onInitialized.add(()=>{f.width=width;f.height=height;f.direction=FlexDirection.Row;f.justifyContent=FlexJustify.Center;f.alignItems=FlexAlign.Center;f.columnGap=1.5})
    return host
  }
  private button(parent:SceneObject,name:string,label:string,action:string,width=10,style="Secondary",height=4.6):ElementContent {
    const host=this.item(parent,name,width,height),b=host.createComponent(Button.getTypeName()) as Button
    this.buttons.set(action,b)
    b.setVariant({theme:"SnapOS2",shape:"Capsule",style})
    b.onInitialized.add(()=>{b.size=new vec3(width,height,1)})
    const ec=host.createComponent(ElementContent.getTypeName()) as ElementContent
    ec.text=label;ec.textSize=68*this.textScale;ec.autoResize=false
    // A release delivered after a target changes is not a click on the new button.
    // Pair down/up on this button and the same hand; cancel when it disappears.
    const press=new ButtonPressCapture()
    b.onInitialized.add(()=>{
      // Listen to each hand's capture rather than UIKit's aggregate pressed
      // state: the other hand may still hover when this hand releases.
      b.interactable.onInteractorTriggerStart.add(e=>{press.begin(e.interactor);this.onPressFocus(host,true)})
      b.interactable.onInteractorTriggerEnd.add(e=>{
        this.onPressFocus(host,false)
        const clicked=press.end(e.interactor)
        if(clicked&&host.isEnabledInHierarchy&&!b.inactive){print("[ArabidopsisInput] button="+name+" action="+action);this.action.invoke(action)}
      })
    })
    b.onInitialized.add(()=>{
      // Explicit near/far pinch: crossing the compact dock with an open hand
      // must not poke neighbouring controls before the intended pinch starts.
      // MouseInteractor still uses the same indirect interaction path in Preview.
      b.interactable.targetingMode=3
      b.interactable.allowMultipleInteractors=true
      b.interactable.onTriggerCanceled.add(e=>{press.cancel(e.interactor);this.onPressFocus(host,false)})
      b.interactable.onInteractorTriggerEndOutside.add(e=>{press.cancel(e.interactor);this.onPressFocus(host,false)})
      b.createEvent("OnDisableEvent").bind(()=>{press.cancel();this.onPressFocus(host,false)})
    })
    return ec
  }
}

