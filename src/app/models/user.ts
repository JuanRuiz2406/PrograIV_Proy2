export class User{
  constructor(
    public id:number,
    public name:string,
    public last_name:string,
    public email:string,
    public username:string,
    public password:string,
    public created_at:string,
    public updated_at:string
  ){}
}
