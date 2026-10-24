import {models, topics, pipeline, sources} from './story-data.js';

const $ = id => document.getElementById(id);
const viewport = $('molecular-viewport');
const modelButtons = [...document.querySelectorAll('[data-model]')];
const componentButtons = [...document.querySelectorAll('[data-component]')];
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const componentNames = {all:'Whole model',protein:'Human DHFR',candidate:'Candidate',nadph:'NADPH',pocket:'Pocket context'};
const state = {model:'gs',selected:'all',topic:'enzyme',mode:'atomic',isolated:false,ready:false,picked:null};
const allIndices = Array.from({length:3153},(_,i)=>i);
const groupOf = index => index < 3013 ? 'protein' : index < 3087 ? 'nadph' : 'candidate';
const sourceSegment = index => index < 3013 ? 'PROA' : index < 3087 ? 'COFA' : 'LIGA';
const selection = indices => indices.length ? '@'+indices.join(',') : 'NONE';
let stage, component, initialOrientation, colorScheme;
let atomicRep, secondaryRep, accessoryRep;
let pocketIndices = [], pocketSet = new Set();
let generation = 0, touchStart = null, lastPick = {index:-1,time:0};

function element(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}

function populateResearch() {
  topics.forEach(topic => {
    const button = element('button');
    button.type = 'button';
    button.dataset.topic = topic.id;
    button.setAttribute('aria-pressed',String(topic.id===state.topic));
    button.append(element('span',topic.number),element('span',topic.label),element('span','↗'));
    button.lastChild.setAttribute('aria-hidden','true');
    button.addEventListener('click',()=>showTopic(topic.id,true));
    $('topic-buttons').append(button);
  });
  pipeline.forEach(step => {
    const item=element('li');
    const link=element('a',step.linkLabel+' ↗');
    link.href=step.link;link.target='_blank';link.rel='noopener noreferrer';
    item.append(element('p',step.number,'step-number'),element('h3',step.title),element('p',step.text),link);
    $('pipeline').append(item);
  });
  sources.forEach(source => {
    const link=element('a');
    link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';
    const heading=element('h3',source.title+' ');
    const arrow=element('span','↗');arrow.setAttribute('aria-hidden','true');heading.append(arrow);
    link.append(heading,element('p',source.text));
    $('source-list').append(link);
  });
}

function announce(text) { $('announcer').textContent=text; }
function enableControls(enabled) {
  ['model-controls','component-controls','representation-controls','camera-controls'].forEach(id=>$(id).disabled=!enabled);
  $('isolate-selected').disabled=!enabled||state.selected==='all';
  $('focus-pocket').disabled=!enabled;
  $('download-image').disabled=!enabled;
}
function updateOrientation() {
  if (!stage||!state.ready) return;
  viewport.dataset.viewOrientation=JSON.stringify(Array.from(stage.viewerControls.getOrientation().elements));
}
function indicesFor(group) {
  if (group==='all') return allIndices;
  if (group==='pocket') return pocketIndices;
  return allIndices.filter(index=>groupOf(index)===group);
}
function copyAtom(atom) {
  return {index:atom.index,atomname:atom.atomname,resname:atom.resname,resno:atom.resno,segment:sourceSegment(atom.index),element:atom.element};
}
function atomLabel(atom) {
  return `Atom ${atom.index+1} · ${atom.atomname} · ${atom.resname} ${atom.resno} · ${atom.segment}`;
}
function updateSelectionUI() {
  const indices=indicesFor(state.selected);
  componentButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.component===state.selected)));
  modeButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===state.mode)));
  modelButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.model===state.model)));
  viewport.dataset.currentModel=state.model;
  viewport.dataset.selectedComponent=state.selected;
  viewport.dataset.selectedAtomCount=String(indices.length);
  viewport.dataset.representation=state.mode;
  viewport.dataset.isolated=String(state.isolated);
  $('isolate-selected').checked=state.isolated;
  $('isolate-selected').disabled=!state.ready||state.selected==='all';
  $('selection-summary').textContent=state.selected==='all'?'All 3,153 source atoms':`${indices.length.toLocaleString()} selected source atoms · ${state.isolated?'isolated':'whole model retained'}`;
  $('metadata-selection').textContent=`${componentNames[state.selected]} · ${indices.length.toLocaleString()} atoms`;
  $('metadata-model').textContent=models[state.model].label;
  $('model-label').textContent=`${models[state.model].label} · human DHFR + NADPH`;
  $('candidate-dot').style.background=models[state.model].css;
  $('download-model').href=models[state.model].file;
  $('figure-caption').textContent=state.isolated?`Source-coordinate component view: ${componentNames[state.selected].toLowerCase()}.`:'Actual source-coordinate complex. All atoms and explicit source bonds are retained.';
}

