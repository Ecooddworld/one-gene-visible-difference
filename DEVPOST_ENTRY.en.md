# One Gene, A Visible Difference

**Tagline:** Follow an Arabidopsis leaf hair from visible trait to GL1, inspect the evidence, and predict a new leaf.

## Inspiration
DNA is often taught apart from the organism it helps explain. We wanted to start with a difference a learner can notice: a leaf blade with branched hairs beside a smooth one. The question becomes why the difference exists and what evidence would support an explanation.

## What it does
This SPECS Lens is a movable spatial workbench for students and educators. Inspect a leaf, enlarge one trichome, compare it with credited microscopy, and open the same branched cell. Follow its nucleus into chromosome 3, GL1, the third exon and a coding-base change: TCT to TTT, Ser92 to Phe. Then inspect an independent experimental B-DNA structure and predict the phenotype of a new leaf after adding functional GL1. The unchanged mutant remains beside it as a control.

The six chapters are available directly from Menu. A 144-second guided presentation can be paused, explored and resumed from its saved point. The 3D laboratory is optional: turn it off to retain a compact station in your own space. Pinch/grab inspection, scale controls, source images and a movable station make the models objects to examine rather than pages to scroll.

## Why spatial
The specimen, its enlargement and the observation used to interpret it coexist around one station. During the nucleus enlargement, the original cell stays visible and connected to the selected location. During the prediction, the original mutant remains as a separate control. These spatial relationships are the design's purpose; camera recognition and hands-free use are not claimed.

## How we built it
We used the Devpost Learn planning template and AR guidance, then CLAD, Lens Studio and the Lens Studio MCP with an AI coding agent. Native TypeScript connects SIK/UIKit controls, GLB specimens, a 3D room, reference-based gene diagrams and coordinate-derived molecular geometry. The owner iteratively reviewed the native results. The complete prescribed planning interview was not performed; our workflow receipt records that limitation.

## Challenges and what we learned
Visual detail did not automatically make the lesson clear. Early versions lost the selected cell during zooms, overlapped specimens and restarted the film after exploration. We introduced explicit chapter state, saved film views, separate specimen regions, progressive labels and a context cell that remains beside the enlarged nucleus. We also kept microscopy distinct from illustration: a surface SEM cannot establish the interior or natural colour of a virtual cell.

## What is demonstrated
The native R32 project runs in Lens Studio Preview. Checks cover chapter navigation, pause/resume, source return, inspection and left/right synthetic hand input. The new cell and nucleus sequence has been captured in Preview. Our submission video is a 2:24 edit of native Preview captures; it does not represent device footage or measured device performance.

## Prior work and scientific scope
The owner's pre-existing GENESIS laboratory geometry and EcoGenesis 1BNA coordinate dataset were reused; the prior applications were not imported. Native assembly, lesson logic, botanical reconstruction and this presentation were developed for the contest. Scientific records, microscopy, official packages and fonts retain their original credits and terms.

GL1-S92F is a published example; the displayed reference coordinate is a derived projection. 1BNA is a separate B-DNA example, not GL1. Cell geometry, nuclear organization, colours and the new-leaf complementation are educational reconstructions. Physical glasses, photorealistic accuracy and learning outcomes have not been tested.

## Next
Test comfort and interaction on physical SPECS, then reuse the evidence-to-prediction lesson pattern for another well-supported biological example. The current submission contains one complete investigation, not a finished general education platform.

**Built with:** Lens Studio 5.23.2, TypeScript, CLAD, Lens Studio MCP, Spectacles Interaction Kit, Spectacles UIKit, Blender, Python.
