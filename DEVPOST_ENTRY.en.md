# One Letter, a Different Leaf

Explore how one DNA change affects a leaf. Inspect 3D models, make a prediction and test it against a control—without needing a physical laboratory.

## Inspiration

I bring together a background in plant genetics, practical PCR laboratory experience and software development. My goal is to help people understand biology through observation, questions and experiments, even when they have no access to a physical laboratory.

One Letter, a Different Leaf is a focused step toward that goal. It is designed for learners encountering genetics for the first time and educators explaining the connection between DNA and a visible trait. A learner can memorize “DNA → RNA → protein” and still struggle to explain how a gene changes a leaf. We start with a visible difference and work back toward its cause.

## What it does

Two young Arabidopsis leaves have different surfaces: one has branched hairs and one is smooth. At a movable spatial station, the learner selects and rotates a specimen, inspects one hair and compares it with published electron microscopy. A trichome is a single cell.

The lesson follows a developing leaf cell into its nucleus and a specific DNA fragment from GL1. The same 18 base pairs appear as letters and then as atoms. A stable comparison reveals one C–G pair replaced by T–A. The coding-strand codon changes from TCT to TTT; the corresponding RNA codon changes from UCU to UUU. GL1 then contains phenylalanine instead of serine at position 92.

The learner sees how this variant disrupts GL1's role in trichome development, predicts the next leaf, and adds a working gene copy in a model experiment. New growth is compared with an untreated control. The original smooth leaf stays smooth: adding a working copy is not presented as reversing the original DNA substitution.

Nine chapters support independent exploration. Chapters preserves the selected variant, prediction and result; Try again repeats the experiment. Home, Reset view, Evidence and Settings keep navigation and specimen inspection accessible. The optional laboratory environment can be hidden.

## Why spatial learning

Learners manipulate three-dimensional specimens at a station they can position, compare structures side by side, and connect successive biological scales through a shared scene. The intended learning task is active: observe, predict, intervene and compare with a control.

The current experience runs in Lens Studio Preview on a computer, without microscopes, reagents or living specimens. It supports understanding and scientific reasoning; practical laboratory skills still require hands-on training. The SPECS design is demonstrated in Preview, with physical-device testing still ahead.

## How we built it

I defined the learning question, scientific scope and visual direction, selected the evidence, and directed AI-assisted development. Devpost Learn plan-lens guidance and its brief template informed the design. The original planning process did not include every question in the standard interview; the repository records the actual workflow.

CLAD, Lens Studio 5.23.2 and Lens Studio MCP supported native construction, scripting, compilation and verification. TypeScript connects the models and controls to one lesson state. Spectacles Interaction Kit and UIKit provide hand interaction; Preview also supports mouse selection and specimen rotation.

## What we learned

First-time viewers helped expose confusing transitions, competing captions and unclear controls. We separated object labels from instructions, kept DNA comparisons still, added chapter navigation and preserved predictions when learners revisit earlier sections. This feedback improved the design; it is not a controlled study of learning outcomes.

Scientific boundaries are part of the lesson. Microscopy shows separate specimens. The DNA is a sequence-based structural model; the reference GL1 domain is predicted. The complementation demonstration is a teaching model. RNA is copied while DNA remains visible, and the protein does not disappear after the substitution.

## Validation and access

The submitted 2:50 recording shows the published navigation release running in Lens Studio Preview. English in-scene text carries the explanation, with separate EN, RU, ES and FR subtitles on YouTube.

For that published release, we verified all 81 ordered chapter transitions, both predictions, working-copy gating, repeated experiments, Evidence pages, laboratory settings and specimen rotation. Ten lesson-state tests passed. An independent copy without an existing cache opened and completed the lesson on the same Mac; all 553 native inputs matched. Physical SPECS were not tested.

Download **TwoOaks-navigation-source.zip** from the linked GitHub release for the complete Lens Studio project, dependencies and assets. The README explains the Preview setup; GitHub's automatic source ZIP contains review files only.

## Sources and reuse

Credited scientific resources include published electron microscopy, epidermal measurements, confocal nuclear images, an Arabidopsis ribosome structure and a predicted reference GL1 domain. The DNA geometry was built from the GL1 reference sequence. Sources, transformations and licenses are documented.

The laboratory reuses earlier GENESIS geometry. Official Snap packages, Inter and earlier botanical/scientific visualization work are also disclosed. The nine-chapter GL1 investigation and its interactions were developed during the contest period.

## What's next

Test on physical SPECS, evaluate understanding with more first-time learners, and develop additional carefully chosen examples of how genetic changes affect development. This Lens is one learning module within a broader goal of making biology understandable and accessible without requiring access to a physical laboratory.
