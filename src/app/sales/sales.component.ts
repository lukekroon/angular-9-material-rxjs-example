import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sale, SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  latestSale$: Observable<Sale>;
  last10Sales$: Observable<Sale[]>;
  top5Sales$: Observable<Sale[]>;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.latestSale$ = this.salesService.getLatestSale();

    // TODO: Keep track of the last 10 sales
    this.last10Sales$ = this.salesService.getLatestSale().pipe(
      map((sale: Sale) => {
        // Write code here 
        return [sale]
      }),
      tap(console.log) // To view the logs ctrl + shift + I
    );

    // TODO: Keep track of the top 5 most expensive sales
    this.top5Sales$ = this.salesService.getLatestSale().pipe(
      map((sale: Sale) => {
        // Write code here 
        return [sale]
      }),
      tap(console.log) // To view the logs ctrl + shift + I
    );

  }

}
