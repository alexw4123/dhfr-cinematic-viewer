/* Source-linked project content. Molecular files and notebook permissions are unchanged. */
window.RESEARCH_APPLICATIONS = {
  "version": "2026-10-24-source-audit-v5",
  "dhfr": {
    "title": "DHFR inhibition and cancer research",
    "intro": "The immediate task is to connect the changed base chemistry to an enzyme result. Compare characterized GS and isog compounds under the same DHFR assay conditions, using methotrexate as an established reference.",
    "existing": {
      "title": "Why target DHFR?",
      "text": "Cells use reduced folates to make DNA building blocks. Methotrexate inhibits folate metabolism, including DHFR. That makes the enzyme relevant to cancer research, while uptake and cellular response remain separate experimental questions.",
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
          "title": "Design rationale"
        }
      ]
    },
    "use": {
      "title": "Choose the next compound to test",
      "text": "Measure concentration-response curves for the characterized GS and isog compounds using the same enzyme, substrate and NADPH conditions. Interference controls check whether a compound changes the optical readout rather than enzyme activity."
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
        "title": "Enzyme activity and cell response",
        "text": "A different peptide-DHFR study reported both enzyme inhibition and cell tests. These answer different questions: an effect on a purified enzyme does not establish the response in a cell.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5816602/"
      },
      {
        "title": "Transport and intracellular metabolism",
        "text": "Primary work comparing pralatrexate with methotrexate examined transport and intracellular metabolism. Such factors help explain why a target-binding picture is only one part of therapeutic performance.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3784351/"
      }
    ],
    "next": "Resolve the preparation flags, confirm compound identity and purity, and agree on the assay with Dr. Phelan. Measure inhibition before designing cellular follow-up.",
    "limits": "The current records contain prepared models and separate historical technical pilots, but no GS/isog inhibition curves or cell-response results."
  }
};
