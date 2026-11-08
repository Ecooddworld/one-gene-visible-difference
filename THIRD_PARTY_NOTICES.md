# Provenance and third-party notices

## Current publication status — 8 November 2026

The project is publicly available as the **[R35 navigation release, 6 November 2026](https://github.com/Ecooddworld/one-gene-visible-difference/releases/tag/r35-navigation-20261106)**, and the Devpost entry was verified as SUBMITTED (5/5) on 8 November. [SUBMISSION_VERSION.md](SUBMISSION_VERSION.md) identifies the exact archive and video. Documentation changes do not replace the native archive.

The original notices below were prepared from 25 October onward and retain the history of earlier prototypes. Their dated “private”, “pending” and “owner approval” wording records those earlier checkpoints, not the current publication status. Public availability does not relicense third-party assets or establish a blanket open-source license. Component notices and applicable vendor terms continue to govern reuse. Paths under `science/`, `runtime/` and `devpost/licenses/` refer to the complete project archive unless they are present in this review tree.

The submitted YouTube video later received **Spirit of Fire — Jesse Gallagher** from the YouTube Audio Library. That track was added in YouTube Studio and is not an audio asset in the Lens source archive. The procedural audio described below belongs to earlier project assets.

### Historical preparation note — 25 October 2026

This source package was prepared privately at that checkpoint; no public rights grant or submission was implied by the original notice.

Microscopy and R23 provenance amended 2026-10-27 from the project manifests below. Earlier oak-specific descriptions retain their historical scope; they do not exclude the subsequently added Arabidopsis reference images.

## Active R35 lesson — 4 November 2026

R35 displays sequence-specific GL1 duplexes constructed with wDSSR. The microscope panels retain the credits identified below. The epidermal relief uses the SurfCut PI-stained cotyledon measurements of Erguvan & Verger (CC BY 4.0). The internal compartments are anatomically illustrated. The enlarged nucleus uses an independent DAPI stack from Gaudin & Andrey. The envelope uses representative pores from EMDB EMD-54657 at modeled positions. The ribosome uses PDB 9H3G. The reference GL1 domain uses AlphaFold DB P27900. Amino-acid geometry comes from the wwPDB Chemical Component Dictionary. The source identifiers, licenses and transformations are in the repository's `science/arabidopsis-imaging-r35/SOURCES.md` and `devpost/SCIENCE.md`.

The historical notices below retain provenance for prior prototypes and shared assets.

## Arabidopsis update — 26 October 2026

The 26 October prototype reused the original Genesis 1BNA v1.3 coordinate dataset. PDB archive data are CC0; cite Drew et al. (1981), doi:10.1073/pnas.78.4.2179, and RCSB PDB 1BNA. 1BNA is a molecular teaching example, not GL1 or Arabidopsis DNA. GL1 and chromosome annotations are from NCBI TAIR10. The paired leaves use generated artwork as texture and newly constructed geometry; they are not specimen scans. See the bundled SOURCES_AND_LIMITS.md for source coordinates, hashes, morphology caveats and reuse disclosure. The browser renderer uses Three.js r160 under MIT, with its notice preserved.

## Newly authored work

The original TypeScript learning logic, native integration source, assembly contract and generated botanical geometry were authored for Two Oaks, One Barcode. The original oak geometry generator did not use third-party visual artwork as input. Later Arabidopsis work uses published scientific references and the credited microscopy below; its authored reconstruction is not a scan of those specimens. Source code and original-asset licensing for a public release remains the owner's decision.

## Pre-existing data and ideas

The two small rbcL windows and metadata derive from the EcoGenesis EvidenceAtlas `ncbi_quercus_rbcl_small` workflow-validation pack dated 2026-06-04. The general separation of source, transformation, rule result and claim boundary is disclosed as prior EvidenceAtlas work. The full old application, reports and compiler are not bundled.

- PQ178973.1 — source metadata: Quercus robur, voucher KS23 HER0280. https://www.ncbi.nlm.nih.gov/nuccore/PQ178973.1
- OM935572.1 — source metadata: Quercus petraea, voucher FGB14. https://www.ncbi.nlm.nih.gov/nuccore/OM935572.1
- Current records were read on 2026-10-25 via NCBI E-utilities. Their full lengths are 560 and 582 bp respectively. Each bundled 560-nt window was matched uniquely against both orientations: PQ178973.1 positions 1–560 (+), OM935572.1 positions 10–569 (+), 1-based inclusive. These coordinates were verified against the new source snapshot; they were absent in the inherited manifest.
- `devpost/data/annotation-snapshot.json` pins selected scientific annotations and source sequences with hashes and a fetch timestamp. Accession.version alone does not pin all annotations. The full raw response hash is a fetch receipt, not a hash reproducible from the reduced snapshot; raw author/contact data were not retained.

NCBI places no additional restrictions of its own on the use or distribution of molecular data, but cannot transfer or guarantee all submitter rights. Retain accession, source, transformation and access dates, and finish any applicable original-source rights check before public release. NCBI disclaims warranty as to accuracy and usefulness. https://www.ncbi.nlm.nih.gov/home/about/policies/

## Official planning template

`devpost/design-brief.md` adapts the Devpost plan-lens design brief template. The official Build notes and After the build guidance are retained. The corresponding MIT notice is in `devpost/licenses/devpost-MIT.txt`. Source: https://github.com/challengepost/learn-specs . The implemented brief and honest workflow receipt are included in devpost/. No full learner interview is claimed.

## Snap tools and packages

The official CLAD repository documentation was consulted under its Apache-2.0 license. The native project contains official SIK, UIKit, LEAF, preview-agent packages and a Bitmoji 3D dependency descriptor. They retain their vendor terms and are not relicensed as original project work. Lens Studio itself is not bundled. The user explicitly authorized acceptance of the named Lens Studio/Snap terms for installation. No broader third-party rights grant is implied. Public redistribution review remains part of final owner approval. https://github.com/lens-studio-devs/ls-extensions

## Excluded material

PlantCellChat/PlantPhoneDB resources, unpublished sample IDs, API keys and private reports are excluded. The former blanket exclusion of micrographs/third-party photographs applied to the initial oak prototype and is superseded for the explicitly credited Arabidopsis SEM crops below. Publicly visible accession/voucher metadata above are source identifiers, not a claim that the illustrated leaf is the corresponding sample.

NCBI accession-version semantics were checked on 2026-10-25: https://support.nlm.nih.gov/knowledgebase/article/KA-03434/en-us . Sequence-version suffixes can remain unchanged when other record information changes. The selected annotation snapshot is therefore pinned separately.

## Font
Inter is included for native text rendering. Retain the accompanying SIL Open Font License in devpost/licenses; the original font is not relicensed.

## Cinematic laboratory and original audio — 26 October 2026

The current 3D room reuses geometry from the owner's pre-existing GENESIS laboratory composition. A separate derivative adds lighting, transparent window surfaces and procedural garden geometry; the original project was not modified. The packaged PROVENANCE_BAKED.json and PROVENANCE_GARDEN.json record the transformations. This is a reuse disclosure, not a new public licence. The earlier image-background scene is retained as history; its generated decorative garden image is not used as the active spatial backdrop or as scientific evidence.

BotanicalCinema.wav, ScaleTransition.wav and ObservationClick.wav are deterministic procedural synthesis produced for this episode with the local CLAD music/SFX engines. No external recording or artist track was sampled. Stable generation source and hashes accompany the private source bundle.

## Published microscopy included in Arabidopsis — amendment 27 October 2026

Project manifest: `science/microscopy-r7/microscopy-r7.json`, checked 2026-10-26; accompanying `captions-en.txt` and source/crop SHA256 receipts are authoritative for these unchanged files. This amendment does not claim a new web verification.

- **Mark J. Talbot and Rosemary G. White (2013)**, “Cell surface and cell outline imaging in plant tissues using the backscattered electron detector in a variable pressure scanning electron microscope,” Fig. 1 A/B, DOI [10.1186/1746-4811-9-40](https://doi.org/10.1186/1746-4811-9-40), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). [Original publication/figure](https://pmc.ncbi.nlm.nih.gov/articles/PMC3853341/figure/F1/).
- **Bangxia Suo, Stephanie Seifert and Viktor Kirik (2013)**, “Arabidopsis GLASSY HAIR genes promote trichome papillae development,” Fig. 2 A/A′, DOI [10.1093/jxb/ert287](https://doi.org/10.1093/jxb/ert287), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). [Original publication/figure](https://pmc.ncbi.nlm.nih.gov/articles/PMC3830481/figure/F2/). Display crops contain wild type only; GLH mutant panels are excluded.

The following files are under `science/microscopy-r7/crops/`. Boxes are source-pixel `[left, top, right, bottom]`, with right/bottom exclusive.

| Crop file | Source panel | Crop box | Original bar |
|---|---|---|---|
| `talbot2013-fig1-a-leaf.png` | Fig. 1 A | `[0,0,380,392]` | 200 µm |
| `talbot2013-fig1-b-epidermis.png` | Fig. 1 B | `[388,0,960,392]` | 20 µm |
| `suo2013-fig2-a-wt-trichome.png` | Fig. 2 A | `[26,0,875,741]` | 200 µm |
| `suo2013-fig2-aprime-wt-papillae.png` | Fig. 2 A′ | `[889,0,1341,741]` | 20 µm |

Paired crops are `talbot2013-fig1-ab-leaf-epidermis.png` (`[0,0,960,392]`) and `suo2013-fig2-aa-prime-wt.png` (`[26,0,1341,741]`). Their `-captioned.png` derivatives append a 126-pixel credit band below the crop; no text or marks are added inside the micrograph. The preparation manifest records exact decoded-source pixel equality for all six crops and unchanged original regions in the captioned cards. Labels and original white scale bars are retained; numerical bar lengths come from the publication captions. No recolouring, sharpening, contrast adjustment or retouching was performed. Display with the original aspect ratio; do not crop away labels or bars. Full figures/XML in `originals/` retain other panels for provenance, not for display as WT evidence.

These are grayscale SEM observations, not natural-colour images, live recordings or volumetric scans. A/A′ are not asserted to show the identical cell/branch. They support external comparison, not the internal cell cutaway. Keep the credits, licence links and crop disclosure with redistributed derivatives.

## R23 authored tissue and keyboard labels — prepared 27 October 2026

`tooling/prepare_shared_epidermis_r23.py` adapts the project's earlier authored cellular field into shared leaf-UV pavement boundaries and subtle normal/roughness variation. Its graphs in `r23-shared-epidermis-shaders1` are authored reconstruction, not segmented microscopy, measured cell density/relief or SEM-derived natural colour. Existing C2/A4 maps are preserved. `SOURCE_RECEIPT.json` records source/output hashes; native R23 integration and visual acceptance remain pending.

`tooling/lab_r23_keycaps.py` rasterizes authored keyboard labels using the build machine's system Arial (`/System/Library/Fonts/Supplemental/Arial.ttf`); arrow marks are authored vector strokes. The font file is not bundled or copied into the Lens. Only the resulting 512×512 raster atlas is embedded: `visual-direction/r23-pc-keycaps1/R23_KeyboardPrint_512.png`, SHA256 `89e187830e7a8c21112ef23cd314755a05fd9dc0d77cdb99ffc21835fd739ec4`. `R23_PC_CONTRACT.json` records font SHA256 `525979822591a3447cfc49d943d6f7683508e25543407871c0ed8fed05fd2bd9` and the generated GLB provenance. This is authored label artwork, not a photograph or scan; font software ownership/licensing is unchanged. No new public release rights or completed native integration are asserted here.
