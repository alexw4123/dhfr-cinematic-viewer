// This application illustration is separate from the source-coordinate NGL explorer.
const host = document.querySelector('#application-tour');
const canvasHost = document.querySelector('#application-canvas');
const stepButtons = [...host.querySelectorAll('[data-application-step]')];
const replay = document.querySelector('#application-replay');
const fallback = document.querySelector('#application-fallback');
const sourceLink = document.querySelector('#application-source');
const targetControls = document.querySelector('#application-target-buttons');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const sources = {
  label: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a',
  project: 'https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit',
  folate: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3823643/'
};
const stages = [
  { title: 'Delivery comes before the target', label: '01 / A delivery route', copy: 'Some established DHFR medicines, including methotrexate, have injectable formulations. This upper-arm intramuscular scene illustrates a delivery route; no route has been tested for these GS or isog candidates.', detail: 'A model fitted into an enzyme pocket is still far from a medicine. Formulation, stability, absorption, and safe exposure would have to be established before considering any administration route.', source: sources.label, sourceTitle: 'Established medicine: official methotrexate label ↗', scene: 'Delivery context', figure: 'Illustrative anatomy · IM route example', help: 'Drag horizontally to inspect · Select a step to continue', labels: ['Upper-arm muscle', 'Illustrative route'] },
  { title: 'Reach tissue. Cross the cell membrane.', label: '02 / Reaching the cell', copy: 'A candidate would need to remain intact, reach tissue, and enter cells before it could act on intracellular DHFR. Absorption, distribution, and cellular uptake still need to be studied for GS and isog.', detail: 'The moving marker shows the question to investigate, not a measured route or an uptake result. The vascular and cell compartments are simplified and not to scale.', source: sources.project, sourceTitle: 'Read the candidate preparation report ↗', scene: 'Exposure and cell entry', figure: 'Physiological schematic · uptake is unmeasured', help: 'An illustrative route, not a transport simulation', labels: ['Tissue exposure', 'Cell boundary'] },
  { title: 'The research target is human DHFR', label: '03 / The molecular target', copy: 'DHFR regenerates reduced folates needed for nucleotide production. GS and isog are modeled near the enzyme’s pocket with NADPH; that starting pose does not establish binding or inhibition.', detail: 'This inset uses the actual complex coordinates: the enzyme backbone, NADPH, and the complete candidate with explicit source bonds. Switch the candidate or use the full atomic explorer above to inspect every atom.', source: sources.project, sourceTitle: 'Read the five-model preparation report ↗', scene: 'Source-coordinate target inset', figure: 'Actual model coordinates · no binding trajectory', help: 'Drag to inspect · GS / isog changes this inset only', labels: ['Human DHFR', 'Modeled candidate'] },
  { title: 'Why cancer research studies this pathway', label: '04 / Relevance and testing', copy: 'DHFR inhibition can interrupt the reduced-folate supply that supports DNA synthesis. That makes the enzyme an established cancer-treatment target; it does not make these candidates cancer treatments.', detail: 'Next come enzyme inhibition, cellular uptake and response, selectivity, and safety studies. Normal proliferating cells can also be affected. The DNA segment represents a downstream pathway, not measured anticancer activity.', source: sources.folate, sourceTitle: 'Read the primary DHFR and folate context ↗', scene: 'Target to biological question', figure: 'Pathway illustration · candidate effects unmeasured', help: 'Test inhibition → uptake → cell response → selectivity', labels: ['Reduced-folate supply', 'DNA synthesis context'] }
];
let active = 0, selectedTarget = 'gs', visible = false, destroyed = false, modelLoadFailed = false;
let renderer, scene, camera, THREE, stageGroups = [], labels = [], targetGroup, targetModels = {};
let raf = 0, started = 0, motionDuration = 1600, dragStart, dragAngle = 0;
const animated = [];

