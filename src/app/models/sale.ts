export class Sale{
    constructor(
      public id:number,
      public iva:number,
      public totalPrice:number,
      public discount:number,
      public created_at:any,
      public updated_at:any,
      public idCustomer:any
    ){}
  }