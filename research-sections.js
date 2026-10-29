/* DHFR teaching copy and source-linked research records. Source coordinates are unchanged. */
(() => {
  'use strict';
  const registry = window.RESEARCH_CONTENT?.sources || {};
  const sourceRecords = ids => ids.map(id => registry[id]).filter(Boolean);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const allowedSourceHosts = new Set(['www.rcsb.org','rcsb.org','pmc.ncbi.nlm.nih.gov','dailymed.nlm.nih.gov']);

  function publicUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && allowedSourceHosts.has(url.hostname) ? url.href : null;
    } catch { return null; }
  }

  function sourceLinks(records = []) {
    return `<div class="research-source-links">${records.map(source => {
      const url = publicUrl(source.url);
      return url
        ? `<a href="${escape(url)}" target="_blank" rel="noopener">${escape(source.title)}</a>`
        : `<span class="research-source-citation">${escape(source.title)}</span>`;
    }).join('')}</div>`;
  }

  window.DHFR_CHAPTERS = [
    {
      id: 'enzyme', shortLabel: 'The enzyme', title: 'What does DHFR stand for?',
      text: 'DHFR stands for dihydrofolate reductase. It is an enzyme that helps maintain the folates cells need to make DNA.',
      detail: 'An enzyme speeds up a chemical reaction. DHFR regenerates a reduced form of folate, which supports the chemistry used to make nucleotides, the building blocks of DNA.',
      view: 'overview', component: 'protein', mode: 'surface',
      sources: sourceRecords(['4m6k','dhfr-reaction'])
    },
    {
      id: 'reaction', shortLabel: 'The reaction', title: 'NADPH supplies reducing power.',
      text: 'DHFR uses NADPH to convert dihydrofolate (DHF) into tetrahydrofolate (THF). Reduced folates support nucleotide synthesis.',
      detail: 'NADPH is reduced nicotinamide adenine dinucleotide phosphate. It carries reducing power. In the normal DHFR reaction, NADPH donates a hydride as DHF is reduced to THF.',
      reaction: 'DHF + NADPH + H⁺ → THF + NADP⁺',
      view: 'reaction', component: 'nadph', mode: 'surface',
      sources: sourceRecords(['dhfr-reaction','dhfr-preparation'])
    },
    {
      id: 'inhibition', shortLabel: 'Why it matters', title: 'Why study a cancer-drug target?',
      text: 'Methotrexate inhibits folate metabolism, including DHFR. Blocking this chemistry can limit the supply used to make DNA.',
      detail: 'That established drug connection motivates studying DHFR. It does not show that the GS or isog compounds inhibit the enzyme or affect cancer cells. Those are separate experiments.',
      view: 'pocket', component: 'pocket', mode: 'surface',
      sources: sourceRecords(['methotrexate-label','dhfr-rationale'])
    },
    {
      id: 'models', shortLabel: 'Our comparison', title: 'Change the base, keep the peptide.',
      text: 'Guanosine (GS) and isoguanosine (isog) share the same Phe-Glu peptide. The models compare how the changed base chemistry sits near DHFR’s pocket.',
      detail: 'These are prepared starting poses with unresolved short contacts. Next, review the geometry, synthesize and characterize selected compounds, then measure DHFR activity with matched controls.',
      view: 'pocket', component: 'base', mode: 'surface',
      sources: sourceRecords(['dhfr-preparation','dhfr-rationale'])
    }
  ];

  window.DHFR_TERMS = [
    ['DHFR', 'Dihydrofolate reductase, the enzyme examined in this project.'],
    ['NADPH', 'Reduced nicotinamide adenine dinucleotide phosphate, a cofactor that supplies reducing power.'],
    ['DHF and THF', 'Dihydrofolate and tetrahydrofolate. DHFR converts DHF into THF; reduced folates support nucleotide production.'],
    ['GS and isog', 'Guanosine and isoguanosine. Their base chemistry differs while the shared peptide remains the same.'],
    ['Phe and Glu', 'Phenylalanine and glutamate, the two amino acids in the modeled peptide.'],
    ['Nucleopeptide', 'A molecule that connects a nucleoside-derived group to a peptide.'],
    ['Model', 'A prepared atomic arrangement to inspect and test. A modeled pose alone does not establish binding or inhibition.']
  ];

  function detail(id, title, body, intro = '') {
    return `<details id="${id}" class="research-record"><summary><span>${escape(title)}</span></summary><div class="research-record-body">${intro ? `<p class="research-record-intro">${escape(intro)}</p>` : ''}${body}</div></details>`;
  }

  function modelChemistry(project) {
    return `<div class="research-model-pair">${project.sequences.map(sequence => `<article class="research-model-record"><h3>${escape(sequence.label)}</h3><p class="research-sequence">${escape(sequence.sequence)}</p><p>${escape(sequence.caption)}</p><button type="button" data-explore="base" data-explore-model="${escape(sequence.id)}">Inspect ${sequence.id === 'gs' ? 'GS' : 'isog'} base</button></article>`).join('')}</div>
      <h3>What changes?</h3><p>Guanine has an amino group at position 2 and an oxo group at position 6. Isoguanine exchanges these to a 2-oxo/6-amino arrangement. This changes where the base can donate and accept hydrogen bonds.</p>
      <h3>What stays the same?</h3><p>Both models retain the ribose, the 5′ carbonyl-amide attachment, and L-phenylalanine-L-glutamate. The modeled glutamate has a side-chain carboxyl group and a terminal carboxyl group. A synthesized batch’s terminal state, protonation, and salt form must be documented separately.</p>
      <div class="research-inspect-controls"><button type="button" data-explore="changedBaseGroups">Highlight changed groups</button><button type="button" data-explore="phenylalanine">Inspect Phe</button><button type="button" data-explore="glutamate">Inspect Glu</button></div>${sourceLinks(sourceRecords(['dhfr-rationale','dhfr-preparation']))}`;
  }

  function laboratory(project) {
    return project.experiments.map(experiment => `<article class="research-experiment"><p class="research-context">${escape(experiment.context)}</p><h3>${escape(experiment.title)}</h3><p>${escape(experiment.summary)}</p><dl class="research-fields"><div><dt>Constructs</dt><dd>${escape(experiment.construct)}</dd></div><div><dt>Molecular sequence</dt><dd>${escape(experiment.sequence)}</dd></div>${(experiment.fields || []).map(field => `<div><dt>${escape(field.label)}</dt><dd>${escape(field.value)}</dd></div>`).join('')}</dl><h4>Preparation and measurement</h4><ol>${experiment.procedure.map(step => `<li>${escape(step)}</li>`).join('')}</ol><p>${escape(experiment.characterization)}</p><p>${escape(experiment.interpretation)}</p><p class="research-next"><strong>Next:</strong> ${escape(experiment.next)}</p><p class="research-record-note">No completed batch quantities, instrument model, yield, or spectrum is supplied in this record. Protocol targets are not shown as completed measurements.</p>${sourceLinks(experiment.sources)}</article>`).join('');
  }

  function modeling(project) {
    return `<h3>Five preparations, two interactive complexes</h3><ul class="research-model-list">${project.fiveModels.map(model => `<li><strong>${escape(model.title)}</strong><p>${escape(model.detail)}</p>${model.interactive ? `<button type="button" data-explore="candidate" data-explore-model="${model.id === 'dhfr-gs' ? 'gs' : 'isog'}">Inspect the ${model.id === 'dhfr-gs' ? 'GS' : 'isog'} complex</button>` : ''}</li>`).join('')}</ul>
      <h3>What the preparation established</h3><p>The record documents model construction, atom matching, and parameter coverage checks. Both complexes still contain short ligand-protein contacts. These need review alongside protonation and force-field choices before minimization, equilibration, or production dynamics.</p>
      <ol class="research-method-steps">${project.steps.map(step => `<li><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p>${sourceLinks(step.sources)}</li>`).join('')}</ol>
      <p class="research-record-note">The current complexes are derived from 4M6K. Separate historical technical pilots used 1U72. Neither historical pilot work nor a static starting pose supplies GS/isog inhibition or cell-response results.</p>`;
  }

  function chemistry(project) {
    return `<p class="research-equation">${escape(project.chemistry.reaction)}</p><ol>${project.chemistry.steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol><h3>Terms used on this page</h3><dl class="research-glossary">${window.DHFR_TERMS.map(([term, meaning]) => `<div><dt>${escape(term)}</dt><dd>${escape(meaning)}</dd></div>`).join('')}</dl><h3>Which cofactor is shown?</h3><p>The deposited 4M6K crystal structure contains oxidized NADP⁺ and folic acid. The project preparation removes those ligands and introduces the modeled reduced NADPH shown with GS or isog. These prepared coordinates are separate from the deposited experimental structure.</p>${sourceLinks(project.chemistry.sources)}`;
  }

  function applications(project, application) {
    const evidence = application?.evidence || [];
    const comparisons = application?.comparisons || [];
    return `<p>${escape(application?.intro || project.relevance)}</p><h3>Why compare these molecules?</h3><p>${escape(application?.design?.text || project.applications[1].text)}</p><h3>What would establish an advantage?</h3><p>Compare the same conditions and measure the difference. A changed base or a plausible picture does not establish an improvement over an existing inhibitor.</p><div class="research-table-scroll" tabindex="0" role="region" aria-label="Application comparisons"><table class="research-comparison-table"><thead><tr><th scope="col">Question</th><th scope="col">Comparison</th><th scope="col">Evidence needed</th></tr></thead><tbody>${comparisons.map(comparison => `<tr><th scope="row">${escape(comparison.goal)}</th><td>${escape(comparison.existing)}</td><td>${escape(comparison.test)}<p>${escape(comparison.meaning)}</p></td></tr>`).join('')}</tbody></table></div><h3>Different tests answer different questions</h3><dl class="research-test-questions">${project.testQuestions.map(test => `<div><dt>${escape(test.test)}</dt><dd>${escape(test.question)}</dd></div>`).join('')}</dl><h3>What earlier work demonstrated</h3>${project.priorWork.map(work => `<article class="research-reference-record"><h4>${escape(work.title)}</h4><p>${escape(work.text)}</p>${sourceLinks(work.sources)}</article>`).join('')}${evidence.map(study => `<article class="research-reference-record"><h4>${escape(study.title)}</h4><p>${escape(study.text)}</p>${sourceLinks([study])}</article>`).join('')}<p class="research-next"><strong>Next experiment:</strong> ${escape(application?.next || project.nextExperiment)}</p><p class="research-record-note">${escape(application?.limits || 'The records do not include GS/isog inhibition curves or cell-response results.')}</p>`;
  }

  function sourcesAndMethods(project) {
    return `<h3>${escape(project.title)}</h3><p>${escape(project.credit)}<br>${escape(project.lab)} · ${escape(project.institution)}<br>In collaboration with Dr. Phelan</p><dl class="research-roles">${Object.values(project.roles || {}).map(role => `<div><dd>${escape(role)}</dd></div>`).join('')}</dl><h3>Source records and primary studies</h3><p>Public studies are linked. Laboratory records are cited by title; their access remains with the lab.</p>${sourceLinks(project.sources)}<h3>Model files and rendering</h3><p>Each supplied complex contains ${Number(project.model.atomCount).toLocaleString('en-US')} atoms and ${Number(project.model.bondCount).toLocaleString('en-US')} explicit bonds. The viewer checks file hashes, atom counts, and connectivity before rendering. Additional bond inference is disabled. Secondary structure is calculated separately from each model’s coordinates.</p><p>The surface uses the source atoms’ van der Waals radii, with a view-facing cutaway to reveal the pocket. Atoms and secondary structure use the complete model. The source coordinates and bonds are unchanged. Camera motion changes the view; it is not a simulation of binding or a chemical reaction.</p><div class="research-source-links"><a href="assets/dhfr-gs-connected.pdb" download>GS complex coordinates</a><a href="assets/dhfr-isog-connected.pdb" download>isog complex coordinates</a></div>`;
  }

  window.renderDHFRResearch = function renderDHFRResearch(host) {
    if (!(host instanceof HTMLElement)) throw new Error('A research content container is required.');
    const project = window.RESEARCH_CONTENT?.projects?.dhfr;
    if (!project) {
      host.innerHTML = '<p class="research-load-error">The research records could not load. Reload to try again.</p>';
      return false;
    }
    const application = window.RESEARCH_APPLICATIONS?.dhfr;
    host.innerHTML = detail('research-models','Molecular chemistry',modelChemistry(project),'Compare the complete models, then inspect the chemical change.')
      + detail('research-laboratory','Laboratory work',laboratory(project),'The next measurements must connect compound identity to an enzyme result.')
      + detail('research-modeling','Model preparation and findings',modeling(project),'Keep preparation, simulation, and experimental validation as separate stages.')
      + detail('research-chemistry','Chemistry and definitions',chemistry(project),'Define the terms, then follow the normal enzyme reaction.')
      + detail('research-applications','Cancer relevance and next experiments',applications(project,application),'An established target motivates the work. The compounds still need to be tested.')
      + detail('research-sources','Sources and methods',sourcesAndMethods(project));
    host.dataset.researchReady = 'true';
    return true;
  };

  window.bindDHFRResearch = function bindDHFRResearch(host, onExplore) {
    const listener = event => {
      const button = event.target.closest('button[data-explore]');
      if (!button || !host.contains(button)) return;
      onExplore?.({component: button.dataset.explore, model: button.dataset.exploreModel || null});
    };
    host.addEventListener('click', listener);
    return () => host.removeEventListener('click', listener);
  };
})();
