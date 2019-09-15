import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import * as $ from 'jquery';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  Cities;
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
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();
this.Cities = [
      {id:1,Name:'FairField'},
      {id:2,Name:'Des Moines'},
      {id:3,Name:'Iowa City'}
    ]
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var p = this.product;
        reader.onload = function (e) {
          let trgt : any= e.target;
        $('#imageUrl')
                .attr('src',''+ trgt.result)
                .width(150)
                .height(200);
                p.imageUrl = trgt.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product')) return;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }


}
