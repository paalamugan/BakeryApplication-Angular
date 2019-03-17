export class Product {
    public id:number;
    public name:string;
    public quantity:number;
    public price:number;
    public modelNumber:string;
    constructor(id:number,name:string,quantity:number,price:number,modelNumber:string){
        this.id=id;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
        this.modelNumber=modelNumber;
    }

    
}
