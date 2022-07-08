import { Company } from "./company.model";
import { Line } from "./line.model";

export class CompanyData {
  company!: Company;
  lines!: Array<Line>;
  
  constructor(data: CompanyData) {
    Object.assign(this, data);
    return this;
  }
}