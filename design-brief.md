# Design brief: One Gene, A Visible Difference

Implemented R32 brief, updated 31 October 2026. Adapted from the official Devpost template. The owner's recorded choices were Arabidopsis genetic variation, realistic botanical references, a 3D laboratory, a leaf-to-cell-to-DNA path, clearer nucleus context and minimal controls. Positioning/timing are implementation decisions, not invented interview answers. The original oak brief is retained locally in the revision history.

## The one spatial moment
Notice a visible leaf difference, follow one selected trichome through its cell and nucleus, and use a specific GL1 example to predict a separate new leaf. Keep the original specimen or control visible when changing scale or testing the explanation.

## Why it belongs on glasses
Uses placement in the world. Models, linked enlargements and independent evidence occupy a shared movable station. The benefit over a flat visualization is a design hypothesis, not a measured learning result. It does not recognize plants or free the user's hands.

## Product or overlay
The virtual investigation is the product. It requires no real-object recognition, live biological measurement, microphone or cloud answer. Bundled reference data and disclosed reconstructions provide the lesson.

## Where things live
The initial lesson is about 1.3 m in front of the initial camera. A single parent holds the lesson and controls. The Move station handle translates that parent; release distance is clamped to 80–170 cm. Recenter places it 110 cm ahead and 3 cm below the current camera. These are implementation dimensions in centimetres.

Microscopy sits beside its relevant model. Other leaves leave the isolated-cell scene. During nucleus magnification, a smaller context cell remains at the side with a connector. Menu and modal evidence temporarily prioritize their controls. The laboratory is optional and starts off for AR use.

## Hands and input
SIK pinch buttons and specimen grabs; mouse interaction in Interactive Preview. Inspect/Done, scale −/+, Reset view and Evidence are contextual. One transport row gives Pause/Resume, Explore and Menu. All six chapters remain accessible. The station handle translates the entire lesson. Synthetic left/right input is checked; simultaneous physical two-hand feel is unproven.

## When things show
Show wall/vacuole, then cytoplasm/nucleus, then enlarged nucleus/envelope, then chromatin/nucleolus. Delay labels until the movement settles. Keep one selected site visible across the scale change. Preserve the saved film view when opening evidence or exploring; Resume restores it.

## Done criteria
1. All six chapters can be opened directly from Menu.
2. Pause, Explore and Resume preserve film time and the saved view.
3. Leaf/cell/nucleus inspection and source expansion return without pose jumps.
4. The cell entry uses the same exterior and the enlarged nucleus retains visible context.
5. Lab on/off and Move station/Recenter support an optional backdrop and a coherent spatial station.
6. The gene exercise and new-leaf comparison retain the scientific distinctions stated in Sources.

Evidence and gaps are listed in QA.md. Current native checks combine direct Preview interaction, runtime state checks and local regression checks. Historical oak LEAF scenarios are not claimed as coverage of the Arabidopsis lesson.

## Out of scope and risks
No plant identification, patient use, live microscopy, measured tissue reconstruction, measured growth rate, molecular simulation of GL1, or proven learning outcome. The dense molecular view and display contrast still need physical SPECS testing. Public submission and third-party terms require the owner's final review.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
