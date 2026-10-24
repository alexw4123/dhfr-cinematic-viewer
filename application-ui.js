/* Specific use cases and fair benchmarks. No invented performance measurements. */
window.renderResearchApplication = function renderResearchApplication(project) {
  const d=window.RESEARCH_APPLICATIONS[project];
  if(!d)return '<p class="source-note">Application details could not be loaded. Reload to try again.</p>';
  const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const links=arr=>(arr||[]).map(s=>`<a href="${e(s.url)}" target="_blank" rel="noopener">${e(s.title)} ↗</a>`).join('');
  const firstCards=[d.existing,d.design].map(c=>`<article class="card"><h3>${e(c.title)}</h3><p>${e(c.text)}</p>${links(c.sources)}</article>`).join('');
  let h=`<h2>${e(d.title)}</h2><p class="section-intro">${e(d.intro)}</p><div class="cards-grid application-intro">${firstCards}</div>`;
  h+=`<article class="card application-purpose"><span class="eyebrow">The first useful result</span><h3>${e(d.use.title)}</h3><p>${e(d.use.text)}</p><a href="#dhfr/molecules">Compare the model bases ↗</a></article>`;

  h+=`<section class="application-benchmark"><h3>What would establish an advantage?</h3><p class="section-intro">Compare the same conditions and measure the difference.</p><div class="comparison-table" tabindex="0" role="region" aria-label="Application comparisons"><table><thead><tr><th scope="col">Question</th><th scope="col">Compare with</th><th scope="col">Evidence that would answer it</th></tr></thead><tbody>${d.comparisons.map(r=>`<tr><th scope="row">${e(r.goal)}</th><td>${e(r.existing)}</td><td>${e(r.test)}<small>${e(r.meaning)}</small></td></tr>`).join('')}</tbody></table></div></section>`;
  h+=`<div class="cards-grid application-evidence">${d.evidence.map(s=>`<article class="card"><h3>${e(s.title)}</h3><p>${e(s.text)}</p><a href="${e(s.url)}" target="_blank" rel="noopener">Read the primary study ↗</a></article>`).join('')}</div><section class="application-next"><div><span class="eyebrow">Next experiment</span><p>${e(d.next)}</p></div><a href="#${project}/laboratory">Open the experiment record ↗</a></section><p class="source-note application-limits">${e(d.limits)}</p>`;
  return h;
};
window.bindResearchApplication = function bindResearchApplication() {};
