import { RoverOrientationType } from "../rover-orientation-type.enum";

export class RoverOrientation {
  private value: RoverOrientationType;
  
  constructor(data?: {
    value: RoverOrientationType
  }) {
    const hasInvalidValue = !!data && !RoverOrientationType[data.value?.toString()]; 
    if (hasInvalidValue) {
      throw new Error("Invalid orientation type!");  
    }
    this.value = data?.value || RoverOrientationType.N;    
  }

  getValue(): RoverOrientationType {
    return this.value;
  }

  turnRight() {    
    this.value = this.value < RoverOrientationType.W 
      ? this.value + 1 
      : RoverOrientationType.N;
  }
  
  turnLeft() {
    this.value = this.value > RoverOrientationType.N 
      ? this.value - 1 
      : RoverOrientationType.W;
  }
  
  toString() {
    return RoverOrientationType[this.value];
  }
}