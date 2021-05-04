import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Sale {
  product: 'Car' | 'Chair' | 'Spoon';
  price: number;
  date: Date;
}

var PRODUCTS: any = ['Car', 'Chair', 'Spoon'];

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales$: Subject<Sale> = new Subject();

  constructor() {
    // This simulates new data from the backend every 3 seconds
    setInterval(() => {
      this.sales$.next({ product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)], price: Math.random() * 5000, date: new Date() })
    }, 3000);
  }

  getLatestSale(): Observable<Sale> {
    // Return the subject as an observable
    return this.sales$.asObservable();
  }
}
