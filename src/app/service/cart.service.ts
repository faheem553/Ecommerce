import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList:any=[];
  public productList=new BehaviorSubject<any>([]);
  public searchText=new Subject<any>();
  
  constructor() {}
  getProduct(){
   return this.productList.asObservable();
  }
  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtocart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice(){
    let grandTotal:number=0;
    this.cartItemList.map((a:any)=>{
      grandTotal+=a.total;
    })
    return grandTotal;
  }
  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id==a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCArt(){
    this.cartItemList=[];
    this.productList.next(this.cartItemList);
  }
  setSearchText(text:any){
    this.searchText.next(text);
  }
}
