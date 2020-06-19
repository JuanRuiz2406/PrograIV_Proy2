export class Product{
    constructor(
      public id:number,
      public name:string,
      public description:string,
      public currentExist:number,
      public minExist:number,
      public price:number,
      public image:string,
      public created_at:any,
      public updated_at:any,
      public idSupplier:number,
      public idCategory:number
    ){}
  }