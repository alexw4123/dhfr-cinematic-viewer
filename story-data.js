/* Source-linked project content. Molecular files and notebook permissions are unchanged. */
window.RESEARCH_STORY = {
  "project": "dhfr",
  "title": "How it works",
  "subtitle": "",
  "durationSeconds": 35,
  "scaleNote": "The molecular model shows structure. The reaction scenes explain chemistry; their motion and timing are illustrative.",
  "scenes": [
    {
      "id": "body",
      "title": "In the bloodstream",
      "question": "How can a medicine reach a cellular target?",
      "caption": "Start with methotrexate, an established reference medicine. Molecules travel in the circulation before reaching tissues. The next barrier is a cell membrane. The GS and isog models are introduced later, where their transport and activity remain open questions.",
      "scale": "Person to capillary · cm to µm",
      "breadcrumb": [
        "Person",
        "Circulation"
      ],
      "durationSeconds": 7,
      "evidenceType": "Biology illustration",
      "evidenceNote": "The medicine shown here is methotrexate. No administration route or patient response is being modeled.",
      "deep": "Circulation, tissue distribution and cellular uptake are separate steps. This scene establishes the location of the story; it is not a pharmacokinetic simulation, a dosing guide or a prediction that every molecule enters a disease cell.",
      "labels": [
        "Methotrexate reference",
        "Plasma",
        "Red blood cells",
        "Tissue cell"
      ],
      "sources": [
        {
          "title": "Methotrexate: official drug labeling",
          "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
        },
        {
          "title": "Methotrexate recognition by human SLC19A1",
          "url": "https://www.nature.com/articles/s41586-022-05168-0"
        }
      ],
      "onstageCaption": "Follow the established methotrexate example from circulation toward a cell. The GS and isog research models enter later."
    },
    {
      "id": "transport",
      "title": "Across the cell membrane",
      "question": "Why does entering a cell require more than arriving nearby?",
      "caption": "Methotrexate can use SLC19A1, the reduced folate carrier. The transporter changes which side of its central cavity is accessible, allowing transport across the membrane. This route is established for methotrexate; uptake of the GS and isog compounds has not been determined.",
      "scale": "Membrane · nm",
      "breadcrumb": [
        "Person",
        "Tissue",
        "Cell membrane"
      ],
      "durationSeconds": 7,
      "evidenceType": "Transport illustration",
      "evidenceNote": "Alternating access is illustrated from human transporter studies; the drawing is not a trajectory or an atomic transporter model.",
      "deep": "SLC19A1 is an anion exchanger. Structural and uptake experiments support its role in methotrexate transport. The animation simplifies the membrane and protein motion; it does not assign this route to the nucleopeptide models or show every route available to methotrexate.",
      "labels": [
        "Outside cell",
        "SLC19A1",
        "Lipid membrane",
        "Inside cell"
      ],
      "sources": [
        {
          "title": "Methotrexate recognition by human SLC19A1",
          "url": "https://www.nature.com/articles/s41586-022-05168-0"
        },
        {
          "title": "Outward-open human SLC19A1 structures and transport assays",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11965291/"
        }
      ],
      "onstageCaption": "SLC19A1 transports methotrexate across the membrane. This route has not been established for the GS or isog compounds."
    },
    {
      "id": "cell",
      "title": "Human DHFR",
      "question": "What does this enzyme do?",
      "caption": "DHFR recycles dihydrofolate into tetrahydrofolate, using NADPH. Reduced folates help the cell make nucleotides, the building blocks needed to copy DNA.",
      "scale": "Enzyme · nm",
      "breadcrumb": [
        "Person",
        "Cell",
        "DHFR",
        "Pocket"
      ],
      "durationSeconds": 7,
      "evidenceType": "Structure and model",
      "evidenceNote": "This view uses the prepared GS complex. It does not show cellular uptake or a whole-cell simulation.",
      "deep": "The preparation starts from human DHFR in 4M6K. The crystallographic ligands were changed and the GS or isog molecule was placed near the pocket. These unrelaxed poses contain short contacts that need review before simulation or binding experiments.",
      "labels": [
        "Cytoplasm",
        "Human DHFR",
        "Folate pocket",
        "Modeled NADPH"
      ],
      "modelSelection": {
        "mode": "secondary",
        "component": "pocket"
      },
      "sources": [
        {
          "title": "4M6K: human DHFR, NADP+ and folate",
          "url": "https://www.rcsb.org/structure/4M6K"
        },
        {
          "title": "DHFR five-model preparation report"
        }
      ],
      "onstageCaption": "DHFR uses NADPH to maintain reduced folates. These support production of the nucleotides needed to copy DNA."
    },
    {
      "id": "reaction",
      "title": "The normal reaction",
      "question": "What changes during the reaction?",
      "caption": "NADPH transfers a hydride to DHF as the enzyme produces THF. NADPH is oxidized to NADP+. A hydride is a hydrogen nucleus with two electrons.",
      "scale": "Active-site chemistry · Å",
      "breadcrumb": [
        "Cell",
        "DHFR",
        "Active site",
        "Reaction"
      ],
      "durationSeconds": 7,
      "evidenceType": "Reaction illustration",
      "evidenceNote": "Bond changes and hydride transfer are explanatory chemistry, not events observed in the project’s fixed-topology models.",
      "deep": [
        "The net reaction is DHF + NADPH + H+ → THF + NADP+. Human and bacterial DHFR do not have identical catalytic dynamics, so this story uses human-enzyme research. The animated timing is chosen for explanation and does not represent the measured reaction rate.",
        "The moving DHF/THF markers explain the reaction; they are not deposited atomic substrate coordinates. The backdrop uses the prepared project DHFR and modeled NADPH coordinates with the GS nucleopeptide hidden. Of the 3,153 source atoms, 3,087 protein/cofactor atoms are shown. Source verification covers the full file and its 3,195 explicit bonds. This display does not show bond changes observed in a fixed-topology trajectory."
      ],
      "labels": [
        "DHF",
        "NADPH",
        "Hydride transfer",
        "THF + NADP+"
      ],
      "sources": [
        {
          "title": "Human DHFR hydride-transfer experiments",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9509475/"
        },
        {
          "title": "Human DHFR chemistry and protein motions",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8360168/"
        }
      ],
      "onstageCaption": "DHFR uses NADPH to reduce DHF to THF. The reduced-folate pool supports nucleotide synthesis."
    },
    {
      "id": "inhibition",
      "title": "Compare the molecules",
      "question": "Does the changed base fit the same pocket?",
      "caption": "Methotrexate is an established inhibitor used as a reference. GS and isog change the base chemistry while keeping the Phe-Glu peptide; their starting poses need refinement and an inhibition test.",
      "scale": "Binding pocket · Å to nm",
      "breadcrumb": [
        "Cell",
        "DHFR",
        "Pocket",
        "Comparison"
      ],
      "durationSeconds": 7,
      "evidenceType": "Reference and project models",
      "evidenceNote": "The GS/isog poses are not demonstrated inhibitors. A successful docking animation would claim more than the project has measured.",
      "deep": [
        "The two nucleopeptides share Phe-Glu while exchanging amino and oxo groups on their bases. This changes the arrangement of hydrogen-bond donors and acceptors. The next questions are whether a reasonable pose survives structural review, whether association is reproducible, and whether either synthesized compound inhibits DHFR.",
        "Normal and methotrexate reference views show the actual prepared protein and modeled NADPH with the GS nucleopeptide hidden. The separate named substrate/inhibitor markers are explanatory, not fabricated atomic poses. Selecting GS or isog restores that model’s supplied full complex and unresolved geometry. The five current 4M6K preparations are separate from historical 1U72 technical pilots."
      ],
      "labels": [
        "Normal substrate",
        "Methotrexate reference",
        "GS model",
        "isog model"
      ],
      "modelSelection": {
        "mode": "atomic",
        "component": "candidate"
      },
      "sources": [
        {
          "title": "1U72: human DHFR with methotrexate and NADPH",
          "url": "https://www.rcsb.org/structure/1U72"
        },
        {
          "title": "GS and isog design rationale"
        },
        {
          "title": "DHFR five-model preparation report"
        }
      ],
      "variants": {
        "normal": {
          "question": "How does normal substrate processing differ?",
          "caption": "In the normal reaction, DHF is processed beside NADPH and leaves as THF. This is the chemistry that inhibition testing is designed to compare against.",
          "evidenceType": "Reaction illustration",
          "evidenceNote": "Normal processing is established chemistry; the scene is explanatory.",
          "sources": [
            {
              "title": "Human DHFR hydride-transfer experiments",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9509475/"
            }
          ],
          "onstageCaption": "DHF is processed beside NADPH and leaves as THF. This is the normal reaction used for comparison."
        },
        "methotrexate": {
          "question": "How does the established reference inhibit DHFR?",
          "caption": "Methotrexate occupies the folate-binding region and inhibits DHFR. Experimental human-DHFR structures provide a reference for studying the GS and isog designs.",
          "evidenceType": "Established reference",
          "evidenceNote": "Human DHFR-methotrexate structures exist, including 1U72.",
          "sources": [
            {
              "title": "1U72: human DHFR with methotrexate and NADPH",
              "url": "https://www.rcsb.org/structure/1U72"
            }
          ],
          "onstageCaption": "Methotrexate is the established inhibitor reference. Its behavior provides context for the GS and isog design questions."
        },
        "gs": {
          "question": "Does the GS starting pose become a useful inhibitor?",
          "caption": "Guanine carries a 2-amino/6-oxo pattern. The Phe-Glu peptide is shared with isog. The prepared pose contains short contacts that need refinement before inhibition testing.",
          "evidenceType": "Project model",
          "evidenceNote": "A starting pose is shown, not a successful drug-binding event.",
          "sources": [
            {
              "title": "GS and isog design rationale"
            },
            {
              "title": "DHFR five-model preparation report"
            }
          ],
          "onstageCaption": "GS presents guanine’s 2-amino/6-oxo face alongside Phe-Glu. Inspect the pocket fit and unresolved close contacts."
        },
        "isog": {
          "question": "What changes when guanine becomes isoguanine?",
          "caption": "Isoguanine changes the base pattern to 2-oxo/6-amino. This changes its hydrogen-bonding face while retaining Phe-Glu. The prepared pose still needs refinement and inhibition testing.",
          "evidenceType": "Project model",
          "evidenceNote": "Changed chemistry is established by the model; functional consequences remain unmeasured.",
          "sources": [
            {
              "title": "GS and isog design rationale"
            },
            {
              "title": "DHFR five-model preparation report"
            }
          ],
          "onstageCaption": "Isog changes the base to a 2-oxo/6-amino face while retaining Phe-Glu. Its short contacts also need review."
        }
      },
      "onstageCaption": "Compare the base chemistry at the same enzyme pocket. GS and isog retain the Phe-Glu peptide while changing the arrangement of base donors and acceptors."
    },
    {
      "id": "nucleotides",
      "title": "Nucleotide supply",
      "question": "Why does the reaction matter to a cell?",
      "caption": "Reduced-folate derivatives support thymidylate and purine synthesis. Inhibiting DHFR can restrict that supply, which helps explain why this enzyme matters to rapidly dividing cells.",
      "scale": "Metabolic network · cell level",
      "breadcrumb": [
        "Cell",
        "Reduced folates",
        "Nucleotide supply"
      ],
      "durationSeconds": 7,
      "evidenceType": "Pathway illustration",
      "evidenceNote": "This simplified network explains the established reference pathway; it does not calculate intracellular concentrations.",
      "deep": "DHFR regenerates THF used to maintain reduced-folate chemistry. The thymidylate and purine branches use distinct folate derivatives. Methotrexate’s cellular effects can involve more than DHFR, including effects of retained polyglutamate forms; the animation is not a complete pharmacology model.",
      "labels": [
        "Reduced-folate network",
        "dUMP → dTMP",
        "Purine synthesis",
        "Nucleotide supply"
      ],
      "sources": [
        {
          "title": "Methotrexate, nucleotide pools and DNA synthesis in human cells",
          "url": "https://pubmed.ncbi.nlm.nih.gov/6982394/"
        },
        {
          "title": "Outward-open human SLC19A1 structures and transport assays",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11965291/"
        },
        {
          "title": "Methotrexate: official drug labeling",
          "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
        }
      ],
      "variants": {
        "normal": {
          "caption": "With adequate reduced-folate chemistry, thymidylate and purine pathways help supply DNA nucleotides. Folate derivatives carry chemical units; they are not themselves inserted into the DNA strand.",
          "evidenceType": "Pathway illustration",
          "evidenceNote": "The pathway is simplified and not quantitatively simulated.",
          "sources": [
            {
              "title": "Outward-open human SLC19A1 structures and transport assays",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11965291/"
            }
          ],
          "onstageCaption": "Reduced-folate chemistry helps supply thymidylate and purine nucleotides. The folate molecules themselves do not become DNA bases."
        },
        "methotrexate": {
          "caption": "Methotrexate can disrupt folate-dependent nucleotide production. Human-cell experiments connect altered nucleotide pools with reduced DNA synthesis. The effect depends on exposure and cell biology; the animation does not predict a patient’s response.",
          "evidenceType": "Established reference biology",
          "evidenceNote": "The illustration summarizes human-cell evidence, not measurements from GS/isog.",
          "sources": [
            {
              "title": "Methotrexate, nucleotide pools and DNA synthesis in human cells",
              "url": "https://pubmed.ncbi.nlm.nih.gov/6982394/"
            }
          ],
          "onstageCaption": "Methotrexate can disrupt nucleotide production. Human-cell evidence supports this pathway connection, not a prediction for a particular patient."
        },
        "gs": {
          "question": "What would establish an effect for GS?",
          "caption": "Enzyme assays will establish whether GS inhibits DHFR. Cellular uptake and target effects must then be tested before connecting it to nucleotide production.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "GS remains an experimental question: measure inhibition, then test uptake and the cellular pathway response."
        },
        "isog": {
          "question": "What would establish an effect for isog?",
          "caption": "Enzyme assays will establish whether isog inhibits DHFR. Cellular uptake and target effects must then be tested before connecting it to nucleotide production.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "isog remains an experimental question: measure inhibition, then test uptake and the cellular pathway response."
        }
      },
      "onstageCaption": "Reduced folates support thymidylate and purine production. These pathways supply nucleotides for DNA synthesis."
    },
    {
      "id": "dna",
      "title": "DNA synthesis",
      "question": "How can the nucleotide supply affect DNA copying?",
      "caption": "DNA polymerases add nucleotides to growing DNA strands. Restricting nucleotide supply can slow replication. A cell experiment is needed to connect a new compound’s enzyme effect to this outcome.",
      "scale": "Nucleus to replication fork · µm to nm",
      "breadcrumb": [
        "Cell",
        "Nucleus",
        "DNA replication"
      ],
      "durationSeconds": 7,
      "evidenceType": "Cell-process illustration",
      "evidenceNote": "Fork motion is explanatory. No replication experiment or whole-cell simulation is shown for the GS/isog compounds.",
      "deep": "Human methotrexate studies linked nucleotide availability to changes and recovery in DNA synthesis. The fork shown here makes that connection visible. It is not a measured replication speed, and slower motion in the illustration is not a numerical prediction of drug potency.",
      "labels": [
        "Nucleotide supply",
        "DNA polymerase",
        "New DNA strand",
        "Replication fork"
      ],
      "sources": [
        {
          "title": "Methotrexate, nucleotide pools and DNA synthesis in human cells",
          "url": "https://pubmed.ncbi.nlm.nih.gov/6982394/"
        },
        {
          "title": "DNA synthesis recovery in human marrow after methotrexate",
          "url": "https://pubmed.ncbi.nlm.nih.gov/311245/"
        }
      ],
      "variants": {
        "normal": {
          "caption": "With an adequate nucleotide supply, the replication machinery can extend new DNA strands. The colored units represent nucleotides, not THF molecules.",
          "evidenceType": "Cell-process illustration",
          "evidenceNote": "Illustrative DNA copying, not a molecular trajectory.",
          "sources": [
            {
              "title": "DNA synthesis recovery in human marrow after methotrexate",
              "url": "https://pubmed.ncbi.nlm.nih.gov/311245/"
            }
          ],
          "onstageCaption": "Nucleotides supply the growing DNA strands. The moving units represent nucleotides, not THF."
        },
        "methotrexate": {
          "caption": "In the methotrexate comparison, reduced nucleotide availability can limit DNA synthesis. Human studies show that restoring downstream supplies can change DNA-synthesis recovery. The animation illustrates this connection without predicting the outcome of a particular treatment.",
          "evidenceType": "Established reference biology",
          "evidenceNote": "Cellular and clinical observations support the pathway connection; timing here is illustrative.",
          "sources": [
            {
              "title": "DNA synthesis recovery in human marrow after methotrexate",
              "url": "https://pubmed.ncbi.nlm.nih.gov/311245/"
            },
            {
              "title": "Methotrexate, nucleotide pools and DNA synthesis in human cells",
              "url": "https://pubmed.ncbi.nlm.nih.gov/6982394/"
            }
          ],
          "onstageCaption": "With disrupted nucleotide supply, DNA synthesis can slow. The animation illustrates the pathway, not measured treatment timing."
        },
        "gs": {
          "question": "What would establish an effect for GS?",
          "caption": "Cell experiments will test whether GS reaches its target and changes DNA synthesis. A prepared pocket pose does not answer those questions.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "The GS model guides a test. Its effects on DNA synthesis and cells still need to be measured."
        },
        "isog": {
          "question": "What would establish an effect for isog?",
          "caption": "Cell experiments will test whether isog reaches its target and changes DNA synthesis. A prepared pocket pose does not answer those questions.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "The isog model guides a test. Its effects on DNA synthesis and cells still need to be measured."
        }
      },
      "onstageCaption": "DNA polymerases need a steady nucleotide supply. Restricting it can slow DNA copying, explaining the pathway connection to DHFR inhibition."
    },
    {
      "id": "outcome",
      "title": "Return to the research question",
      "question": "What would make a useful anticancer compound?",
      "caption": "A useful compound must do more than occupy a modeled pocket. It must inhibit the target, reach cells and produce an interpretable response with acceptable effects on normal tissues. GS and isog currently enter this chain at the structural-model stage.",
      "scale": "Cells to person",
      "breadcrumb": [
        "Molecular model",
        "Enzyme test",
        "Cell entry",
        "Cell response"
      ],
      "durationSeconds": 7,
      "evidenceType": "Research next steps",
      "evidenceNote": "The project has not established GS/isog anticancer activity, selectivity or clinical benefit.",
      "deep": "An essential pathway can matter to both disease cells and healthy dividing tissues. Characterization and enzyme assays come first; cellular uptake, target involvement, response and selectivity are different measurements. A comparison with methotrexate needs matched conditions and a clearly stated metric, rather than a claim that a different structure is automatically better.",
      "labels": [
        "Prepared model",
        "Enzyme inhibition",
        "Cell entry",
        "Response + selectivity"
      ],
      "sources": [
        {
          "title": "Methotrexate: official drug labeling",
          "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
        },
        {
          "title": "GS and isog design rationale"
        },
        {
          "title": "DHFR five-model preparation report"
        }
      ],
      "variants": {
        "normal": {
          "caption": "Normal dividing tissues also need folate-dependent chemistry and nucleotide supply. This is why a drug-development story must include selectivity and harmful effects, not only a tumor-cell animation.",
          "evidenceType": "Biology illustration",
          "evidenceNote": "The scene explains why safety and selectivity need separate study.",
          "sources": [
            {
              "title": "Methotrexate: official drug labeling",
              "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
            }
          ],
          "onstageCaption": "Healthy dividing tissues also depend on folate chemistry. Selectivity and harmful effects must be examined alongside anticancer activity."
        },
        "methotrexate": {
          "caption": "Methotrexate is used in established treatment settings, but it can also harm normal tissues. Its benefit and toxicity depend on the clinical context. The reference explains the stakes; it is not evidence that GS or isog will act the same way.",
          "evidenceType": "Established reference",
          "evidenceNote": "No dosing or individual treatment recommendation is given.",
          "sources": [
            {
              "title": "Methotrexate: official drug labeling",
              "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
            }
          ],
          "onstageCaption": "Methotrexate has established treatment uses and can harm normal tissues. Its benefit and toxicity depend on the clinical context."
        },
        "gs": {
          "question": "What would establish an effect for GS?",
          "caption": "GS is a starting molecular model. Characterize the synthesized compound, measure inhibition, then test cell entry, cellular response and selectivity. The project has not established an anticancer treatment.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "GS remains a starting model. Characterize the compound, test inhibition, then study cell entry, response and selectivity."
        },
        "isog": {
          "question": "What would establish an effect for isog?",
          "caption": "isog is a starting molecular model. Characterize the synthesized compound, measure inhibition, then test cell entry, cellular response and selectivity. The project has not established an anticancer treatment.",
          "evidenceType": "Research question",
          "evidenceNote": "No GS/isog enzyme inhibition or cellular outcome is established in these project records.",
          "deep": "The molecular model can help identify geometry and chemistry to inspect. An apparent fit is not a binding measurement. Even a reproducible enzyme result would still leave uptake, metabolism, cellular target involvement and effects on normal cells to test.",
          "sources": [
            {
              "title": "DHFR five-model preparation report"
            },
            {
              "title": "GS and isog design rationale"
            }
          ],
          "onstageCaption": "isog remains a starting model. Characterize the compound, test inhibition, then study cell entry, response and selectivity."
        }
      },
      "onstageCaption": "The next steps are enzyme testing, cell entry, cellular response and selectivity. GS/isog treatment effects have not been established."
    }
  ],
  "mainSceneIds": [
    "cell",
    "reaction",
    "inhibition",
    "nucleotides",
    "dna"
  ]
};
