# R32 source interpretation — 31 October 2026

The active cell entry uses a split of the retained R23 exterior; front/back surface area and original vertex coordinates were checked. Internal compartments remain authored schematic geometry. The enlarged nucleus includes illustrative chromatin and a nucleolus; their paths/counts, shape and colours are not measured trichome nuclear organization. Schubert et al. (2012), https://pubmed.ncbi.nlm.nih.gov/22476443/ , informs the explicit caution about endopolyploid nuclear organization. The chromosome map represents types, not this cell's copy count. The GL1 reference/variant projection and independent 1BNA coordinates are unchanged. Historical notes below retain their dated scope.

# Scientific sources and reuse

Checked 26 October 2026. Source payloads are local and versioned; the experience needs no scientific API request during playback.

## Genome and gene

NCBI RefSeq TAIR10 assembly GCF_000001735.4, Columbia reference. Five **nuclear** chromosomes; plastid and mitochondrial genomes are outside the displayed overview.

| Chromosome | Version | Length (bp) |
|---|---|---:|
| 1 | NC_003070.9 | 30,427,671 |
| 2 | NC_003071.7 | 19,698,289 |
| 3 | NC_003074.8 | 23,459,830 |
| 4 | NC_003075.7 | 18,585,056 |
| 5 | NC_003076.8 | 26,975,502 |

The chromosome rods are a length diagram, not measured chromosome shapes or chromatin conformation. The GL1 marker is enlarged for visibility.

GL1 is MYB0 / AT3G27920, GeneID 822415. Genomic interval NC_003074.8:10,361,790–10,363,607 on the minus strand. The full gene-oriented sequence is 1,818 bp. Transcript NM_113708.2; protein NP_189430.1. Gene-oriented exon intervals are 1–240, 350–479 and 1246–1818. CDS intervals are 102–240, 350–479 and 1246–1663. The genomic segment includes introns and untranslated regions; it is not all coding sequence.

Source: https://www.ncbi.nlm.nih.gov/gene/822415 and the NCBI E-utilities RefSeq download stored as `GL1-reference.genbank.txt`. `GL1.json` contains the sequence and feature coordinates. The sequence was checked against the previously retrieved FASTA. `TAIR10-chromosomes.ncbi.json` preserves the chromosome metadata response.

## Phenotype and causal claim

- Herman PL, Marks MD (1989). Trichome development in Arabidopsis thaliana. II. Isolation and complementation of the GLABROUS1 gene. https://doi.org/10.1105/tpc.1.11.1051 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC159842/
- Oppenheimer DG et al. (1991). A myb gene required for leaf trichome differentiation in Arabidopsis is expressed in stipules. https://doi.org/10.1016/0092-8674(91)90523-2 ; https://pubmed.ncbi.nlm.nih.gov/1934056/
- Lu L et al. (2005). An internal motor kinesin is associated with the Golgi apparatus and plays a role in trichome morphogenesis in Arabidopsis. Figures 4–5 inform the one-cell/two-branch-point geometry. https://doi.org/10.1091/mbc.e04-05-0400 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC545913/

The current spatial demonstration uses the published gl1-S92F example on early leaves. Its mutation window is projected onto the bundled Columbia reference, not sequenced from a new specimen. The complementation exercise remains conceptual; it assigns no experimental sample, growth rate or quantitative trichome density. Do not substitute gl1-43 as the glabrous-leaf allele: its reported phenotype concerns stem trichomes while leaf trichomes remain. Different alleles can retain marginal hairs. We refer to the **blade**, not a universal claim that every hair on every organ is absent.

GL1 is a transcriptional regulator within a developmental network. It is not a complete physical blueprint for a hair. Restoration provides evidence of a role; it does not prove GL1 acts alone. A separate new leaf grows in the experience; existing mature leaves do not instantly acquire trichomes.

## Experimental DNA from Genesis

RCSB PDB 1BNA v1.3, X-ray diffraction, 1.90 Å. Two complementary 12-nucleotide chains, sequence CGCGAATTCGCG. The source has 566 atoms: 486 polymer atoms and 80 solvent oxygen atoms. The visualization omits solvent. There are no deposited hydrogen atom coordinates. Dashed connectors represent 32 source hydrogen-bond relationships, not hydrogen atoms. The 544 covalent connections come from the existing CCD-backed dataset.

Source entry: https://www.rcsb.org/structure/1BNA ; DOI https://doi.org/10.2210/pdb1bna/pdb

Drew HR, Wing RM, Takano T, Broka C, Tanaka S, Itakura K, Dickerson RE (1981). Structure of a B-DNA dodecamer: conformation and dynamics. PNAS 78:2179–2183. https://doi.org/10.1073/pnas.78.4.2179

This DNA is **not Arabidopsis GL1**. It demonstrates an experimentally determined molecular structure. Atom radii, bond thickness, element colours and model magnification are display conventions. Original coordinates remain in Å. The new GLB maps source (x,y,z) to (x,z,-y), a rotation with determinant +1, preserving handedness. It does not copy the Unity display-axis convention as if both engines had identical coordinates.

