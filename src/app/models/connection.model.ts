import { Company } from './company.model';
import { Line } from './line.model';
import { Stop } from './stop.model';

export class Connection {
  line!: Line;
  company!: Company;
  originStop!: Stop;
  destinationStop!: Stop;
  duration!: string;
  
  constructor(data: Connection) {
    Object.assign(this, data);
    return this;
  }
}