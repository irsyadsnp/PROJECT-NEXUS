# Neon Drift

Neon Drift is the first PROJECT NEXUS first-party game prototype: a compact 2D precision platformer built with Godot 4.

## Current prototype scope

- Side-to-side movement with acceleration and friction.
- Jumping with gravity and floor detection.
- A compact obstacle course with solid platforms and hazard zones.
- Respawn and death counter.
- Finish trigger and restart flow.
- Camera follow and a minimal HUD.

This repository currently contains the initial Godot project source. The game has **not yet been runtime-tested or exported**; do not label it playable or published until a Godot 4 validation run succeeds.

## Run locally

1. Install Godot 4 (standard desktop editor).
2. Open this directory as a project in Godot.
3. Run the main scene (F6 is not required; use F5 / Run Project).

## Controls

| Action | Key |
|---|---|
| Move left | A |
| Move right | D |
| Jump | Space or W |
| Restart after completion / restart level | R |

## Project layout

- `project.godot` — project configuration and input actions.
- `scenes/main.tscn` — game entry scene.
- `scenes/player.tscn` — player body and camera.
- `scripts/main.gd` — level geometry, hazards, HUD, respawn, and goal.
- `scripts/player.gd` — player movement and fall detection.

## Next validation gate

Run the project in Godot 4, fix parser/runtime errors, verify movement and collisions, then export a Web build and test it inside the NEXUS portal. Web export is intentionally not claimed yet.
