import { Connection } from './connection.model';
import { Location } from './location.model';

export class Result {
  origin!: Location;
  destination!: Location;
  connections!: Array<Connection>;
  
  constructor(data: Result) {
    Object.assign(this, data);
    return this;
  }
} 