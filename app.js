/* DHFR-only research page. One persistent molecular stage, unchanged source files. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chapters = window.DHFR_CHAPTERS || [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const slots = Object.fromEntries([...document.querySelectorAll('[data-slot]')].map(node => [node.dataset.slot, node]));
  const viewport = $('molecular-viewport');
  const state = {model:'gs',mode:'surface',component:'all',slot:'hero',chapter:'enzyme',manual:false,interactive:false,ready:false};
  let engine, engineGeneration = 0, observers = [], scrollFrame = 0, chapterLockedUntil = 0, unbindResearch;
  const sourceLink = source => source.url && /^https:\/\//.test(source.url)
    ? `<a class="chapter-source" href="${escape(source.url)}" target="_blank" rel="noopener">${escape(source.title)}</a>`
    : `<span class="chapter-source">${escape(source.title)}</span>`;

  function reflectControls() {
    document.querySelectorAll('[data-mode]').forEach(button => {button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode));button.disabled = !state.ready;});
    document.querySelectorAll('[data-model]').forEach(button => {button.setAttribute('aria-pressed', String(button.dataset.model === state.model));button.disabled = !state.ready;});
    document.querySelectorAll('[data-component]').forEach(button => {button.setAttribute('aria-pressed', String(button.dataset.component === state.component));button.disabled = !state.ready;});
    $('hero-atoms').setAttribute('aria-pressed', String(state.mode === 'atomic'));
    $('hero-atoms').disabled = !state.ready;
    ['interaction-toggle','reset-view','zoom-in','zoom-out'].forEach(id=>{$(id).disabled = !state.ready;});
    $('hero-model-label').textContent = state.ready && state.slot === 'hero' ? `${state.model === 'gs' ? 'GS' : 'isog'} model` : 'GS source image';
    $('interaction-toggle').setAttribute('aria-pressed', String(state.interactive));
    $('interaction-toggle').textContent = state.interactive ? 'Finish exploring' : 'Touch controls';
    $('interaction-hint').textContent = state.interactive
      ? 'Drag to rotate. Tap an atom or choose a part. Keyboard: arrows rotate, + and − zoom, Home resets.'
      : 'Choose a part below. Enable touch controls to rotate or select atoms.';
    for (const [name,slot] of Object.entries(slots)) slot.dataset.interactive = String(name === state.slot && state.interactive);
    viewport.tabIndex = state.interactive ? 0 : -1;
    $('resume-guided').hidden = !state.manual;
    document.body.dataset.activeMoleculeSlot = state.slot;
    document.body.dataset.guidedChapter = state.chapter;
    document.body.dataset.reducedMotion = String(reduced.matches);
    document.querySelector('.how-note').textContent = reduced.matches ? 'Choose a step to follow the chemistry.' : 'Scroll to follow the chemistry, or choose a step.';
  }
  function onSelection(selection) {
    state.component = selection.key || 'all';
    $('selection-title').textContent = selection.label || 'The prepared complex';
    $('selection-copy').textContent = selection.caption || '';
    $('isolate').checked = Boolean(selection.isolated);
    $('isolate').disabled = state.component === 'all' || !state.ready;
    reflectControls();
  }
  function showFailure(error) {
    state.ready = false;
    $('model-load-status').textContent = 'The live structure could not load. A source image is shown.';
    $('load-failure').hidden = false;
    $('opening-load-failure').hidden = false;
    viewport.dataset.modelReady = 'false';
    viewport.dataset.previewError = error?.message || 'Unable to load the source model.';
    reflectControls();
  }
  function setVisibility(visible) {
    if (engine?.getDiagnostics().modelVisible !== visible) engine?.setModelVisibility(visible);
  }
  function applyCurrentView() {
    if (!state.ready || !engine) return;
    if (state.slot === 'how') applyChapterView();
    else if (!state.manual) {
      setVisibility(true);
      if (engine.getDiagnostics().representation !== state.mode) engine.setMode(state.mode);
      if (engine.getDiagnostics().selectedComponent !== state.component) engine.setComponent(state.component);
      engine.setViewPreset(state.slot === 'hero' ? 'overview' : 'pocket', {progress:state.slot === 'hero' ? 1 : .64});
    }
  }
  function createEngine() {
    const generation = ++engineGeneration;
    state.ready = false;
    engine?.destroy();
    $('load-failure').hidden = true;
    $('opening-load-failure').hidden = true;
    $('model-load-status').textContent = 'Loading the verified source model.';
    viewport.dataset.previewError = '';
    reflectControls();
    try {
      engine = window.createResearchMolecule({project:'dhfr',viewport,onSelection,
        onReady(diagnostics) {
          if (generation !== engineGeneration) return;
          state.ready = true;
          state.model = diagnostics.model;
          $('model-load-status').textContent = 'The source model is ready.';
          $('structure-counts').textContent = `${diagnostics.atomCount.toLocaleString()} atoms and ${diagnostics.bondCount.toLocaleString()} explicit bonds. Source-file identity verified.`;
          if (diagnostics.representation !== state.mode) engine.setMode(state.mode);
          reflectControls();
          requestAnimationFrame(applyCurrentView);
        },
        onError:error => {if (generation === engineGeneration) showFailure(error);}
      });
    } catch (error) {showFailure(error);}
  }
  function mountSlot(name) {
    if (!slots[name] || state.slot === name) return;
    if (name === 'models' && state.slot === 'how') state.component = 'all';
    state.slot = name;
    state.interactive = false;
    state.manual = false;
    slots[name].append(viewport);
    reflectControls();
    requestAnimationFrame(() => requestAnimationFrame(()=>{engine?.resize?.();applyCurrentView();}));
  }
  function setInteractive(value) {
    state.interactive = Boolean(value);
    state.manual = state.interactive;
    reflectControls();
    if (state.interactive) viewport.focus({preventScroll:true});
  }
  function setMode(mode) {
    if (!['surface','atomic','secondary'].includes(mode)) return;
    state.mode = mode;
    engine?.setMode(mode);
    reflectControls();
  }
  async function setModel(model) {
    if (!state.ready || model === state.model || !['gs','isog'].includes(model)) return;
    state.ready = false;
    state.model = model;
    $('model-load-status').textContent = `Loading the ${model} complex.`;
    reflectControls();
    await engine?.setModel(model);
  }
  function setComponent(component) {
    if (!state.ready) return;
    setVisibility(true);
    state.component = component;
    engine.setComponent(component);
    reflectControls();
  }
  function chapterProgress() {
    const node = document.querySelector(`[data-chapter="${state.chapter}"]`);
    if (!node) return 1;
    const box = node.getBoundingClientRect();
    const visual = document.querySelector('.how-visual').getBoundingClientRect();
    const trigger = Math.min(innerHeight * .62, visual.bottom + 100);
    return Math.max(0,Math.min(1,(trigger - box.top) / Math.max(180,box.height)));
  }
  function applyChapterView() {
    if (!state.ready || state.slot !== 'how' || state.manual) return;
    const chapter = chapters.find(item => item.id === state.chapter) || chapters[0];
    if (!chapter) return;
    const visible = chapter.id === 'models';
    setVisibility(visible);
    const component = chapter.id === 'inhibition' ? 'all' : (chapter.component || 'all');
    if (engine.getDiagnostics().selectedComponent !== component) engine.setComponent(component);
    if (engine.getDiagnostics().representation !== 'surface') engine.setMode('surface');
    const progress = reduced.matches ? 1 : .2 + .8 * chapterProgress();
    engine.setViewPreset(chapter.view || 'overview',{progress});
    viewport.dataset.chapterProgress = progress.toFixed(3);
  }
  function activateChapter(id, fromTap = false) {
    const chapter = chapters.find(item => item.id === id);
    if (!chapter) return;
    state.chapter = id;
    state.manual = false;
    state.interactive = false;
    document.querySelectorAll('[data-chapter]').forEach(node => {node.dataset.active = String(node.dataset.chapter === id);});
    document.querySelectorAll('[data-chapter-button]').forEach(button => {
      if (button.dataset.chapterButton === id) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    $('how-view-label').textContent = id === 'models' ? `${state.model === 'gs' ? 'GS' : 'isog'} starting complex` : 'DHFR and modeled NADPH';
    $('reaction-equation').hidden = id !== 'reaction';
    if (innerWidth <= 540 && innerHeight > 500) {
      const offset = Math.ceil(document.querySelector('.how-visual').getBoundingClientRect().height + 8);
      document.querySelectorAll('[data-chapter]').forEach(node=>{node.style.scrollMarginTop = `${offset}px`;});
    }
    reflectControls();
    applyChapterView();
    if (fromTap) {
      chapterLockedUntil = performance.now() + 1000;
      document.querySelector(`[data-chapter="${id}"]`).scrollIntoView({block:'start',behavior:reduced.matches ? 'instant':'smooth'});
    }
  }
  function renderChapters() {
    $('chapter-navigation').innerHTML = chapters.map(chapter => `<button type="button" data-chapter-button="${escape(chapter.id)}" aria-controls="chapter-${escape(chapter.id)}">${escape(chapter.shortLabel)}</button>`).join('');
    $('chapter-list').innerHTML = chapters.map(chapter => `<article class="chapter-step" id="chapter-${escape(chapter.id)}" data-chapter="${escape(chapter.id)}"><h3>${escape(chapter.title)}</h3><p>${escape(chapter.text)}</p><details><summary>More about this step</summary><p>${escape(chapter.detail)}</p>${(chapter.sources || []).map(sourceLink).join('')}</details></article>`).join('');
    document.querySelectorAll('[data-chapter-button]').forEach(button => button.addEventListener('click',() => {mountSlot('how');activateChapter(button.dataset.chapterButton,true);}));
    activateChapter('enzyme');
  }
  function updateFromScroll() {
    scrollFrame = 0;
    const aim = innerHeight * .42;
    const candidates = Object.entries(slots).map(([name,node]) => ({name,box:node.getBoundingClientRect()})).filter(({box}) => box.bottom > 0 && box.top < innerHeight);
    if (candidates.length) {
      const nearest = candidates.sort((a,b) => Math.abs((a.box.top+a.box.bottom)/2-aim)-Math.abs((b.box.top+b.box.bottom)/2-aim))[0];
      mountSlot(nearest.name);
    }
    if (state.slot === 'how') {
      if (!reduced.matches && performance.now() > chapterLockedUntil) {
        const trigger = Math.min(innerHeight * .65,document.querySelector('.how-visual').getBoundingClientRect().bottom+75);
        const steps = [...document.querySelectorAll('[data-chapter]')];
        const selected = steps.filter(node=>node.getBoundingClientRect().top<=trigger).at(-1) || steps[0];
        if (selected && selected.dataset.chapter !== state.chapter) activateChapter(selected.dataset.chapter);
      }
      if (!reduced.matches) applyChapterView();
    }
    const section = [...document.querySelectorAll('#overview,#models,#research')].filter(node=>node.getBoundingClientRect().top < innerHeight*.45).at(-1);
    const current = section?.id || 'overview';
    document.querySelectorAll('.site-header nav a').forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleScrollUpdate() {if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFromScroll);}
  function resolveHash(initial = false) {
    let hash = location.hash.slice(1);
    const legacy = {"dhfr/overview":'overview',"dhfr/story":'how-it-works',"dhfr/molecules":'models',"dhfr/modeling":'research-modeling',"dhfr/laboratory":'research-laboratory',"dhfr/chemistry":'research-chemistry',"dhfr/applications":'research-applications',"dhfr/sources":'research-sources',"application-tour":'research-applications'};
    if (legacy[hash]) {hash=legacy[hash];history.replaceState(null,'',`#${hash}`);}
    if (!hash || hash === 'overview') {
      if (!hash) history.replaceState(null,'','#overview');
      if (initial) requestAnimationFrame(()=>scrollTo({top:0,behavior:'instant'}));
      return;
    }
    const target = document.getElementById(hash);
    if (!target) return;
    if (target instanceof HTMLDetailsElement) target.open = true;
    if (hash === 'models') mountSlot('models');
    if (hash === 'how-it-works' || hash.startsWith('chapter-')) mountSlot('how');
    if (initial || target instanceof HTMLDetailsElement) requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
  }

  renderChapters();
  window.renderDHFRResearch?.($('research-content'));
  unbindResearch = window.bindDHFRResearch?.($('research-content'), async ({component,model}) => {
    mountSlot('models');
    $('models').scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});
    if (model) await setModel(model);
    setComponent(component);
    history.replaceState(null,'','#models');
  });
  $('hero-atoms').addEventListener('click',()=>{mountSlot('hero');setMode(state.mode==='atomic'?'surface':'atomic');});
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
  document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>setModel(button.dataset.model)));
  document.querySelectorAll('[data-component]').forEach(button=>button.addEventListener('click',()=>setComponent(button.dataset.component)));
  $('interaction-toggle').addEventListener('click',()=>{mountSlot('models');setInteractive(!state.interactive);});
  $('isolate').addEventListener('change',event=>engine?.isolate(event.target.checked));
  $('zoom-in').addEventListener('click',()=>{state.manual=true;engine?.zoom(.12);reflectControls();});
  $('zoom-out').addEventListener('click',()=>{state.manual=true;engine?.zoom(-.12);reflectControls();});
  $('reset-view').addEventListener('click',()=>{state.manual=false;engine?.reset();reflectControls();});
  $('retry-load').addEventListener('click',createEngine);
  $('retry-opening').addEventListener('click',createEngine);
  $('resume-guided').addEventListener('click',()=>{state.manual=false;state.interactive=false;reflectControls();applyChapterView();});
  viewport.addEventListener('pointerdown',()=>{if(state.interactive){state.manual=true;reflectControls();}});
  viewport.addEventListener('keydown',event=>{if(state.interactive&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','=','Home'].includes(event.key)){state.manual=true;reflectControls();}});
  document.querySelectorAll('a[href="#models"]').forEach(link=>link.addEventListener('click',()=>mountSlot('models')));
  document.querySelectorAll('a[href="#overview"]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    mountSlot('hero');state.manual=false;setComponent('all');
    history.replaceState(null,'','#overview');
    scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});
  }));
  addEventListener('load',()=>{if (location.hash === '#overview') scrollTo({top:0,behavior:'instant'});},{once:true});
  addEventListener('scroll',scheduleScrollUpdate,{passive:true});
  addEventListener('resize',scheduleScrollUpdate);
  addEventListener('hashchange',()=>resolveHash());
  reduced.addEventListener('change',()=>{state.manual=false;reflectControls();applyCurrentView();});
  addEventListener('beforeunload',()=>{cancelAnimationFrame(scrollFrame);observers.forEach(observer=>observer.disconnect());unbindResearch?.();engine?.destroy();});
  reflectControls();
  createEngine();
  resolveHash(true);
})();