function setStage(index, play = true) {
  active = Math.max(0, Math.min(3, index));
  host.dataset.applicationStep = String(active);
  const stage = stages[active];
  stepButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
  document.querySelector('#application-caption-number').textContent = stage.label;
  document.querySelector('#application-title').textContent = stage.title;
  document.querySelector('#application-copy').textContent = stage.copy;
  document.querySelector('#application-detail').textContent = stage.detail;
  document.querySelector('#application-scene-title').textContent = stage.scene;
  document.querySelector('#application-figure-context').textContent = stage.figure;
  document.querySelector('#application-help').textContent = stage.help;
  sourceLink.href = stage.source; sourceLink.textContent = stage.sourceTitle;
  targetControls.hidden = active !== 2;
  if (renderer) {
    fallback.hidden = active !== 2 || !modelLoadFailed;
    if (!fallback.hidden) fallback.textContent = 'The molecular inset could not load. Read the caption here or use the atomic explorer above.';
  }
  document.querySelector('#application-coordinate-note').textContent = active === 2 && targetModels.gs ? `${selectedTarget === 'gs' ? 'GS' : 'isog'} complex · actual source coordinates` : 'Source-coordinate molecular inset in step 03';
  canvasHost.setAttribute('aria-label', `${stage.scene}. ${stage.figure}. Drag horizontally to inspect. Arrow keys rotate; Home resets.`);
  dragAngle = 0;
  stageGroups.forEach((group, i) => { group.visible = i === active; group.rotation.y = 0; });
  if (labels.length) { labels[0].textContent = stage.labels[0]; labels[1].textContent = active === 2 ? `${selectedTarget === 'gs' ? 'GS' : 'isog'} candidate` : stage.labels[1]; }
  if (play) startMotion(); else render(1);
}
stepButtons.forEach((button, i) => {
  button.addEventListener('click', () => setStage(i));
  button.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (direction) { event.preventDefault(); const next = (i + direction + 4) % 4; stepButtons[next].focus(); setStage(next); }
  });
});
replay.addEventListener('click', () => startMotion());
targetControls.querySelectorAll('[data-application-target]').forEach(button => button.addEventListener('click', () => {
  selectedTarget = button.dataset.applicationTarget;
  targetControls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  host.dataset.applicationTarget = selectedTarget;
  if (targetModels.gs) { targetModels.gs.visible = selectedTarget === 'gs'; targetModels.isog.visible = selectedTarget === 'isog'; }
  if (labels[1]) labels[1].textContent = `${selectedTarget === 'gs' ? 'GS' : 'isog'} candidate`;
  document.querySelector('#application-coordinate-note').textContent = `${selectedTarget === 'gs' ? 'GS' : 'isog'} complex · actual source coordinates`;
  render(1);
}));
canvasHost.addEventListener('keydown', event => {
  if (!renderer || !['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return;
  event.preventDefault(); stopMotion();
  dragAngle = event.key === 'Home' ? 0 : dragAngle + (event.key === 'ArrowLeft' ? -.12 : .12);
  stageGroups[active].rotation.y = dragAngle; render(1);
});
canvasHost.addEventListener('pointerdown', event => {
  if (!renderer || event.button !== 0) return;
  stopMotion(); dragStart = { x: event.clientX, angle: dragAngle };
});
canvasHost.addEventListener('pointermove', event => {
  if (!dragStart) return;
  dragAngle = Math.max(-.85, Math.min(.85, dragStart.angle + (event.clientX - dragStart.x) * .004));
  stageGroups[active].rotation.y = dragAngle; render(1);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(type => canvasHost.addEventListener(type, () => { dragStart = null; }));
function stopMotion() { if (raf) cancelAnimationFrame(raf); raf = 0; started = 0; }
function startMotion() {
  stopMotion();
  replay.disabled = !renderer || reduced.matches;
  if (!renderer || reduced.matches || !visible || document.hidden) { render(1); return; }
  started = performance.now(); raf = requestAnimationFrame(tick);
}
function tick(now) {
  raf = 0;
  if (destroyed || !visible || document.hidden) { stopMotion(); return; }
  const progress = Math.min(1, (now - started) / motionDuration);
  render(progress);
  if (progress < 1) raf = requestAnimationFrame(tick); else started = 0;
}
function material(color, opacity = 1, metalness = .15) {
  return new THREE.MeshStandardMaterial({ color, roughness: .5, metalness, transparent: opacity < 1, opacity, depthWrite: opacity === 1 });
}
function ball(parent, radius, position, color, scale = [1, 1, 1], opacity = 1) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 18), material(color, opacity));
  mesh.position.set(...position); mesh.scale.set(...scale); parent.add(mesh); return mesh;
}
function tube(parent, a, b, radius, color, opacity = 1, segments = 10) {
  const pa = new THREE.Vector3(...a), pb = new THREE.Vector3(...b), delta = pb.clone().sub(pa);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), segments), material(color, opacity));
  mesh.position.copy(pa).add(pb).multiplyScalar(.5); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); parent.add(mesh); return mesh;
}
function ring(parent, radius, tubeRadius, position, color, rotation = [0, 0, 0], opacity = 1) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tubeRadius, 8, 72), material(color, opacity));
  mesh.position.set(...position); mesh.rotation.set(...rotation); parent.add(mesh); return mesh;
}
function pathLine(parent, points, color, opacity = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })); parent.add(line); return line;
}
function makeStage() {
  const group = new THREE.Group(); group.visible = false; scene.add(group); stageGroups.push(group); return group;
}
function buildDelivery() {
  const g = makeStage();
  // A technical anatomical silhouette; this is not patient-specific anatomy.
  ball(g, .44, [-.48, 1.52, 0], '#aec3cf', [.73, 1.05, .72], .8);
  tube(g, [-.48, .97, 0], [-.48, 1.19, 0], .14, '#849fb0', .8);
  ball(g, .82, [-.48, .1, 0], '#a6c4d0', [.9, 1.27, .41], .5);
  ball(g, .6, [-.48, -.93, 0], '#779aad', [1.03, .55, .54], .5);
  [[[-1.05,.75,0],[-1.35,-.17,.02]],[[-1.35,-.17,.02],[-1.28,-1.1,.08]],[[.12,.73,0],[.54,-.13,.04]],[[.54,-.13,.04],[.65,-1.02,.16]]].forEach((ends,i) => tube(g,...ends,i%2 === 0 ? .2 : .14,'#8cabbc',.68));
  [[[-.78,-1.14,0],[-.88,-2.18,.06]],[[-.2,-1.14,0],[-.11,-2.18,.06]]].forEach(ends => tube(g,...ends,.21,'#8caaba',.55));
  ball(g,.24,[.17,.62,.12],'#e0b174',[.8,1.15,.65],.7);
  for(let i=0;i<5;i++) tube(g,[.07+i*.046,.81,.28],[.23+i*.046,.38,.28],.014,'#f7cd8e',.9);
  // Isolated syringe geometry: recognizable route context, without technique or dose instructions.
  const syringe = new THREE.Group(); syringe.position.set(.47,.69,.24); syringe.rotation.z = -.36; g.add(syringe);
  tube(syringe,[0,0,0],[.41,.2,0],.013,'#d2e6ec');
  tube(syringe,[.4,.2,0],[1.15,.56,0],.075,'#e5f2f6',.48);
  tube(syringe,[.42,.21,0],[.95,.47,0],.043,'#c55e77',.8);
  tube(syringe,[1.13,.46,0],[1.05,.65,0],.025,'#b2ccd9');
  const plunger = new THREE.Group(); syringe.add(plunger);
  tube(plunger,[1.14,.56,0],[1.52,.74,0],.025,'#9cc0cf');
  tube(plunger,[1.47,.66,0],[1.4,.82,0],.035,'#bcd4de');
  ring(g,.29,.009,[.18,.65,.3],'#e7b877',[0,.15,0],.8);
  animated.push(p => { plunger.position.set(-.12*p,-.058*p,0); });
  g.userData.labels = [[-.7,.9,.3],[.85,.9,.3]];
}
function buildCellEntry() {
  const g = makeStage();
  const vessel = new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,3.4,40,1,true), material('#b55b70',.4));
  vessel.rotation.z = Math.PI/2; vessel.position.set(-.46,1,0); g.add(vessel);
  ring(g,.36,.024,[-2.16,1,0],'#ca7c8f',[0,Math.PI/2,0]);
  ring(g,.36,.024,[1.24,1,0],'#ca7c8f',[0,Math.PI/2,0]);
  for(let i=0;i<7;i++) ball(g,.13,[-1.85+i*.43,1+Math.sin(i)*.1,.03],'#ba4b69',[1.15,.5,1],.85);
  // Cutaway cell membrane: open arc exposes the intracellular compartment.
  const cell = new THREE.Mesh(new THREE.SphereGeometry(1.12,56,32,.35,Math.PI*1.7),material('#83b8c8',.2));
  cell.rotation.y = .15; cell.position.set(.63,-.72,.12); g.add(cell);
  ring(g,1.1,.025,[.63,-.72,.15],'#6baec4',[0,0,0],.8);
  ball(g,.39,[.82,-.85,.15],'#a18dc2',[1.1,.8,.9],.45);
  for(let i=0;i<17;i++){const a=i/17*Math.PI*2;ball(g,.033,[.63+Math.cos(a)*1.12,-.72+Math.sin(a)*1.12,.15],'#9bc6d3');}
  const route=[[-1.65,.9,.45],[-.8,.65,.45],[-.55,.1,.45],[-.22,-.25,.45],[.35,-.45,.45]];
  pathLine(g,route,'#e2bc78',.65);
  const marker=ball(g,.073,route[0],'#f4ca7e');
  animated.push(p=>{const at=p*(route.length-1),i=Math.min(route.length-2,Math.floor(at)),t=at-i;marker.position.set(...route[i].map((v,j)=>v+(route[i+1][j]-v)*t));});
  g.userData.labels=[[-1.7,.4,.2],[1.15,-.1,.3]];
}
function buildTarget() {
  const g=makeStage(); targetGroup=new THREE.Group();g.add(targetGroup);
  // Coordinates are loaded from the same unchanged complex PDBs as the NGL explorer.
  g.userData.labels=[[-1.65,.75,.2],[.6,-.75,.5]];
  g.userData.target=true;
}
function buildPathway() {
  const g=makeStage();
  // A compact enzyme-to-DNA pathway illustration, not a measurement or simulated response.
  const enzyme=new THREE.Group();enzyme.position.set(-1.3,.05,0);g.add(enzyme);
  const points=[];for(let i=0;i<90;i++){const t=i*.29;points.push([Math.sin(t)*(.42+.08*Math.cos(t*.7)),(i/89-.5)*1.25,Math.cos(t)*.4]);}
  pathLine(enzyme,points,'#9abccb');
  for(let i=0;i<points.length-1;i++)tube(enzyme,points[i],points[i+1],.032,'#9abccb');
  ball(enzyme,.17,[.42,.01,.16],'#e6bd75');
  const dna=new THREE.Group();dna.position.set(1.2,0,0);dna.rotation.z=-.13;g.add(dna);
  for(let i=0;i<32;i++){const t=i*.23,y=(i-15.5)*.08,a=[Math.cos(t)*.36,y,Math.sin(t)*.36],b=[-Math.cos(t)*.36,y,-Math.sin(t)*.36];ball(dna,.047,a,'#88becd');ball(dna,.047,b,'#c49aca');if(i%2===0)tube(dna,a,b,.016,i%4===0?'#d5af74':'#acb4cd');if(i>0){const pt=(i-1)*.23,py=(i-1-15.5)*.08;tube(dna,[Math.cos(pt)*.36,py,Math.sin(pt)*.36],a,.026,'#88becd');tube(dna,[-Math.cos(pt)*.36,py,-Math.sin(pt)*.36],b,.026,'#c49aca');}}
  const route=[[-.65,.1,.3],[-.25,.1,.3],[.2,.1,.3],[.68,.1,.3]];pathLine(g,route,'#d1ad70',.55);
  const carrier=ball(g,.08,route[0],'#edc47a');
  animated.push(p=>{carrier.position.set(-.65+p*1.33,.1,.3);});
  g.userData.labels=[[-1.62,.95,.15],[.85,1.4,.15]];
}
function parseSourcePDB(text) {
  const atoms=[],pairs=[],serialMap=new Map();
  for(const line of text.split(/\r?\n/)){
    if(/^(ATOM  |HETATM)/.test(line)){
      const atom={serial:Number(line.slice(6,11)),name:line.slice(12,16).trim(),residue:line.slice(17,20).trim(),resid:line.slice(22,26).trim(),position:[30,38,46].map(i=>Number(line.slice(i,i+8))),element:line.slice(76,78).trim()||line.slice(12,16).trim()[0]};
      serialMap.set(atom.serial,atoms.length);atoms.push(atom);
    }else if(line.startsWith('CONECT')){
      const parts=line.slice(6).match(/.{1,5}/g)?.map(Number)||[];for(const b of parts.slice(1))if(parts[0]<b)pairs.push([parts[0],b]);
    }
  }
  if(atoms.length!==3153)throw new Error('Unexpected source atom count');
  return {atoms,pairs:pairs.map(pair=>pair.map(serial=>serialMap.get(serial)))};
}
function makeTargetModel(data,key) {
  const group=new THREE.Group(),atoms=data.atoms,center=[0,0,0];
  for(const a of atoms.slice(0,3013))for(let j=0;j<3;j++)center[j]+=a.position[j]/3013;
  const point=a=>a.position.map((v,j)=>(v-center[j])*.071);
  const ca=atoms.slice(0,3013).filter(a=>a.name==='CA');
  for(let i=1;i<ca.length;i++){const a=point(ca[i-1]),b=point(ca[i]);if(a.reduce((sum,v,j)=>sum+(v-b[j])**2,0)<.15)tube(group,a,b,.027,'#a0bacb',.8,7);}
  ca.forEach(a=>ball(group,.038,point(a),'#a0bacb',[1,1,1],.75));
  const colors={C:key==='gs'?'#da6f8b':'#b598df',N:'#87b7f1',O:'#ec7c83',P:'#e4ba72',H:'#dbe7ee',S:'#e8ca76'};
  for(let i=3013;i<atoms.length;i++){
    const a=atoms[i],isCandidate=i>=3087;
    ball(group,a.element==='H'?.019:.045,point(a),isCandidate?(colors[a.element]||colors.C):'#e1b967');
  }
  const used=new Set();
  for(const [ia,ib]of data.pairs){if(ia<3013||ib<3013)continue;const tag=`${ia}-${ib}`;if(used.has(tag))continue;used.add(tag);tube(group,point(atoms[ia]),point(atoms[ib]),.018,ia>=3087?(key==='gs'?'#dc8095':'#b598df'):'#d4ad65',1,7);}
  group.rotation.set(.08,-.22,-.1);group.visible=key===selectedTarget;
  targetGroup.add(group);targetModels[key]=group;
  if(key==='gs'){host.dataset.applicationSourceAtoms=String(atoms.length);host.dataset.applicationSourceBonds=String(data.pairs.length);}
  return group;
}
async function loadSourceModels() {
  const models=await Promise.all(['gs','isog'].map(async key=>{
    const response=await fetch(`assets/dhfr-${key}-connected.pdb`);if(!response.ok)throw new Error('Source model not available');return {key,data:parseSourcePDB(await response.text())};
  }));
  models.forEach(({key,data})=>makeTargetModel(data,key));
  targetControls.querySelectorAll('button').forEach(button=>button.disabled=false);
  host.dataset.applicationModelsReady='true';
  if(active===2)render(1);
}
function updateLabels() {
  if(!renderer)return;
  const width=canvasHost.clientWidth,height=canvasHost.clientHeight,g=stageGroups[active];
  const anchors=g.userData.labels||[];
  labels.forEach((label,i)=>{
    if(!anchors[i]){label.classList.remove('is-visible');return;}
    const vector=new THREE.Vector3(...anchors[i]);g.localToWorld(vector);vector.project(camera);
    const x=(vector.x*.5+.5)*width,y=(-vector.y*.5+.5)*height;
    label.style.left=`${Math.max(10,Math.min(width-130,x))}px`;label.style.top=`${Math.max(20,Math.min(height-30,y))}px`;label.classList.add('is-visible');
  });
}
function render(progress=1) {
  if(!renderer||destroyed)return;
  animated.forEach(fn=>fn(progress));
  const g=stageGroups[active];g.rotation.y=dragAngle+(reduced.matches?0:Math.sin(progress*Math.PI)*.1);
  renderer.render(scene,camera);updateLabels();
}
function resize() {
  if(!renderer||destroyed)return;
  const w=Math.max(1,canvasHost.clientWidth),h=Math.max(1,canvasHost.clientHeight),aspect=w/h;
  camera.aspect=aspect;camera.position.set(0,0,aspect<1?7.8:6.4);camera.updateProjectionMatrix();renderer.setSize(w,h,false);render(1);
}
const visibilityHandler=()=>{if(document.hidden)stopMotion();else if(visible)render(1);};
document.addEventListener('visibilitychange',visibilityHandler);
reduced.addEventListener('change',()=>{stopMotion();replay.disabled=reduced.matches||!renderer;render(1);});
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;host.dataset.applicationVisible=String(visible);if(!visible)stopMotion();else render(1);},{threshold:.05});observer.observe(canvasHost);
let resizeObserver;
async function initialize(){
  try{
    THREE=await import('./vendor/three.module.js');
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor('#101d2b');renderer.outputColorSpace=THREE.SRGBColorSpace;
    canvasHost.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(43,1,.1,70);camera.position.set(0,0,6.4);
    scene.add(new THREE.HemisphereLight('#d5edff','#273242',2.7));const light=new THREE.DirectionalLight('#ffe6cb',3.2);light.position.set(3,4,5);scene.add(light);const fill=new THREE.DirectionalLight('#6eb9da',1.5);fill.position.set(-4,0,3);scene.add(fill);
    buildDelivery();buildCellEntry();buildTarget();buildPathway();
    labels=[document.querySelector('#application-label-a'),document.querySelector('#application-label-b')];
    stageGroups[active].visible=true;
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvasHost);resize();
    fallback.hidden=true;replay.disabled=reduced.matches;host.dataset.applicationReady='true';
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();stopMotion();fallback.textContent='The 3D context was interrupted. The captions and application steps remain available; reload to reopen the illustration.';fallback.hidden=false;host.dataset.applicationReady='false';});
    setStage(active,false);
    try{await loadSourceModels();}catch(error){modelLoadFailed=true;document.querySelector('#application-coordinate-note').textContent='Source-coordinate inset unavailable. Use the atomic explorer above or reload.';host.dataset.applicationModelsReady='false';if(active===2){fallback.textContent='The molecular inset could not load. Read the caption here or use the atomic explorer above.';fallback.hidden=false;}}
  }catch(error){fallback.textContent='The 3D illustration could not open on this device. All four application captions remain available through the buttons above.';fallback.hidden=false;host.dataset.applicationReady='false';replay.disabled=true;}
}
window.addEventListener('pagehide',event=>{stopMotion();if(event.persisted)return;destroyed=true;observer.disconnect();resizeObserver?.disconnect();document.removeEventListener('visibilitychange',visibilityHandler);scene?.traverse(object=>{object.geometry?.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(m=>m?.dispose());});renderer?.dispose();});
setStage(0,false);initialize();
