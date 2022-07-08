import { Location } from './location.model';

export class Stop {
  id!: number;
  time!: string;
  updatedAt!: string;
  createdAt!: string;
  location!: Location;
  
  constructor(data: Stop) {
    Object.assign(this, data);
    return this;
  }
}