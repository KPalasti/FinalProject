import { Address } from "./address";
import { Model } from "./model";

export class EquipmentType {
  id: number;
  type: string | undefined;


  constructor(id: number = 0, type?: string) {
    this.id = id;
    this.type = type;
  }
}
