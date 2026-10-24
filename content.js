/* Verified content for this independent project. Source records are unchanged. */
window.RESEARCH_CONTENT = {
  "version": "2026-10-24-independent-3",
  "navigation": [
    "Overview",
    "Molecules",
    "Laboratory Work",
    "Modeling & Results",
    "Chemistry",
    "Applications",
    "Sources"
  ],
  "sources": {
    "dhfr-preparation": {
      "id": "dhfr-preparation",
      "title": "DHFR five-model preparation report",
      "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
      "access": "Existing document permissions retained"
    },
    "dhfr-rationale": {
      "id": "dhfr-rationale",
      "title": "DHFR design rationale",
      "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
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
      "title": "Design and Evaluation of Nucleopeptide Models Targeting Human Dihydrofolate Reductase",
      "credit": "Alexander Wong",
      "lab": "Smith-Carpenter Lab",
      "institution": "Fairfield University",
      "collaboration": "DHFR collaboration with Phelan Lab",
      "question": "How does changing the base from guanosine to isoguanosine alter the modeled fit at human DHFR? The next experiment asks whether either synthesized compound inhibits the enzyme.",
      "overview": "DHFR uses NADPH to convert dihydrofolate to tetrahydrofolate, helping supply reduced folates for nucleotide synthesis. The models compare guanosine–Phe–Glu and isoguanosine–Phe–Glu near its folate pocket. The first task is to repair and validate the starting poses; inhibition must then be measured.",
      "next": "Characterize the synthesized GS and isog compounds, then compare DHFR activity with matched controls and an interference check.",
      "nextDetail": "Model clashes, protonation and force-field choices need review before dynamics. Enzyme inhibition, cell entry and cell response answer separate questions.",
      "relevance": "Methotrexate inhibits folate metabolism, including DHFR. These models explore a different molecular framework; enzyme and cell experiments must establish whether the corresponding compounds have useful activity.",
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
          "text": "The protein derives from chain A of the experimental 4M6K structure. DHFR regenerates reduced folate used in nucleotide production.",
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
          "text": "Both models contain the same L-Phe–L-Glu peptide. Exchanging guanosine for isoguanosine changes the base’s hydrogen-bond donors and acceptors.",
          "sourceIds": [
            "dhfr-rationale"
          ],
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "nadph",
          "label": "NADPH",
          "text": "The prepared models contain modeled reduced NADPH. Deposited 4M6K instead contains oxidized NADP⁺ and folic acid, removed during preparation.",
          "sourceIds": [
            "dhfr-preparation",
            "4m6k"
          ],
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
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
          "text": "The model lies near the folate pocket in an unrelaxed pose with unresolved overlaps. Nearby atoms show geometry to inspect, not established binding contacts.",
          "sourceIds": [
            "dhfr-preparation"
          ],
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
              "access": "Existing document permissions retained"
            }
          ]
        }
      ],
      "sequences": [
        {
          "id": "gs",
          "label": "GS–Phe–Glu",
          "sequence": "Guanosine–L-Phe–L-Glu",
          "interactive": true,
          "caption": "Complete 66-atom GS model in its prepared complex. The base, ribose, 5′ carbonyl linker and L-Phe–L-Glu peptide remain connected.",
          "sourceIds": [
            "dhfr-rationale",
            "dhfr-preparation"
          ]
        },
        {
          "id": "isog",
          "label": "isog–Phe–Glu",
          "sequence": "Isoguanosine–L-Phe–L-Glu",
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
          "text": "Both models retain L-Phe–L-Glu while guanosine changes to isoguanosine. The base chemistry is the variable in this comparison.",
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
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
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
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
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
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
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "future-simulation",
          "number": 5,
          "title": "Relax and validate before dynamics",
          "text": "The work ahead includes solvent and ions, numerical validation, minimization, equilibration and independent trajectories. No production trajectory is represented for these models.",
          "sources": [
            {
              "id": "dhfr-preparation",
              "title": "DHFR five-model preparation report",
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
              "access": "Existing document permissions retained"
            }
          ]
        },
        {
          "id": "laboratory-tests",
          "number": 6,
          "title": "Measure inhibition, then cell response",
          "text": "Prepare characterized material and test DHFR activity with interference controls. Uptake and cellular response are later, separate experiments.",
          "sources": [
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
              "access": "Existing document permissions retained"
            }
          ]
        }
      ],
      "fiveModels": [
        {
          "id": "free-gs",
          "title": "Free GS–Phe–Glu",
          "interactive": false,
          "detail": "Documented in the preparation report; no interactive file is supplied here."
        },
        {
          "id": "free-isog",
          "title": "Free isog–Phe–Glu",
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
        "title": "DHFR’s normal reaction",
        "reaction": "DHF + NADPH + H⁺ → THF + NADP⁺",
        "steps": [
          "DHFR binds dihydrofolate (DHF) and the reducing cofactor NADPH.",
          "NADPH supplies reducing power as DHF becomes tetrahydrofolate (THF).",
          "Reduced folates support the chemistry needed to build nucleotides.",
          "An inhibition assay measures whether adding a synthesized compound reduces DHFR activity."
        ],
        "caption": "NADPH supplies reducing power as DHFR converts dihydrofolate to tetrahydrofolate. No enzyme rate has been measured here for the GS or isog compounds.",
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
            "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
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
          "text": "GS–Phe–Glu and isog–Phe–Glu retain the same peptide while exchanging the base’s 2-amino/6-oxo and 2-oxo/6-amino groups. This matched comparison asks whether a different arrangement of hydrogen-bond donors and acceptors changes pocket compatibility and measured inhibition."
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
          "construct": "GS–Phe–Glu and isog–Phe–Glu; each compared with enzyme-only, vehicle and an established inhibitor.",
          "sequence": "Guanosine–L-Phe–L-Glu / isoguanosine–L-Phe–L-Glu",
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
              "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
              "access": "Existing document permissions retained"
            },
            {
              "id": "dhfr-rationale",
              "title": "DHFR design rationale",
              "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
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
          "url": "https://docs.google.com/document/d/1VlzmDSzttrKBMjlVvny58u0wnc7Cq3ePj_4xyaCBMZQ/edit",
          "access": "Existing document permissions retained"
        },
        {
          "id": "dhfr-rationale",
          "title": "DHFR design rationale",
          "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit",
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
      "sourceNote": "Project documents retain their existing permissions and may require the lab account."
    }
  }
};
