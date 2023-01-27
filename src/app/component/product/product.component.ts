import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList:any;
   searchText:any;
  constructor(private api:ApiService, private cart:CartService){}

  ngOnInit():void{
    this.api.getProducts().subscribe(res=>{
      this.productList=res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    });
    this.cart.searchText.subscribe((res:any)=>{
      this.searchText = res;
    });
  }
  addtocart(item:any){
    this.cart.addtocart(item);
  }
}
