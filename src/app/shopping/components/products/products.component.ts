import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CategoryService } from 'shared/services/category.service';
import {Http} from '@angular/http';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  Cities;
  Prices;
  Relatives;
  Within;
  allProducts;
  selectedCategory = "All";
  selectedPrice = "All";
  categories$;
  Categories:any[];
  posts:any[];
  product :any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private http:Http,
    private shoppingCartService: ShoppingCartService
  ) {
    this.categories$ = categoryService.getAll();
      http.get('http://localhost:8080/api/item/categories').subscribe(response => {
      console.log(response);
      this.Categories = response.json();
      this.Categories.unshift('All');
    })
    http.get('http://localhost:8080/api/item/').subscribe(response => {
      console.log(response);
      this.filteredProducts = response.json();
      this.allProducts = this.filteredProducts.slice();
    })
    this.Cities = [
      {id:0,Name:'All'},
      {id:1,Name:'FairField'},
      {id:2,Name:'Des Moines'},
      {id:3,Name:'Iowa City'}
    ]
    this.Prices = [
      {id:0,Name:'All'},
      {id:1,Name:'less than 1000$'},
      {id:2,Name:'less than 10000$'},
      {id:3,Name:'less than 100000$'},
      {id:4,Name:'less than 500000$'}
    ]
    this.Relatives = [
      {id:0,Name:'All'},
      {id:1,Name:'Most Recent'},
      {id:2,Name:'Low Price'},
      {id:3,Name:'High Price'},
      {id:3,Name:'Closest Area'}
    ]
    this.Within = [
      {id:0,Name:'All'},
      {id:1,Name:'The last 24 hours'},
      {id:2,Name:'The last 7 days'},
      {id:3,Name:'The last 30 days'}
    ]
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    //this.populateProducts();
  }
filterByCat()
{
    alert(this.selectedPrice);
    let price = (parseInt(this.selectedPrice) == 1)?1000:(parseInt(this.selectedPrice) == 2)?10000:(parseInt(this.selectedPrice) == 3)?100000:500000;
    this.filteredProducts = this.allProducts.filter(x=>
    ((x.category == this.selectedCategory)||(this.selectedCategory == "All"))&&
    ((x.price < price)||(this.selectedPrice == "All"))
    );
}
}
