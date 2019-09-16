import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(private userService: UserService,
  private client: HttpClient,
  
   private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

   postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:8080/api/photo/upload';
    let formdata: FormData = new FormData();
    formdata.append('file', fileToUpload);
    return this.client
      .post(endpoint, formdata)
      .map(() => { return true; });
    }


  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  get appUser$() : Observable<AppUser>{
    return this.user$
    .switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();

      return Observable.of(null);
    });
  }
}
