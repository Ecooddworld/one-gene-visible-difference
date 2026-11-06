# One Letter, a Different Leaf

Explore a genetic experiment on the surface of an Arabidopsis leaf.

## Inspiration

A student can memorize “DNA → RNA → protein” and still have no way to tell whether a gene caused a visible change. Our starting point is something you can see. One early leaf bears branched hairs. Another has a smooth surface. The learner follows that difference through a specific gene and makes a prediction that the model can test.

## What it does

At a movable laboratory station, select a patch of leaf and inspect a single branched cell, a trichome. Compare its shape with credited electron microscopy from a separate specimen. An open cell follows the measured relief of an Arabidopsis epidermis. A leader locates the vacuole, then the nucleus pressed against it. A section through an independently imaged nucleus reveals where DNA is concentrated.

Switch the same 18-base-pair DNA fragment from letters to atoms. Inspect position five with the camera held still, first as C–G and then as T–A. On the coding strand, TCT becomes TTT. The corresponding messenger-RNA codon changes from UCU to UUU. The protein receives phenylalanine in place of serine at position 92.

GL1 regulates genes involved in trichome development. Predict the surface of the next leaf, add a functional copy of GL1 and compare it with the untreated variant. The new leaf develops trichomes. The original smooth leaf stays in view as the control.

## How we built it

The SPECS Lens runs in Lens Studio Preview. TypeScript connects the native specimens, published microscopy, cell illustration and atomic meshes to a common lesson state. SIK pinch interactions and UIKit controls let learners inspect the same position, compare outcomes and repeat an experiment. Short, backed English captions carry the lesson without narration. A ring shows which specimen or control the learner is pinching. The independent Explore route and the guided 170-second route share the same biological states.

The atomic fragment was built from the GL1 reference sequence using wDSSR. Both strands, the selected position and the covalent graph were checked before importing the models. The complete fragment, codon and individual pair share a consistent frame across variants. The annotation identifies the geometry as a structural model.

The nuclear exhibit retains 68 confocal sections of DNA fluorescence from an independent Arabidopsis nucleus. The translation exhibit uses the deposited Arabidopsis 80S structure (PDB 9H3G). The regulation exhibit shows a space-filling reference GL1 domain with Ser92 highlighted. The two developing surfaces share the same intact epidermis. A trichome grows on one while the control stays smooth.

## What a judge can try

Select a surface, advance to the GL1 fragment, switch to atoms and compare both variants. At the experiment, predict “No trichomes” and add the working copy. Check the new leaf against the untreated control, then use Try again for the other prediction. Use Chapters to revisit any of the nine sections; the selected DNA variant, prediction and result remain saved. The Evidence cards explain what was observed experimentally and what the lesson models.

## Sources and reuse

The microscopy panels retain their original labels, scale bars and credits. The room uses earlier GENESIS geometry. The project incorporates official Snap packages, Inter and earlier botanical and scientific visualization work. The project notices give sources, licenses and scope. The Devpost Learn planning materials informed the brief, and CLAD and Lens Studio MCP supported native build and verification. The project record states exactly which planning steps were completed.

Validation is in Lens Studio Preview. The source instructions document how to reproduce the walkthrough.

