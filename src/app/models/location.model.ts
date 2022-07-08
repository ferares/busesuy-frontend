import { Department } from './department.model';

export class Location {
  id!: number;
  name!: string;
  updatedAt!: string;
  createdAt!: string;
  department!: Department;
  
  constructor(data: Location) {
    Object.assign(this, data);
    return this;
  }
}