import {Interactable} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import {InteractableManipulation} from "SpectaclesInteractionKit.lspkg/Components/Interaction/InteractableManipulation/InteractableManipulation"
import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import {makeBuilder,addBox} from "./TwoOaksGeometry"

/** One world-anchored parent for lesson + controls. No surface detection or
 * physical tabletop is required; translation uses the native SIK grab. */
export class R27SpatialStation{
  readonly root:SceneObject
  readonly grip:SceneObject
  private frame:SceneObject
  private originalPosition:vec3
  private originalRotation:quat
  constructor(owner:BaseScriptComponent,study:SceneObject,ui:SceneObject,material:Material,onGrab:()=>void){
    const st=study.getTransform();this.originalPosition=st.getWorldPosition();this.originalRotation=st.getWorldRotation()
    this.root=global.scene.createSceneObject("R27_SpatialLearningStation")
    this.root.getTransform().setWorldPosition(this.originalPosition)
    this.root.getTransform().setWorldRotation(this.originalRotation)
    for(const o of [study,ui]){const t=o.getTransform(),p=t.getWorldPosition(),r=t.getWorldRotation(),s=t.getWorldScale();o.setParent(this.root);t.setWorldPosition(p);t.setWorldRotation(r);t.setWorldScale(s)}
    this.frame=global.scene.createSceneObject("StationOutline");this.frame.setParent(this.root)
    const b=makeBuilder(),ix:number[]=[];let n=0
    // Light frame corners give a stable spatial reference without an opaque room.
    for(const side of [-1,1]){
      n=addBox(b,ix,side*23,-16,0,2.2,.055,.055,[.46,.75,.65,1],n)
      n=addBox(b,ix,side*25.15,-14.5,0,.055,1.5,.055,[.46,.75,.65,1],n)
      n=addBox(b,ix,side*25.15,-16,-2,.055,.055,2,[.26,.48,.43,1],n)
    }
    b.appendIndices(ix);const v=this.frame.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;v.mesh=b.getMesh();v.mainMaterial=material;b.updateMesh()
    this.grip=global.scene.createSceneObject("MoveStationHandle");this.grip.setParent(this.root);this.grip.getTransform().setLocalPosition(new vec3(0,-36,5))
    const g=makeBuilder(),gi:number[]=[];addBox(g,gi,0,0,0,8,1.8,.20,[.19,.32,.29,1],0);g.appendIndices(gi)
    const gv=this.grip.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;gv.mesh=g.getMesh();gv.mainMaterial=material;g.updateMesh()
    const label=global.scene.createSceneObject("MoveStationLabel");label.setParent(this.grip);label.getTransform().setLocalPosition(new vec3(0,0,.25))
    const text=label.createComponent("Component.Text") as Text;text.font=requireAsset("../Fonts/Inter.ttf") as Font;text.text="Move station";text.size=42;text.layoutRect=Rect.create(-7.8,7.8,-1.7,1.7);text.horizontalAlignment=HorizontalAlignment.Center;text.verticalAlignment=VerticalAlignment.Center;text.textFill.color=new vec4(.91,.98,.94,1)
    const c=this.grip.createComponent("Physics.ColliderComponent") as ColliderComponent,s=Shape.createBoxShape();s.size=new vec3(18,4.5,3);c.shape=s;c.intangible=false
    const i=this.grip.createComponent(Interactable.getTypeName()) as Interactable;i.colliders=[c];i.allowMultipleInteractors=false;i.enableInstantDrag=true
    const m=this.grip.createComponent(InteractableManipulation.getTypeName()) as InteractableManipulation;m.setManipulateRoot(this.root.getTransform());m.setCanTranslate(true);m.setCanRotate(false);m.setCanScale(false);m.useFilter=true
    owner.createEvent("OnStartEvent").bind(()=>{
      this.fitToView()
      m.setNewInteractable(i);m.onManipulationStart.add(onGrab)
      m.onManipulationEnd.add(()=>{
        const cam=WorldCameraFinderProvider.getInstance().getComponent().getSceneObject().getTransform().getWorldPosition(),t=this.root.getTransform(),delta=t.getWorldPosition().sub(cam),d=delta.length
        if(d>1e-4)t.setWorldPosition(cam.add(delta.uniformScale(Math.max(80,Math.min(170,d))/d)))
        this.fitToView()
      })
    })
  }
  /** Reserve a border inside the device field of view. This changes the whole
   * station once on placement, never the user's specimen rotation or zoom. */
  private fitToView(){
    const camera=WorldCameraFinderProvider.getInstance().getComponent()
    const distance=this.root.getTransform().getWorldPosition().sub(camera.getSceneObject().getTransform().getWorldPosition()).length
    const height=2*distance*Math.tan(camera.fov/2),width=height*camera.aspect
    const scale=Math.min(1,Math.max(.35,Math.min(width*.85/74,height*.85/76)))
    this.root.getTransform().setWorldScale(vec3.one().uniformScale(scale))
  }
  setInteractive(value:boolean){this.grip.enabled=value}
  setFrameVisible(value:boolean){this.frame.enabled=value}
  restorePlacement(){
    this.root.getTransform().setWorldPosition(this.originalPosition)
    this.root.getTransform().setWorldRotation(this.originalRotation)
    this.fitToView()
  }
  recenter(){
    const camera=WorldCameraFinderProvider.getInstance().getComponent().getSceneObject().getTransform()
    const t=this.root.getTransform(),rotation=camera.getWorldRotation()
    t.setWorldPosition(camera.getWorldPosition().add(rotation.multiplyVec3(new vec3(0,-3,-110))))
    t.setWorldRotation(rotation)
    this.fitToView()
  }
}
