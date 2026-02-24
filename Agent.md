I am building a small Phaser 3 game called "Elevator Management Panic".

IMPORTANT CONSTRAINTS:
- This is a small 14-hour project.
- Do NOT add complex architecture.
- Keep everything inside one Scene.
- Use simple rectangles and text instead of images.
- Focus on gameplay logic over visuals.
- No external assets.

GAME CONCEPT:
The player manually controls TWO elevators inside a building.
People spawn randomly on floors and want to go to another floor.
The goal is to transport as many people as possible before chaos overwhelms the building.

CORE MECHANICS:

BUILDING:
- 8 floors total.
- Each floor is evenly spaced vertically.
- Floors are labeled 1–8.

ELEVATORS:
- 2 elevators.
- Each elevator can move up or down one floor at a time.
- Elevators move smoothly between floors.
- Each elevator has:
  - currentFloor
  - targetFloor
  - isMoving
  - passenger (only 1 passenger max for now)

CONTROLS:
- Elevator 1:
  - W = move up
  - S = move down
- Elevator 2:
  - Up Arrow = move up
  - Down Arrow = move down

PASSENGERS:
- Spawn randomly every few seconds on random floors.
- Each passenger has:
  - startFloor
  - destinationFloor (different from start)
  - patience (timer that decreases over time)
- If patience reaches 0 → player loses 1 life.

PICKUP RULE:
- If elevator is on the same floor as a waiting passenger and empty,
  it automatically picks them up.

DROPOFF RULE:
- If elevator reaches passenger.destinationFloor,
  passenger is removed and score increases.

CHAOS SYSTEM:
- Over time:
  - Passenger spawn rate increases.
  - Passenger patience decreases faster.

GAME OVER:
- Player starts with 5 lives.
- Lose a life when a passenger's patience hits 0.
- Game ends at 0 lives.

UI:
- Show:
  - Score
  - Lives
  - Current spawn rate
- Use simple text objects.

IMPLEMENTATION NOTES:
- Use arrays to track passengers.
- Use Phaser time events for spawning.
- Use simple rectangles for elevators and passengers.
- Use tweening for smooth elevator movement.
- Keep code readable and organized with helper functions.
- No need for menus or restart system yet.

First, help me:
1. Create building layout and floor positions.
2. Create the elevator objects and movement logic.
3. Then implement basic passenger spawning.