import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

var modal = document.getElementById("loginModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
loginShow;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    this.loginShow = false;
   }
   login(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "block";
   }
   closeModal(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
   }
   toggle(){
    this.loginShow = !this.loginShow;
   }
  logout(){
    this.auth.logout();
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = (await this.shoppingCartService.getCart());

  }
}
