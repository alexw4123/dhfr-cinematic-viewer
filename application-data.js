/* Application rationale for this independent project. No measured advantage is implied. */
window.RESEARCH_APPLICATIONS = {
  "version": "2026-10-24-independent-3",
  "dhfr": {
    "title": "DHFR inhibition and cancer research",
    "intro": "The models compare two versions of the same molecular framework. The application is to guide the synthesis and testing of compounds that may inhibit DHFR, an established cancer-drug target.",
    "existing": {
      "title": "Why target DHFR?",
      "text": "Cells use reduced folates to make DNA building blocks. Methotrexate inhibits folate metabolism, including DHFR, which connects this target to cancer treatment. A useful alternative still has to perform in cells; an enzyme result alone cannot answer that.",
      "sources": [
        {
          "title": "Methotrexate · official labeling",
          "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a63364d5-4dfa-49d7-8a5e-c8959ae1d37a"
        }
      ]
    },
    "design": {
      "title": "Change the base, keep the peptide",
      "text": "GS–Phe–Glu and isog–Phe–Glu retain the same peptide while exchanging the base’s 2-amino/6-oxo and 2-oxo/6-amino groups. This matched comparison asks whether a different arrangement of hydrogen-bond donors and acceptors changes pocket compatibility and measured inhibition.",
      "sources": [
        {
          "title": "Design rationale",
          "url": "https://docs.google.com/document/d/1Ku2IUfJpr4KlL4gqplIsU9QfFJeEdZtdWx4gVxZ0Dso/edit"
        }
      ]
    },
    "use": {
      "title": "Choose the next compound to test",
      "text": "Test the synthesized GS and isog compounds in the same human-DHFR activity assay. A reproducible difference would connect the exchanged base chemistry to enzyme inhibition and guide the next design. The unrelaxed models help frame this test; they do not establish drug efficacy."
    },
    "comparisons": [
      {
        "goal": "Stronger enzyme inhibition",
        "existing": "Methotrexate as an established reference; GS and isog as the matched pair.",
        "test": "Measure concentration-response curves with the same enzyme, substrate and NADPH conditions, plus vehicle and compound-interference controls.",
        "meaning": "A lower measured IC₅₀ under those matched conditions supports stronger inhibition in that assay. It does not establish a better therapy."
      },
      {
        "goal": "Useful activity in cells",
        "existing": "An enzyme can be inhibited even when a compound has little effect in cells.",
        "test": "Measure cellular exposure, cell response and evidence of DHFR involvement. Compare suitable nonmalignant cells as well as the chosen cancer model.",
        "meaning": "The result must connect target inhibition to cell activity, rather than general toxicity."
      },
      {
        "goal": "Activity in a resistant model",
        "existing": "Resistance is a specific biological mechanism, not something a different-looking structure automatically avoids.",
        "test": "Only after reproducible activity, compare a defined methotrexate-sensitive/resistant pair and establish why the resistant model differs.",
        "meaning": "An advantage would apply to that tested model and mechanism; it cannot be inferred from docking."
      }
    ],
    "evidence": [
      {
        "title": "Why enzyme and cell results are separate",
        "text": "A different peptide-DHFR study reported stronger effects in its enzyme assay than in cells. That precedent supports measuring both stages, rather than treating biochemical potency as a cellular result.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5816602/"
      },
      {
        "title": "What a drug comparison has to consider",
        "text": "Primary work comparing pralatrexate with methotrexate examined transport and intracellular metabolism. Such factors help explain why a target-binding picture is only one part of therapeutic performance.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3784351/"
      }
    ],
    "next": "Repair and validate the modeled poses. Confirm GS and isog compound identity and purity, then run matched human-DHFR inhibition and interference measurements. Follow an interpretable enzyme result with cellular studies.",
    "limits": "No GS/isog inhibition curve or cell-response result is available in the project records shown here. The present contribution is the molecular comparison and a defined experimental test."
  }
};
