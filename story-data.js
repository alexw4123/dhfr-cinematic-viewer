/* Eight source-linked scenes. Biology illustrations are separate from the unchanged project models. */
(() => {
  const sources={
    transport:{title:'Methotrexate recognition by human SLC19A1',url:'https://www.nature.com/articles/s41586-022-05168-0'},
    access:{title:'Outward-open human SLC19A1 structures and transport assays',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11965291/'},
    crystal:{title:'4M6K: human DHFR, NADP+ and folate',url:'https://www.rcsb.org/structure/4M6K'},
    mtxComplex:{title:'1U72: human DHFR with methotrexate and NADPH',url:'https://www.rcsb.org/structure/1U72'},
    chemistry:{title:'Human DHFR hydride-transfer experiments',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9509475/'},
    dynamics:{title:'Human DHFR chemistry and protein motions',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8360168/'},
    pools:{title:'Methotrexate, nucleotide pools and DNA synthesis in human cells',url:'https://pubmed.ncbi.nlm.nih.gov/6982394/'},
    rescue:{title:'DNA synthesis recovery in human marrow after methotrexate',url:'https://pubmed.ncbi.nlm.nih.gov/311245/'},
    label:{title:'Methotrexate: official drug labeling',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a'},
    preparation:{title:'DHFR five-model preparation report',url:'https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit'},
    design:{title:'GS and isog design rationale',url:'https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit'}
  };
  const unresolved=(name,stage)=>({
    question:`What would establish an effect for ${name}?`,
    caption:stage==='nucleotides'?`The ${name} model has no measured inhibition result. Its effect on reduced-folate chemistry and nucleotide supply is unknown. Enzyme assays come before claims about this pathway.`:stage==='dna'?`No DNA-synthesis result exists for ${name}. A prepared pocket pose cannot predict a replication effect. Cell entry, target engagement and cell-response measurements are still needed.`:`${name} is a starting molecular model. Characterize the synthesized compound, measure inhibition, then test cell entry, cellular response and selectivity. The project has not established an anticancer treatment.`,
    evidenceType:'Research question',
    evidenceNote:'No GS/isog enzyme inhibition or cellular outcome is established in these project records.',
    deep:'The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.',
    sources:[sources.preparation,sources.design]
  });
  window.RESEARCH_STORY={
    project:'dhfr',
    title:'From a medicine to DNA synthesis',
    subtitle:'Follow the established methotrexate example, then see where the GS and isog models enter the research.',
    durationSeconds:120,
    scaleNote:'Scale labels indicate the level of explanation. Objects, spacing and elapsed time are illustrative.',
    scenes:[
      {
        id:'body',title:'In the bloodstream',question:'How can a medicine reach a cellular target?',
        caption:'Start with methotrexate, an established reference medicine. Molecules travel in the circulation before reaching tissues. The next barrier is a cell membrane. The GS and isog models are introduced later, where their transport and activity remain open questions.',
        scale:'Person to capillary · cm to µm',breadcrumb:['Person','Circulation'],durationSeconds:15,
        evidenceType:'Biology illustration',evidenceNote:'The medicine shown here is methotrexate. No administration route or patient response is being modeled.',
        deep:'Circulation, tissue distribution and cellular uptake are separate steps. This scene establishes the location of the story; it is not a pharmacokinetic simulation, a dosing guide or a prediction that every molecule enters a disease cell.',
        labels:['Methotrexate reference','Plasma','Red blood cells','Tissue cell'],sources:[sources.label,sources.transport]
      },
      {
        id:'transport',title:'Across the cell membrane',question:'Why does entering a cell require more than arriving nearby?',
        caption:'Methotrexate can use SLC19A1, the reduced folate carrier. The transporter changes which side of its central cavity is accessible, allowing transport across the membrane. This route is established for methotrexate; uptake of the GS and isog compounds has not been determined.',
        scale:'Membrane · nm',breadcrumb:['Person','Tissue','Cell membrane'],durationSeconds:15,
        evidenceType:'Transport illustration',evidenceNote:'Alternating access is illustrated from human transporter studies; the drawing is not a trajectory or an atomic transporter model.',
        deep:'SLC19A1 is an anion exchanger. Structural and uptake experiments support its role in methotrexate transport. The animation simplifies the membrane and protein motion; it does not assign this route to the nucleopeptide models or show every route available to methotrexate.',
        labels:['Outside cell','SLC19A1','Lipid membrane','Inside cell'],sources:[sources.transport,sources.access]
      },
      {
        id:'cell',title:'Find DHFR inside the cell',question:'What is the molecular target, and where is its pocket?',
        caption:'Inside the cytoplasm, isolate human DHFR and reveal the folate-binding pocket beside its cofactor. The interactive project models derive from 4M6K. They contain modeled reduced NADPH; the deposited experimental structure instead contains oxidized NADP+ and folate.',
        scale:'Enzyme · nm',breadcrumb:['Person','Cell','DHFR','Pocket'],durationSeconds:15,
        evidenceType:'Structure and model',evidenceNote:'The crowded cell is explanatory. The linked GS/isog explorer uses the actual prepared project coordinates.',
        deep:'A cellular scene provides location; it is not a whole-cell simulation. In the project preparation, the crystallographic ligands were changed and the GS or isog molecule was placed near the pocket. Those unrelaxed poses contain short contacts that require review before dynamics or binding claims.',
        labels:['Cytoplasm','Human DHFR','Folate pocket','Modeled NADPH'],modelSelection:{mode:'secondary',component:'pocket'},sources:[sources.crystal,sources.preparation]
      },
      {
        id:'reaction',title:'The normal reaction',question:'What does DHFR do before an inhibitor is added?',
        caption:'DHFR uses reducing power from NADPH to convert dihydrofolate, DHF, into tetrahydrofolate, THF. A hydride is transferred from NADPH during the chemistry. THF then supports the reduced-folate network used to make nucleotide precursors.',
        scale:'Active-site chemistry · Å',breadcrumb:['Cell','DHFR','Active site','Reaction'],durationSeconds:15,
        evidenceType:'Reaction illustration',evidenceNote:'Bond changes and hydride transfer are explanatory chemistry, not events observed in the project’s fixed-topology models.',
        deep:'The net reaction is DHF + NADPH + H+ → THF + NADP+. Human and bacterial DHFR do not have identical catalytic dynamics, so this story uses human-enzyme research. The animated timing is chosen for explanation and does not represent the measured reaction rate.',
        labels:['DHF','NADPH','Hydride transfer','THF + NADP+'],sources:[sources.chemistry,sources.dynamics]
      },
      {
        id:'inhibition',title:'Compare the molecules',question:'What is established inhibition, and what is still a model?',
        caption:'Methotrexate is an established DHFR inhibitor. GS and isog are prepared nucleopeptide starting structures. Compare their base chemistry and peptide, inspect nearby atoms and overlaps, then ask what relaxation and enzyme testing would show.',
        scale:'Binding pocket · Å to nm',breadcrumb:['Cell','DHFR','Pocket','Comparison'],durationSeconds:15,
        evidenceType:'Reference and project models',evidenceNote:'The GS/isog poses are not demonstrated inhibitors. A successful docking animation would claim more than the project has measured.',
        deep:'The two nucleopeptides share Phe-Glu while exchanging amino and oxo groups on their bases. This changes the arrangement of hydrogen-bond donors and acceptors. The next questions are whether a reasonable pose survives structural review, whether association is reproducible, and whether either synthesized compound inhibits DHFR.',
        labels:['Normal substrate','Methotrexate reference','GS model','isog model'],modelSelection:{mode:'atomic',component:'candidate'},sources:[sources.mtxComplex,sources.design,sources.preparation],
        variants:{
          normal:{question:'How does normal substrate processing differ?',caption:'In the normal reaction, DHF is processed beside NADPH and leaves as THF. This is the chemistry that inhibition testing is designed to compare against.',evidenceType:'Reaction illustration',evidenceNote:'Normal processing is established chemistry; the scene is explanatory.',sources:[sources.chemistry]},
          methotrexate:{question:'How does the established reference inhibit DHFR?',caption:'Methotrexate binds the DHFR folate pocket and inhibits the enzyme. It provides a reference for assay comparison. This animation illustrates established inhibition; it is separate from the project’s GS and isog coordinate files.',evidenceType:'Established reference',evidenceNote:'Human DHFR-methotrexate structures exist, including 1U72.',sources:[sources.mtxComplex]},
          gs:{question:'Does the GS starting pose become a useful inhibitor?',caption:'The GS model places guanosine-Phe-Glu near the pocket. Guanine has a 2-amino/6-oxo pattern. Inspect the complete molecule and unresolved overlaps; binding and inhibition have not been measured for this preparation.',evidenceType:'Project model',evidenceNote:'A starting pose is shown, not a successful drug-binding event.',sources:[sources.design,sources.preparation]},
          isog:{question:'What changes when guanine becomes isoguanine?',caption:'The isog model retains Phe-Glu but exchanges the base’s amino and oxo positions to 2-oxo/6-amino. That changes possible hydrogen-bond interactions. Whether the synthesized compound binds or inhibits DHFR remains an experimental question.',evidenceType:'Project model',evidenceNote:'Changed chemistry is established by the model; functional consequences remain unmeasured.',sources:[sources.design,sources.preparation]}
        }
      },
      {
        id:'nucleotides',title:'Follow the nucleotide supply',question:'Why can blocking folate chemistry affect DNA synthesis?',
        caption:'Reduced-folate derivatives support dUMP-to-dTMP conversion and purine synthesis. These pathways help supply the nucleotides used to copy DNA. THF is part of that chemical supply network; it is not a base inserted directly into DNA.',
        scale:'Metabolic network · cell level',breadcrumb:['Cell','Reduced folates','Nucleotide supply'],durationSeconds:15,
        evidenceType:'Pathway illustration',evidenceNote:'This simplified network explains the established reference pathway; it does not calculate intracellular concentrations.',
        deep:'DHFR regenerates THF used to maintain reduced-folate chemistry. The thymidylate and purine branches use distinct folate derivatives. Methotrexate’s cellular effects can involve more than DHFR, including effects of retained polyglutamate forms; the animation is not a complete pharmacology model.',
        labels:['Reduced-folate network','dUMP → dTMP','Purine synthesis','Nucleotide supply'],sources:[sources.pools,sources.access,sources.label],
        variants:{
          normal:{caption:'With adequate reduced-folate chemistry, thymidylate and purine pathways help supply DNA nucleotides. Folate derivatives carry chemical units; they are not themselves inserted into the DNA strand.',evidenceType:'Pathway illustration',evidenceNote:'The pathway is simplified and not quantitatively simulated.',sources:[sources.access]},
          methotrexate:{caption:'Methotrexate can disrupt folate-dependent nucleotide production. Human-cell experiments connect altered nucleotide pools with reduced DNA synthesis. The effect depends on exposure and cell biology; the animation does not predict a patient’s response.',evidenceType:'Established reference biology',evidenceNote:'The illustration summarizes human-cell evidence, not measurements from GS/isog.',sources:[sources.pools]},
          gs:unresolved('GS','nucleotides'),isog:unresolved('isog','nucleotides')
        }
      },
      {
        id:'dna',title:'At the DNA replication fork',question:'How can a distant enzyme change DNA copying?',
        caption:'DNA polymerases need a supply of nucleotides. When that supply is disturbed, DNA synthesis can slow and replication can become stressed. DHFR inhibition affects the supply pathway; it does not directly cut DNA or rewrite the DNA sequence.',
        scale:'Nucleus to replication fork · µm to nm',breadcrumb:['Cell','Nucleus','DNA replication'],durationSeconds:15,
        evidenceType:'Cell-process illustration',evidenceNote:'Fork motion is explanatory. No replication experiment or whole-cell simulation is shown for the GS/isog compounds.',
        deep:'Human methotrexate studies linked nucleotide availability to changes and recovery in DNA synthesis. The fork shown here makes that connection visible. It is not a measured replication speed, and slower motion in the illustration is not a numerical prediction of drug potency.',
        labels:['Nucleotide supply','DNA polymerase','New DNA strand','Replication fork'],sources:[sources.pools,sources.rescue],
        variants:{
          normal:{caption:'With an adequate nucleotide supply, the replication machinery can extend new DNA strands. The colored units represent nucleotides, not THF molecules.',evidenceType:'Cell-process illustration',evidenceNote:'Illustrative DNA copying, not a molecular trajectory.',sources:[sources.rescue]},
          methotrexate:{caption:'In the methotrexate comparison, reduced nucleotide availability can limit DNA synthesis. Human studies show that restoring downstream supplies can change DNA-synthesis recovery. The animation illustrates this connection without predicting the outcome of a particular treatment.',evidenceType:'Established reference biology',evidenceNote:'Cellular and clinical observations support the pathway connection; timing here is illustrative.',sources:[sources.rescue,sources.pools]},
          gs:unresolved('GS','dna'),isog:unresolved('isog','dna')
        }
      },
      {
        id:'outcome',title:'Return to the research question',question:'What would make a useful anticancer compound?',
        caption:'A useful compound must do more than occupy a modeled pocket. It must inhibit the target, reach cells and produce an interpretable response with acceptable effects on normal tissues. GS and isog currently enter this chain at the structural-model stage.',
        scale:'Cells to person',breadcrumb:['Molecular model','Enzyme test','Cell entry','Cell response'],durationSeconds:15,
        evidenceType:'Research next steps',evidenceNote:'The project has not established GS/isog anticancer activity, selectivity or clinical benefit.',
        deep:'An essential pathway can matter to both disease cells and healthy dividing tissues. Characterization and enzyme assays come first; cellular uptake, target involvement, response and selectivity are different measurements. A comparison with methotrexate needs matched conditions and a clearly stated metric, rather than a claim that a different structure is automatically better.',
        labels:['Prepared model','Enzyme inhibition','Cell entry','Response + selectivity'],sources:[sources.label,sources.design,sources.preparation],
        variants:{
          normal:{caption:'Normal dividing tissues also need folate-dependent chemistry and nucleotide supply. This is why a drug-development story must include selectivity and harmful effects, not only a tumor-cell animation.',evidenceType:'Biology illustration',evidenceNote:'The scene explains why safety and selectivity need separate study.',sources:[sources.label]},
          methotrexate:{caption:'Methotrexate is used in established treatment settings, but it can also harm normal tissues. Its benefit and toxicity depend on the clinical context. The reference explains the stakes; it is not evidence that GS or isog will act the same way.',evidenceType:'Established reference',evidenceNote:'No dosing or individual treatment recommendation is given.',sources:[sources.label]},
          gs:unresolved('GS','outcome'),isog:unresolved('isog','outcome')
        }
      }
    ]
  };
  const onstage={
    body:'Follow the established methotrexate example from circulation toward a cell. The GS and isog research models enter later.',
    transport:'SLC19A1 transports methotrexate across the membrane. This route has not been established for the GS or isog compounds.',
    cell:'Reveal DHFR and its pocket. The project coordinates contain modeled NADPH; deposited 4M6K instead contains NADP+ and folate.',
    reaction:'NADPH helps DHFR convert DHF to THF. This is a chemistry illustration, not a reaction observed in simulation.',
    inhibition:'Compare established methotrexate inhibition with the GS and isog starting poses. A modeled fit is not an inhibition result.',
    nucleotides:'Reduced-folate derivatives support thymidylate and purine production. THF participates in the supply network; it is not inserted into DNA.',
    dna:'DNA copying needs nucleotides. Disrupting their supply can slow synthesis; DHFR inhibition does not directly cut or rewrite DNA.',
    outcome:'The next steps are enzyme testing, cell entry, cellular response and selectivity. GS/isog treatment effects have not been established.'
  };
  const shortVariants={
    inhibition:{
      normal:'DHF is processed beside NADPH and leaves as THF. This is the normal reaction used for comparison.',
      methotrexate:'Methotrexate occupies the DHFR folate pocket and inhibits the enzyme. This is an established reference, separate from the GS/isog models.',
      gs:'GS places guanosine-Phe-Glu near the pocket. Its unrelaxed pose needs review; binding and inhibition remain unmeasured.',
      isog:'isog exchanges the base’s amino and oxo positions while retaining Phe-Glu. Its effect on binding and inhibition remains unmeasured.'
    },
    nucleotides:{
      normal:'Reduced-folate chemistry helps supply thymidylate and purine nucleotides. The folate molecules themselves do not become DNA bases.',
      methotrexate:'Methotrexate can disrupt nucleotide production. Human-cell evidence supports this pathway connection, not a prediction for a particular patient.',
      gs:'No GS inhibition result is available. Its effect on reduced folates and nucleotide supply is still unknown.',
      isog:'No isog inhibition result is available. Its effect on reduced folates and nucleotide supply is still unknown.'
    },
    dna:{
      normal:'Nucleotides supply the growing DNA strands. The moving units represent nucleotides, not THF.',
      methotrexate:'With disrupted nucleotide supply, DNA synthesis can slow. The animation illustrates the pathway, not measured treatment timing.',
      gs:'A GS pocket pose does not establish an effect on DNA copying. Cell entry and cellular response still need testing.',
      isog:'An isog pocket pose does not establish an effect on DNA copying. Cell entry and cellular response still need testing.'
    },
    outcome:{
      normal:'Healthy dividing tissues also depend on folate chemistry. Selectivity and harmful effects must be examined alongside anticancer activity.',
      methotrexate:'Methotrexate has established treatment uses and can harm normal tissues. Its benefit and toxicity depend on the clinical context.',
      gs:'GS remains a starting model. Characterize the compound, test inhibition, then study cell entry, response and selectivity.',
      isog:'isog remains a starting model. Characterize the compound, test inhibition, then study cell entry, response and selectivity.'
    }
  };
  for(const scene of window.RESEARCH_STORY.scenes){
    scene.onstageCaption=onstage[scene.id];
    for(const [key,variant] of Object.entries(scene.variants||{}))variant.onstageCaption=shortVariants[scene.id]?.[key]||onstage[scene.id];
  }
})();
