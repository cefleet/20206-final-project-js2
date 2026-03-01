import {
  FLOOR_COUNT,
  ELEVATOR_X,
  ELEVATOR_WIDTH,
  ELEVATOR_HEIGHT,
  getFloorY,
} from "../game.js";

class Elevator {
  constructor(scene, index) {
    this.scene = scene;
    this.index = index;
    this.currentFloor = 1;
    this.targetFloor = 1;
    this.isMoving = false;
    this.passenger = null;
    this.rect = scene.add.rectangle(
      ELEVATOR_X[index],
      getFloorY(this.currentFloor),
      ELEVATOR_WIDTH,
      ELEVATOR_HEIGHT,
      0x00aaff
    );
    this.rect.setOrigin(0.5, 0.5);
  }

  moveToFloor(floor) {
    if (this.isMoving || floor < 1 || floor > FLOOR_COUNT) return;
    this.targetFloor = floor;
    this.isMoving = true;
    this.scene.tweens.add({
      targets: this.rect,
      y: getFloorY(floor),
      duration: 500,
      onComplete: () => {
        this.currentFloor = floor;
        this.isMoving = false;
      },
    });
  }
}

export default Elevator;
