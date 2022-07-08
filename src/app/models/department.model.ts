export class Department {
  id!: number;
  name!: string;
  updatedAt!: string;
  createdAt!: string;
  
  constructor(data: Department) {
    Object.assign(this, data);
    return this;
  }
}