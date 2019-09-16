import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import * as $ from 'jquery';
import {environment } from 'environments/environment';
import {Http} from '@angular/http';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

fileToUpload: File = null;
  categories$;
  Cities;
  Categories;
  product :any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:Http,
    private auth: AuthService,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();
    http.get(environment.url + 'item/cities').subscribe(response => {
      console.log(response);
      this.Cities = response.json();
    })
    http.get(environment.url + 'item/categories').subscribe(response => {
      console.log(response);
      this.Categories = response.json();
    })
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      this.fileToUpload = input.files.item(0);
        var reader = new FileReader();
        var p = this.product;
        reader.onload = function (e) {
          let trgt : any= e.target;
        $('#imageUrl')
                .attr('src',''+ trgt.result)
                .width(150)
                .height(200);
                p.photosURL = trgt.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

uploadFileToActivity() {
    this.auth.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  save(product) {
product.userId = 30;
this.auth.postFile(this.fileToUpload).subscribe(data => {
  product.photosURL = data;
      this.http.post(environment.url + 'item/add',product ).subscribe(response => {
      
    })
      }, error => {
        product.photosURL = error.error.text;
      this.http.post(environment.url + 'item/add',product ).subscribe(response => {
       
    })
        console.log(error);
      });


    // if (this.id) this.productService.update(this.id, product);
    // else this.productService.create(product);

    this.router.navigate(['/']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product')) return;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }


}
