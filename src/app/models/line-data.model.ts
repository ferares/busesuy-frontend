import { Company } from "./company.model";
import { Line } from "./line.model";
import { Location } from "./location.model";
import { Stop } from "./stop.model";

export class LineData {
  line!: Line;
  company!: Company;
  origin!: Location;
  destination!: Location;
  stops!: Array<Stop>;
  
  constructor(data: LineData) {
    Object.assign(this, data);
    return this;
  }
}