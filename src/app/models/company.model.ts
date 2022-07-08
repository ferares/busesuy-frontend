export class Company {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
  web!: string;
  userId!: number;
  updatedAt!: string;
  createdAt!: string;
  
  constructor(data: Company) {
    Object.assign(this, data);
    return this;
  }
}