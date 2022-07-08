import { Company } from './company.model';
import { Location } from './location.model';

export class Line {
  id!: number;
  name!: string;
  route!: string;
  frequency!: string;
  startTime!: string;
  endTime!: string;
  originId!: number;
  destinationId!: number;
  companyId!: number;
  origin?: Location;
  destination?: Location;
  company?: Company;
  updatedAt!: string;
  createdAt!: string;
  
  constructor(data: Line) {
    Object.assign(this, data);
    return this;
  }
}