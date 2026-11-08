# One Letter, a Different Leaf

A spatial genetics investigation for SPECS: follow one change in GL1 from a DNA letter to the surface of a developing Arabidopsis leaf.

**[Watch the 2:50 demonstration](https://youtu.be/njbU3csrYvc) · [Download the complete Lens Studio project](https://github.com/Ecooddworld/one-gene-visible-difference/releases/download/r35-navigation-20261106/TwoOaks-navigation-source.zip) · [Release and checksums](https://github.com/Ecooddworld/one-gene-visible-difference/releases/tag/r35-navigation-20261106)**

## Learning goal and author

Created by **Andrei Mikhailov**, a developer at ODD Studio with a background in plant genetics and practical PCR laboratory experience. The goal is to help people understand biology through observation, questions and model experiments, even without access to a physical laboratory.

This module is for learners encountering genetics for the first time and educators explaining how DNA relates to a visible trait. Learners inspect specimens, follow the evidence, predict an outcome and compare new growth with a control. No microscope, reagents or living specimens are required to explore it in Lens Studio Preview on a computer. It supports scientific reasoning; practical laboratory skills still require hands-on training.

## Submitted version

The [Devpost entry](https://devpost.com/software/one-letter-a-different-leaf) was verified as **SUBMITTED (5/5)** on 8 November 2026. The submitted version is **R35 navigation, 6 November 2026**, with the video and complete project linked above. This documentation update does not replace that native build or introduce features from later local work. See [SUBMISSION_VERSION.md](SUBMISSION_VERSION.md) for the exact release, source snapshot and archive checksum.

## Open the working project

Download **TwoOaks-navigation-source.zip** from the linked release, extract it, then open `runtime/TwoOaks/TwoOaks.esproj` in Lens Studio 5.23.2. This is the complete tested project, including native scenes, code, packages, textures, meshes, microscopy, captions, source credits and licenses. The repository's Git tree provides review documents and the principal interaction scripts; GitHub's automatic “Source code” ZIP is not the complete Lens. Use the explicitly named project download above.

Allow the first asset import and TypeScript compilation to finish. In Preview use **Interactive**, **No Simulation**, and **Device Type Override → SPECS**. Expand Preview by double-clicking its tab. Left-click selects and left-drag rotates a specimen; right-drag moves the editor camera. Native simulated hands can be tested separately with SPECS 27.

## Try the investigation

1. Compare the leaf surfaces and inspect a branched hair: one trichome is a single cell.
2. Follow microscopy, cell and nucleus to the same 18-base-pair GL1 fragment. Switch between letters, atoms, codon and pair, then compare C–G with T–A.
3. Follow TCT → UCU → serine and TTT → UUU → phenylalanine to position 92 of GL1.
4. Predict the next leaf, add a working copy of GL1, and compare new growth with the untreated control. Try both predictions.
5. Use **Chapters** in the bottom row to jump between nine sections. Prediction, DNA selection and result persist. **Try again** repeats the experiment; **Home** starts fresh; **Reset view** restores specimen orientation. **Settings** controls laboratory visibility and station placement.

The guided film and independent Explore route use the same native objects and lesson state. English in-scene text carries the explanation. The YouTube demonstration includes a quiet music track and separate EN, RU, ES and FR subtitles; the source archive also contains the caption files.

## Evidence and validation

Microscopy depicts independent specimens. DNA geometry is a sequence-based structural model, the GL1 domain is a prediction, and the complementation experiment is a teaching model. The in-scene Evidence cards distinguish these sources and limits.

Verified on 6 November 2026: all 81 ordered chapter transitions, both predictions, working-copy gating, replay, retained experiment state, evidence pages, model rotation, station dragging, laboratory settings and film pause/resume. Ten lesson-state tests passed. An independent copy with no pre-existing cache opened and completed the lesson on the same Mac; all 553 native input files match the release. Physical SPECS were not tested.

See [setup](NATIVE_README.md), [scientific evidence](SOURCES_AND_LIMITS.md), [credits and licenses](THIRD_PARTY_NOTICES.md), [verification](QA.md), [planning/build record](workflow-receipt.md) and [entry description](DEVPOST_ENTRY.en.md). Prior R32 remains available as a historical release. The current native source snapshot is `dff429a10df1d1e4ac246af2d519ce5332634708`.
