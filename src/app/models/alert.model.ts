export class Alert {
  message!: string;
  autoClose!: boolean;
  type!: string;
  
  constructor(data: Alert) {
    Object.assign(this, data);
    return this;
  }
}