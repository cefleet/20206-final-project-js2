// Elevator Management Panic - Step 1 & 2: Building layout and elevator movement
import Elevator from "./classes/Elevator.js";

// These constants are needed by Elevator, so export them for use in Elevator.js
export const FLOOR_COUNT = 8;
export const FLOOR_HEIGHT = 60;
export const FLOOR_START_Y = 80;
export const ELEVATOR_X = [250, 350];
export const ELEVATOR_WIDTH = 40;
export const ELEVATOR_HEIGHT = 40;

const passengers = []; // Array to track passengers

const FLOOR_LABEL_X = 100;

const floorPositions = [];
const floorSpacing = 60;
const buildingTop = 80;

for (let i = 0; i < FLOOR_COUNT; i++) {
  floorPositions.push(buildingTop + i * floorSpacing);
}

export function getFloorY(floor) {
  // Floor 1 is at the bottom
  return FLOOR_START_Y + (FLOOR_COUNT - floor) * FLOOR_HEIGHT;
}

function spawnPassenger(scene) {
  const startFloor = Phaser.Math.Between(1, FLOOR_COUNT);
  let destFloor;
  do {
    destFloor = Phaser.Math.Between(1, FLOOR_COUNT);
  } while (destFloor === startFloor);

  const patience = 10000; // milliseconds
  const y = floorPositions[startFloor - 1];

  const sprite = scene.add.rectangle(120, y, 20, 20, 0x00ff00);

  passengers.push({
    startFloor,
    destinationFloor: destFloor,
    patience,
    sprite,
    timer: patience,
  });
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  scene: {
    elevators: [],
    create: function () {
      // Draw floors
      for (let i = 1; i <= FLOOR_COUNT; i++) {
        const y = getFloorY(i);
        this.add.line(0, 0, 150, y, 450, y, 0xffffff, 0.3);
        this.add.text(FLOOR_LABEL_X, y - 10, `Floor ${i}`, {
          font: "16px monospace",
          color: "#fff",
        });
      }
      // Create elevators
      this.elevators = [new Elevator(this, 0), new Elevator(this, 1)];
      // Input controls
      this.input.keyboard.on("keydown-W", () => {
        const e = this.elevators[0];
        if (!e.isMoving) e.moveToFloor(e.currentFloor + 1);
      });
      this.input.keyboard.on("keydown-S", () => {
        const e = this.elevators[0];
        if (!e.isMoving) e.moveToFloor(e.currentFloor - 1);
      });
      this.input.keyboard.on("keydown-UP", () => {
        const e = this.elevators[1];
        if (!e.isMoving) e.moveToFloor(e.currentFloor + 1);
      });
      this.input.keyboard.on("keydown-DOWN", () => {
        const e = this.elevators[1];
        if (!e.isMoving) e.moveToFloor(e.currentFloor - 1);
      });

      this.time.addEvent({
        delay: 3000, // spawn every 3 seconds
        callback: () => spawnPassenger(this),
        loop: true,
      });

      passengers.forEach((p) => {
        p.timer -= this.game.loop.delta;
        if (p.timer <= 0) {
          // Handle patience expiration (lose life, remove passenger)
          p.sprite.destroy();
        }
      });

      for (let i = passengers.length - 1; i >= 0; i--) {
        if (passengers[i].timer <= 0) {
          passengers.splice(i, 1);
        }
      }
    },
  },
};

export default config;

const game = new Phaser.Game(config);