Pre-existing work disclosed: the immutable 1BNA JSON, mmCIF and provenance manifest were recovered from the user's EcoGenesis Unity scientific assets. JSON SHA-256 verified: `e5aedf125a8449541e628e74f5c6433d7baec4aa950f059e694fb96fb9dee878`. New GLB meshes, native interaction and scene implementation were authored for this iteration. The prior Unity application was not imported.

PDB archive data use CC0 1.0: https://www.rcsb.org/pages/policies . Original structure authors are credited above. Leaf colour artwork is AI-assisted authored illustration, not a specimen photograph or measured reflectance. Inter and Snap package licences remain with their files.

## Published microscopy included in the experience

- Mark J. Talbot and Rosemary G. White (2013), *Cell surface and cell outline imaging in plant tissues using the backscattered electron detector in a variable pressure scanning electron microscope*, Figure 1 A/B. DOI https://doi.org/10.1186/1746-4811-9-40 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC3853341/figure/F1/ . CC BY 2.0, https://creativecommons.org/licenses/by/2.0/ . Cropped panels retain original letters and scale bars (200 µm / 20 µm). BSE in VP-SEM, fixed and critical-point-dried mature rosette leaf, uncoated, 20 kV and 10 Pa.
- Bangxia Suo, Stephanie Seifert and Viktor Kirik (2013), *Arabidopsis GLASSY HAIR genes promote trichome papillae development*, Figure 2, WT Col-0 panels A/A′. DOI https://doi.org/10.1093/jxb/ert287 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC3830481/figure/F2/ . CC BY 3.0, https://creativecommons.org/licenses/by/3.0/ . Cropped panels retain original letters and scale bars (200 µm / 20 µm). SEM of fully expanded leaves of three-week-old plants, 0.98 torr, 12.5 kV, cooled to 2 °C.

These are independent published observations, not photographs of the virtual selected site, not the GL1-S92F experiment and not evidence for internal compartments. Monochrome SEM does not determine natural colour or optical properties. Crops preserve the original scientific pixels; English attribution strips, where present, were added outside the image. Original payloads, crop rectangles, hashes, licences and methods are retained in science/microscopy-r7/microscopy-r7.json. Licence and image records were verified against the saved primary-source XML on 26 October 2026; attribution reconciliation on 28 October 2026.

## Concrete variant in the spatial version — checked 26 October 2026

gl1-S92F: exon 3 C→T, changing Ser92 to Phe. The bundled reference yields TCT→TTT at CDS position 275 (gene-oriented position 1251). Projection onto NC_003074.8 gives position 10,362,357 G→A on the plus strand; this coordinate is calculated from the reference, not independently reported by a sequenced mutant sample. `GL1-S92F.json` records this distinction.

Dai et al. (2016), first published 15 December 2015, https://doi.org/10.1111/pce.12695 . The study reports impaired GL2 reporter activation while interaction with GL3/EGL3 remains detectable. Possible altered promoter binding is a hypothesis, not an observed protein-DNA structure. Early leaves are glabrous; later marginal hairs can occur. The separate 1BNA model remains an atomic DNA example, not the mutation site.

## Current reconstruction and asset limits

The selected leaf site and exterior macro share the retained R23 contact. Other small hairs retain an earlier level of detail; complete geometric identity of all 45 instances is not claimed. Whole-leaf hairs remain subtle; the linked enlargement and independent microscopy carry the morphological comparison. Leaf/trichome photorealism is not established.

The R32 cutaway starts with the split retained exterior. Wall, thin peripheral cytoplasm, vacuole and nucleus are authored schematic compartments. Internal geometry is not a measured anatomical segmentation; surrounding epidermis is omitted. Gutiérrez-Alcalá et al. (2000), https://doi.org/10.1073/pnas.190334497 , informs compartment interpretation. Chromosome rods represent types, not literal chromosome copy counts in an endoreduplicated trichome; see Churchman et al. (2006), https://pmc.ncbi.nlm.nih.gov/articles/PMC1693949/ .

The upper-leaf pigmentation uses the retained R19 AI-assisted authored albedo, generated from an earlier procedural UV atlas: Leaf_adaxial_R19_quiet_veins.png, 1254 × 1254 pixels. It is not measured reflectance, a specimen photograph, cellular anatomy, genotype evidence or a calibrated PBR scan. Scientific photographs were inspected separately and were not copied into the generated texture. Geometry, normal and roughness maps are separate. Minor-vein identity is not established. The pipeline's historical trial records remain in the owner's workspace; this source package contains the actual runtime assets and their notices.

Preview verification is separate from device validation. No physical SPECS test, device performance benchmark or learning-outcome study has been performed. The restoration exercise is conceptual, not a newly performed complementation experiment.
