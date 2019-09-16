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
import {environment } from 'environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

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
  selectedCity = "All";
  selectedPrice = 0;
  selectedRelative=0;
  categories$;
  Categories:any[];
  posts:any[];
  product :any = {
    title: '',
    price: '',
    category: '',
    createdTime:'',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private http:Http,
    private sanitizer:DomSanitizer,
    private shoppingCartService: ShoppingCartService
  ) {
    this.categories$ = categoryService.getAll();
      http.get(environment.url + 'item/categories').subscribe(response => {
      console.log(response);
      this.Categories = response.json();
      this.Categories.unshift('All');
    })
    http.get(environment.url + 'item/').subscribe(response => {
      console.log(response);
      this.filteredProducts = response.json();
      for (let index = 0; index < this.filteredProducts.length; index++) {
        let prod:any = this.filteredProducts[index];
        if(prod.photosURL.indexOf('http') == -1)
        prod.photosURL = "./assets/"+ prod.photosURL.replace(/^.*[\\\/]/, '')
        //this.filteredProducts[index].photosURL = prod.photosURL ;
      }
      this.allProducts = this.filteredProducts.slice();
    })
    this.categories$ = categoryService.getAll();
      http.get(environment.url + 'item/cities').subscribe(response => {
      console.log(response);
      this.Cities = response.json();
      this.Cities.unshift('All');
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
      {id:3,Name:'High Price'}
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
    //alert(this.selectedPrice);
    let price = 0;
    price = (this.selectedPrice == 1)?1000:(this.selectedPrice == 2)?10000:(this.selectedPrice == 3)?100000:500000;
    this.filteredProducts = this.allProducts.filter(x=>
    ((x.category == this.selectedCategory)||(this.selectedCategory == "All"))&&
    ((x.price < price)||(this.selectedPrice == 0)) &&
    ((x.city == this.selectedCity)||(this.selectedCity == "All")) );
if (this.selectedRelative == 1)
    {
       this.filteredProducts = this.filteredProducts.sort((obj1, obj2) => {
    if (obj1.createdTime > obj2.createdTime) {
        return 1;
    }

    if (obj1.createdTime < obj2.createdTime) {
        return -1;
    }

    return 0;
});
    }

    if (this.selectedRelative == 2)
    {
       this.filteredProducts = this.filteredProducts.sort((obj1, obj2) => {
    if (obj1.price > obj2.price) {
        return 1;
    }

    if (obj1.price < obj2.price) {
        return -1;
    }

    return 0;
});
    }
    else if (this.selectedRelative == 3)
    {
       this.filteredProducts = this.filteredProducts.sort((obj1, obj2) => {
    if (obj1.price > obj2.price) {
        return -1;
    }

    if (obj1.price < obj2.price) {
        return 1;
    }

    return 0;
});
      }
}
}