function showTopic(id, highlight) {
  const topic=topics.find(item=>item.id===id);
  if (!topic) return;
  state.topic=id;
  document.querySelectorAll('[data-topic]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.topic===id)));
  $('caption-number').textContent=`${topic.number} / ${topic.label.toUpperCase()}`;
  $('caption-title').textContent=topic.title;
  $('caption-copy').textContent=topic.copy;
  $('caption-detail').textContent=topic.detail;
  $('caption-source').href=topic.source;
  $('caption-source').textContent=topic.sourceLabel+' ↗';
  viewport.dataset.currentTopic=id;
  if (highlight&&state.ready) selectComponent(topic.component,false);
}

function calculatePocket() {
  const candidates=[];
  component.structure.eachAtom(atom=>{
    if (groupOf(atom.index)==='candidate'&&atom.element!=='H') candidates.push([atom.x,atom.y,atom.z]);
  });
  const residues=new Set();
  component.structure.eachAtom(atom=>{
    if (groupOf(atom.index)!=='protein'||atom.element==='H') return;
    if (candidates.some(([x,y,z])=>(atom.x-x)**2+(atom.y-y)**2+(atom.z-z)**2<=36)) residues.add(atom.residueIndex);
  });
  pocketIndices=[];
  component.structure.eachAtom(atom=>{
    if (groupOf(atom.index)!=='protein'||residues.has(atom.residueIndex)) pocketIndices.push(atom.index);
  });
  pocketSet=new Set(pocketIndices);
  viewport.dataset.pocketAtomCount=String(pocketIndices.length);
  viewport.dataset.pocketProteinResidueCount=String(residues.size);
}

function refreshRepresentation() {
  if (!component||!state.ready) return;
  const allowed=state.isolated?indicesFor(state.selected):allIndices;
  const fullSelection=selection(allowed);
  atomicRep.setSelection(fullSelection);
  atomicRep.update({color:true});
  atomicRep.setVisibility(state.mode==='atomic');
  if (state.mode==='secondary') {
    const protein=allowed.filter(index=>groupOf(index)==='protein');
    const accessory=allowed.filter(index=>groupOf(index)!=='protein');
    if (!secondaryRep) secondaryRep=component.addRepresentation('cartoon',{sele:selection(protein),colorScheme,quality:'high',radiusScale:0.8,aspectRatio:4,disablePicking:false});
    else {secondaryRep.setSelection(selection(protein));secondaryRep.update({color:true});}
    if (!accessoryRep) accessoryRep=component.addRepresentation('ball+stick',{sele:selection(accessory),colorScheme,radiusScale:1.05,aspectRatio:2.1,bondScale:0.35,quality:'high',disablePicking:false});
    else {accessoryRep.setSelection(selection(accessory));accessoryRep.update({color:true});}
    secondaryRep.setVisibility(true);accessoryRep.setVisibility(true);
  } else {
    if (secondaryRep) secondaryRep.setVisibility(false);
    if (accessoryRep) accessoryRep.setVisibility(false);
  }
  // Highlighting and representation changes never recenter or modify molecular coordinates.
  updateSelectionUI();
  updateOrientation();
}

function selectComponent(group, updateTopic=true, picked=null) {
  if (!state.ready||!componentNames[group]) return;
  state.selected=group;
  state.isolated=false;
  if (picked) {
    state.picked=picked;
    viewport.dataset.lastPickedAtom=String(picked.index);
    $('metadata-picked').textContent=atomLabel(picked);
    $('picked-label').textContent=atomLabel(picked);
    announce(`${componentNames[group]} selected. ${atomLabel(picked)}.`);
  }
  if (updateTopic) {
    const topicFor={protein:'enzyme',candidate:'candidates',nadph:'nadph',pocket:'pocket',all:'inhibition'};
    showTopic(topicFor[group],false);
  }
  refreshRepresentation();
}

function onPicked(proxy) {
  if (!state.ready||!proxy) return;
  const atom=proxy.atom||proxy.closestBondAtom;
  if (!atom||atom.index<0||atom.index>=3153) return;
  const now=performance.now();
  if (lastPick.index===atom.index&&now-lastPick.time<180) return;
  const picked=copyAtom(atom);
  lastPick={index:picked.index,time:now};
  selectComponent(groupOf(picked.index),true,picked);
}

function makeStage() {
  if (!window.NGL) throw new Error('Molecular viewer library unavailable');
  stage=new NGL.Stage('ngl-canvas',{backgroundColor:'#111b29',quality:'high',sampleLevel:0,cameraType:'perspective',cameraFov:36,lightIntensity:1,ambientIntensity:0.7,clipNear:0,clipFar:100,fogNear:75,fogFar:100,tooltip:false});
  // NGL focuses this canvas on pointer input; it must not inherit aria-hidden.
  $('ngl-canvas').removeAttribute('aria-hidden');
  const canvas=stage.viewer.renderer?.domElement;
  if(canvas){
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label','Interactive atomic model of human DHFR, NADPH, and the selected nucleopeptide candidate. Arrow keys rotate, plus and minus zoom, and Home resets the view.');
  }
  ['clickPick-left','clickPick-middle','clickPick-right','clickPick-ctrl-left','drag-ctrl-shift-right','drag-ctrl-shift-left','hoverPick'].forEach(binding=>stage.mouseControls.remove(binding));
  stage.keyControls.clear();
  stage.spinAnimation.pause(true);stage.rockAnimation.pause(true);
  stage.signals.clicked.add(onPicked);
  stage.signals.hovered.add(proxy=>{
    if (!state.ready) return;
    const atom=proxy&&(proxy.atom||proxy.closestBondAtom);
    $('picked-label').textContent=atom?atomLabel(copyAtom(atom)):(state.picked?atomLabel(state.picked):'');
  });
  stage.viewerControls.signals.changed.add(updateOrientation);
  colorScheme=NGL.ColormakerRegistry.addScheme(function () {
    this.atomColor=atom=>{
      const group=groupOf(atom.index);
      const protein={C:0xa7b5c4,N:0x6bb2c7,O:0xd67e83,S:0xe0bf72,H:0x75818f};
      let color=group==='candidate'?models[state.model].color:group==='nadph'?0xe3bd68:(protein[atom.element]||0xb3bec9);
      const emphasized=state.selected==='all'||(state.selected==='pocket'?pocketSet.has(atom.index):state.selected===group);
      if (!emphasized&&!state.isolated) {
        const amount=0.43;
        const mix=(channel,background)=>Math.round(background+(channel-background)*amount);
        color=(mix((color>>16)&255,17)<<16)|(mix((color>>8)&255,27)<<8)|mix(color&255,41);
      }
      return color;
    };
  });
}

async function loadModel(key) {
  if (!models[key]) return;
  const token=++generation;
  const orientation=stage&&state.ready?stage.viewerControls.getOrientation().clone():null;
  state.model=key;state.ready=false;state.picked=null;
  viewport.dataset.modelReady='false';viewport.dataset.lastPickedAtom='';
  $('metadata-picked').textContent='None yet';$('picked-label').textContent='';
  enableControls(false);updateSelectionUI();
  $('load-state').hidden=false;$('retry-load').hidden=true;
  $('load-message').textContent=`Opening the ${models[key].base.toLowerCase()} complex…`;
  try {
    if (!stage) makeStage();
    if (component) {stage.removeComponent(component);component=null;}
    atomicRep=null;secondaryRep=null;accessoryRep=null;
    const loaded=await stage.loadFile(models[key].file,{ext:'pdb',defaultRepresentation:false,inferBonds:'none'});
    if (token!==generation) {stage.removeComponent(loaded);return;}
    component=loaded;
    const atoms=component.structure.atomCount,bonds=component.structure.bondCount;
    if (atoms!==3153||bonds!==3195) throw new Error('Unexpected source atom or bond count');
    calculatePocket();
    atomicRep=component.addRepresentation('ball+stick',{sele:'ALL',colorScheme,radiusScale:1.05,aspectRatio:2.1,bondScale:0.35,quality:'high',disablePicking:false});
    state.ready=true;
    viewport.dataset.atomCount=String(atoms);viewport.dataset.bondCount=String(bonds);
    $('model-count').textContent=`${atoms.toLocaleString()} source atoms`;
    refreshRepresentation();stage.handleResize();
    if (orientation) stage.viewerControls.orient(orientation);
    else {component.autoView(0);initialOrientation=stage.viewerControls.getOrientation().clone();}
    viewport.dataset.modelReady='true';
    updateOrientation();enableControls(true);$('load-state').hidden=true;
    announce(`${models[key].label} loaded: 3,153 source atoms and 3,195 explicit bonds.`);
  } catch (error) {
    if (token!==generation) return;
    state.ready=false;viewport.dataset.modelReady='false';enableControls(false);
    // Candidate switching stays available if a single asset fails to load.
    $('model-controls').disabled=false;
    $('load-message').textContent='The molecular structure could not open. Try again, choose the other candidate, or download the source PDB below.';
    $('retry-load').hidden=false;
    console.warn('DHFR molecular model did not load:',error.message);
  }
}

function rotate(direction) {
  if (!state.ready) return;
  const movement={left:[-12,0],right:[12,0],up:[0,-12],down:[0,12]}[direction];
  if (movement) stage.trackballControls.rotate(...movement);
}
function resetView() {
  if (state.ready&&initialOrientation) stage.viewerControls.orient(initialOrientation);
}

modelButtons.forEach(button=>button.addEventListener('click',()=>loadModel(button.dataset.model)));
componentButtons.forEach(button=>button.addEventListener('click',()=>selectComponent(button.dataset.component)));
modeButtons.forEach(button=>button.addEventListener('click',()=>{if(state.ready){state.mode=button.dataset.mode;refreshRepresentation();}}));
document.querySelectorAll('[data-rotate]').forEach(button=>button.addEventListener('click',()=>rotate(button.dataset.rotate)));
$('isolate-selected').addEventListener('change',event=>{if(state.ready){state.isolated=event.target.checked&&state.selected!=='all';refreshRepresentation();}});
$('zoom-in').addEventListener('click',()=>{if(state.ready)stage.viewerControls.zoom(0.12);});
$('zoom-out').addEventListener('click',()=>{if(state.ready)stage.viewerControls.zoom(-0.12);});
$('reset-view').addEventListener('click',resetView);
$('focus-pocket').addEventListener('click',()=>{if(state.ready)component.autoView(selection(pocketIndices),0);});
$('retry-load').addEventListener('click',()=>loadModel(state.model));
$('explore-structure').addEventListener('click',event=>{
  event.preventDefault();$('model-controls').scrollIntoView({block:'start',behavior:'instant'});
  if(state.ready) modelButtons.find(button=>button.dataset.model===state.model).focus({preventScroll:true});
});
document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{
  selectComponent(button.dataset.figure);
  $('model-controls').scrollIntoView({block:'start',behavior:'instant'});
  if(state.ready) componentButtons.find(item=>item.dataset.component===button.dataset.figure).focus({preventScroll:true});
}));
viewport.addEventListener('keydown',event=>{
  if(!state.ready||event.altKey||event.ctrlKey||event.metaKey)return;
  const directions={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
  if(directions[event.key]){event.preventDefault();rotate(directions[event.key]);}
  else if(event.key==='+'||event.key==='='){event.preventDefault();stage.viewerControls.zoom(0.12);}
  else if(event.key==='-'||event.key==='_'){event.preventDefault();stage.viewerControls.zoom(-0.12);}
  else if(event.key==='Home'){event.preventDefault();resetView();}
});
// This NGL bundle omits touchend clicks. Only stationary single-finger taps are converted.
viewport.addEventListener('pointerdown',event=>{
  if(event.pointerType==='touch')touchStart={id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now(),multiple:!event.isPrimary};
});
viewport.addEventListener('pointerup',event=>{
  if(event.pointerType!=='touch'||!touchStart||touchStart.id!==event.pointerId)return;
  const tap=touchStart;touchStart=null;
  if(!state.ready||tap.multiple||performance.now()-tap.time>500||Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>6)return;
  const rect=stage.viewer.renderer.domElement.getBoundingClientRect();
  onPicked(stage.pickingControls.pick(event.clientX-rect.left,rect.bottom-event.clientY));
});
viewport.addEventListener('pointercancel',()=>{touchStart=null;});
$('download-image').addEventListener('click',async()=>{
  if(!state.ready)return;
  const button=$('download-image');button.disabled=true;
  try {
    const blob=await stage.makeImage({factor:2,antialias:true,trim:false,transparent:false});
    const url=URL.createObjectURL(blob),link=element('a');
    link.href=url;link.download=`dhfr-${state.model}-${state.selected}-${state.mode}.png`;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    announce('Saved the current source-coordinate molecular view.');
  } catch(error) {announce('The image could not be saved in this browser. The source PDB is available below.');}
  finally {button.disabled=!state.ready;}
});
const resize=()=>{if(stage){stage.handleResize();updateOrientation();}};
if('ResizeObserver'in window)new ResizeObserver(resize).observe(viewport);
else window.addEventListener('resize',resize);
window.addEventListener('pagehide',event=>{if(!event.persisted){++generation;if(stage)stage.dispose();}});
populateResearch();showTopic('enzyme',false);updateSelectionUI();loadModel('gs');
