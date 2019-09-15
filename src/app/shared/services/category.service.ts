import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }


  getAll() {
    return this.db.list('/categories', cat => cat.orderByChild('name')).snapshotChanges()
    .map(categories => {
      return categories.map(category => ({ key: category.key, ...category.payload.val() }));
    });
  }
}
