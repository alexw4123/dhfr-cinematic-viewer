/* Source-linked project content. Molecular files and notebook permissions are unchanged. */
window.RESEARCH_CONTENT = {
  "version": "2026-10-24-source-audit-v5",
  "navigation": [
    "Overview",
    "Atomic structure",
    "How it works",
    "Research",
    "Sources"
  ],
  "sources": {
    "dhfr-preparation": {
      "id": "dhfr-preparation",
      "title": "DHFR five-model preparation report",
      "access": "Existing document permissions retained"
    },
    "dhfr-rationale": {
      "id": "dhfr-rationale",
      "title": "DHFR design rationale",
      "access": "Existing document permissions retained"
    },
    "4m6k": {
      "id": "4m6k",
      "title": "RCSB PDB · 4M6K",
      "url": "https://www.rcsb.org/structure/4M6K",
      "access": "Public"
    },
    "dhfr-reaction": {
      "id": "dhfr-reaction",
      "title": "DHFR reaction and dynamics primary research",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3823643/",
      "access": "Public"
    },
    "dhfr-peptide-precedent": {
      "id": "dhfr-peptide-precedent",
      "title": "Different peptide-based DHFR inhibitor research",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5816602/",
      "access": "Public"
    },
    "methotrexate-label": {
      "id": "methotrexate-label",
      "title": "Methotrexate · official drug labeling",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a",
      "access": "Public"
    }
  },
  "projects": {
    "dhfr": {
      "id": "dhfr",
      "shortName": "DHFR models",
      "title": "Design, Synthesis, and Computational Evaluation of Peptide-Based Inhibitors Targeting Dihydrofolate Reductase in Cancer",
      "credit": "Alexander Wong",
      "lab": "Smith-Carpenter Lab",
      "institution": "Fairfield University",
      "collaboration": "In collaboration with Dr. Phelan’s lab",
      "question": "How does changing the base affect a model’s fit at DHFR?",
      "overview": "DHFR uses NADPH to convert dihydrofolate into tetrahydrofolate, helping maintain reduced folates for nucleotide production. The project compares GS-Phe-Glu and isog-Phe-Glu to ask how changing the nucleoside base affects the modeled pocket fit.",
      "next": "Review the unresolved contacts and chemical-state choices in the five-model preparation. After suitable compounds are synthesized and characterized, Dr. Phelan’s lab can test DHFR inhibition and cellular effects with the agreed controls.",
      "nextDetail": "Model clashes, protonation and force-field choices need review before dynamics. Enzyme inhibition, cell entry and cell response answer separate questions.",
      "relevance": "DHFR inhibition can restrict the reduced-folate supply used for DNA synthesis. The immediate use of these models is to guide a controlled comparison of the two compounds.",
      "model": {
        "label": "GS / isog model complexes",
        "caption": "4M6K-derived preparation models with unrelaxed poses. Switch between GS and isog to compare the changed base and shared peptide.",
        "atomCount": 3153,
        "bondCount": 3195,
        "files": {
          "gs": "https://alexw4123.github.io/dhfr-cinematic-viewer/assets/dhfr-gs-connected.pdb",
          "isog": "https://alexw4123.github.io/dhfr-cinematic-viewer/assets/dhfr-isog-connected.pdb"
        }
      },
      "components": [
        {
          "id": "enzyme",
          "label": "Human DHFR",
          "text": "DHFR converts dihydrofolate, or DHF, to tetrahydrofolate, or THF. This helps maintain the reduced-folate supply used to make nucleotides.",
          "sourceIds": [
            "4m6k",
            "dhfr-reaction"
          ],
          "sources": [
            {
              "id": "4m6k",
              "title": "RCSB PDB · 4M6K",
              "url": "https://www.rcsb.org/structure/4M6K",
              "access": "Public"
            },
            {
              "id": "dhfr-reaction",
              "title": "DHFR reaction and dynamics primary research",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3823643/",
              "access": "Public"
            }
          ]
        },
        {
          "id": "candidate",
          "label": "GS / isog model",
          "text": "GS and isog share the L-Phe-L-Glu peptide. Guanine has a 2-amino/6-oxo pattern; isoguanine changes it to 2-oxo/6-amino, changing the base’s hydrogen-bonding face.",
          "sourceIds": [
            "dhfr-rationale"
          ],
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "nadph",
          "label": "NADPH",
          "text": "NADPH supplies reducing power for the normal DHFR reaction. These prepared models contain modeled reduced NADPH; deposited 4M6K contains oxidized NADP+ and folic acid.",
          "sourceIds": [
            "dhfr-preparation",
            "4m6k"
          ],
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            },
            {
              "id": "4m6k",
              "title": "RCSB PDB · 4M6K",
              "url": "https://www.rcsb.org/structure/4M6K",
              "access": "Public"
            }
          ]
        },
        {
          "id": "pocket",
          "label": "Modeled pocket",
          "text": "The prepared molecules sit near the folate-binding pocket. Short contacts remain in both unrelaxed poses, so these positions are starting geometries to inspect.",
          "sourceIds": [
            "dhfr-preparation"
          ],
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            }
          ]
        }
      ],
      "sequences": [
        {
          "id": "gs",
          "label": "GS-Phe-Glu",
          "sequence": "Guanosine-L-Phe-L-Glu",
          "interactive": true,
          "caption": "Complete 66-atom GS model in its prepared complex. The base, ribose, 5′ carbonyl linker and L-Phe-L-Glu peptide remain connected.",
          "sourceIds": [
            "dhfr-rationale",
            "dhfr-preparation"
          ]
        },
        {
          "id": "isog",
          "label": "isog-Phe-Glu",
          "sequence": "Isoguanosine-L-Phe-L-Glu",
          "interactive": true,
          "caption": "Complete 66-atom isog model with the same peptide and changed base chemistry. Neither compound has a measured inhibition result in the records shown here.",
          "sourceIds": [
            "dhfr-rationale",
            "dhfr-preparation"
          ]
        }
      ],
      "priorWork": [
        {
          "title": "An established enzyme target",
          "text": "DHFR inhibition is used in established therapy, including methotrexate. Affinity, enzyme inhibition, uptake, selectivity and cellular response still need to be measured for the GS and isog compounds.",
          "sources": [
            {
              "id": "methotrexate-label",
              "title": "Methotrexate · official drug labeling",
              "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a",
              "access": "Public"
            }
          ]
        },
        {
          "title": "Peptide inhibitor precedent",
          "text": "A different experimentally studied peptide inhibitor motivates testing another peptide-based architecture at DHFR. That study did not test the GS or isog compounds modeled here.",
          "sources": [
            {
              "id": "dhfr-peptide-precedent",
              "title": "Different peptide-based DHFR inhibitor research",
              "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5816602/",
              "access": "Public"
            }
          ]
        }
      ],
      "steps": [
        {
          "id": "candidate-design",
          "number": 1,
          "title": "Choose the chemical comparison",
          "text": "Both models retain L-Phe-L-Glu while guanosine changes to isoguanosine. The base chemistry is the variable in this comparison.",
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "reference-preparation",
          "number": 2,
          "title": "Prepare the enzyme and NADPH",
          "text": "Start from 4M6K chain A. Remove deposited folic acid, oxidized NADP⁺, glycerol and waters; add the modeled reduced NADPH used in the preparation.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            },
            {
              "id": "4m6k",
              "title": "RCSB PDB · 4M6K",
              "url": "https://www.rcsb.org/structure/4M6K",
              "access": "Public"
            }
          ]
        },
        {
          "id": "five-models",
          "number": 3,
          "title": "Prepare five matched models",
          "text": "The preparation record contains two free-molecule models, a DHFR + NADPH control and two complete complexes. Both complexes are interactive here.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "pose-checks",
          "number": 4,
          "title": "Review atoms, parameters and clashes",
          "text": "Atom matching and parameter coverage passed preparation checks. Unresolved overlaps, protonation and force-field choices need review before simulation.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "future-simulation",
          "number": 5,
          "title": "Relax and validate before dynamics",
          "text": "The current 4M6K handoff still needs geometry and parameter review, water and ions, energy/force validation, minimization and equilibration before production dynamics. Earlier 1U72 technical pilots are separate historical work.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "laboratory-tests",
          "number": 6,
          "title": "Measure inhibition, then cell response",
          "text": "The Smith-Carpenter Lab will prepare and characterize faculty-selected compounds. Dr. Phelan’s lab will carry out the agreed DHFR inhibition and cell experiments once suitable material is available.",
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "access": "Existing document permissions retained"
            }
          ]
        }
      ],
      "fiveModels": [
        {
          "id": "free-gs",
          "title": "Free GS-Phe-Glu",
          "interactive": false,
          "detail": "Documented in the preparation report; no interactive file is supplied here."
        },
        {
          "id": "free-isog",
          "title": "Free isog-Phe-Glu",
          "interactive": false,
          "detail": "Documented in the preparation report; no interactive file is supplied here."
        },
        {
          "id": "dhfr-nadph",
          "title": "DHFR + NADPH control",
          "interactive": false,
          "detail": "Documented in the preparation report; no interactive file is supplied here."
        },
        {
          "id": "dhfr-gs",
          "title": "DHFR + NADPH + GS model",
          "interactive": true,
          "detail": "Available as a complete interactive complex."
        },
        {
          "id": "dhfr-isog",
          "title": "DHFR + NADPH + isog model",
          "interactive": true,
          "detail": "Available as a complete interactive complex."
        }
      ],
      "chemistry": {
        "title": "The normal DHFR reaction",
        "reaction": "DHF + NADPH + H⁺ → THF + NADP⁺",
        "steps": [
          "DHFR binds dihydrofolate (DHF) and the reducing cofactor NADPH.",
          "NADPH supplies reducing power as DHF becomes tetrahydrofolate (THF).",
          "Reduced folates support the chemistry needed to build nucleotides.",
          "An inhibition assay measures whether adding a synthesized compound reduces DHFR activity."
        ],
        "caption": "NADPH transfers reducing power as DHFR converts DHF to THF. An inhibition assay will test whether either synthesized nucleopeptide reduces that activity.",
        "controls": [
          "Enzyme-only activity",
          "Matched vehicle",
          "Established inhibitor",
          "Compound signal and interference blanks"
        ],
        "sources": [
          {
            "id": "dhfr-reaction",
            "title": "DHFR reaction and dynamics primary research",
            "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3823643/",
            "access": "Public"
          },
          {
            "id": "dhfr-preparation",
            "title": "DHFR five-model preparation report",
            "access": "Existing document permissions retained"
          }
        ]
      },
      "applications": [
        {
          "title": "What would make the GS and isog chemistry useful?",
          "text": "The models compare two versions of the same molecular framework. The application is to guide the synthesis and testing of compounds that may inhibit DHFR, an established cancer-drug target."
        },
        {
          "title": "What this design changes",
          "text": "GS-Phe-Glu and isog-Phe-Glu retain the same peptide while exchanging the base’s 2-amino/6-oxo and 2-oxo/6-amino groups. This matched comparison asks whether a different arrangement of hydrogen-bond donors and acceptors changes pocket compatibility and measured inhibition."
        }
      ],
      "testQuestions": [
        {
          "test": "Enzyme inhibition",
          "question": "Does the synthesized compound reduce DHFR activity under controlled assay conditions?"
        },
        {
          "test": "Assay interference",
          "question": "Does the compound alter the optical signal independently of enzyme inhibition?"
        },
        {
          "test": "Cellular uptake",
          "question": "Does the compound enter the relevant cells?"
        },
        {
          "test": "Cell response and selectivity",
          "question": "What happens to cells, and can the response be linked to the target rather than general toxicity?"
        }
      ],
      "experiments": [
        {
          "id": "dhfr-inhibition-comparison",
          "title": "DHFR activity comparison",
          "context": "Next laboratory experiment",
          "summary": "Test whether either synthesized compound reduces DHFR activity, with matched controls and an interference check.",
          "construct": "GS-Phe-Glu and isog-Phe-Glu; each compared with enzyme-only, vehicle and an established inhibitor.",
          "sequence": "Guanosine-L-Phe-L-Glu / isoguanosine-L-Phe-L-Glu",
          "fields": [],
          "procedure": [
            "Confirm identity and purity of the GS and isog compounds before setting matched assay conditions.",
            "Measure DHFR activity and check whether compound absorbance or other interference changes the signal."
          ],
          "characterization": "The linked preparation record contains no inhibition curve, affinity measurement or cellular response for these compounds.",
          "interpretation": "An enzyme result would answer inhibition under those conditions. It would not by itself establish cellular uptake or a cancer-treatment effect.",
          "next": "If enzyme inhibition is reproducible, plan uptake, cellular response and selectivity studies.",
          "sourceNote": "The measurements belong to the next experiment. No completed assay values are recorded here.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "access": "Existing document permissions retained"
            },
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "access": "Existing document permissions retained"
            }
          ],
          "notebookUrl": null
        }
      ],
      "sources": [
        {
          "id": "dhfr-preparation",
          "title": "DHFR five-model preparation report",
          "access": "Existing document permissions retained"
        },
        {
          "id": "dhfr-rationale",
          "title": "DHFR design rationale",
          "access": "Existing document permissions retained"
        },
        {
          "id": "4m6k",
          "title": "RCSB PDB · 4M6K",
          "url": "https://www.rcsb.org/structure/4M6K",
          "access": "Public"
        },
        {
          "id": "dhfr-reaction",
          "title": "DHFR reaction and dynamics primary research",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3823643/",
          "access": "Public"
        },
        {
          "id": "dhfr-peptide-precedent",
          "title": "Different peptide-based DHFR inhibitor research",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5816602/",
          "access": "Public"
        },
        {
          "id": "methotrexate-label",
          "title": "Methotrexate · official drug labeling",
          "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a",
          "access": "Public"
        },
        {
          "id": "dhfr-application-evidence-1",
          "title": "What a drug comparison has to consider",
          "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3784351/"
        }
      ],
      "sourceNote": "Project documents retain their existing permissions and may require the lab account.",
      "summary": "DHFR (dihydrofolate reductase) helps supply reduced folates for DNA synthesis. It is a target of the cancer drug methotrexate. These models compare guanosine (GS) and isoguanosine (isog), each linked to Phe-Glu, at the enzyme’s folate pocket.",
      "nextExperiment": "Review the unresolved contacts and chemical-state choices in the five-model preparation. After suitable compounds are synthesized and characterized, Dr. Phelan’s lab can test DHFR inhibition and cellular effects with the agreed controls.",
      "roles": {
        "computational": "Alexander Wong: molecular modeling and analysis",
        "chemistry": "Smith-Carpenter Lab: synthesis and purification of selected compounds",
        "biology": "Dr. Phelan’s lab: agreed DHFR inhibition and cell experiments",
        "structuralReview": "Dr. Macwan: structural review and simulation setup"
      }
    }
  }
};
