import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  data$: Observable<any[]> = of([
    {
      item: 'Car',
      sold: false,
      price: 10000
    },
    {
      item: 'Chair',
      sold: true,
      price: 2500
    },
    {
      item: 'Spoon',
      sold: false,
      price: 1000
    }
  ]);

  soldFilter$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  lesThan5000Filter$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataToShow$: Observable<any[]>;

  ngOnInit() {
    this.dataToShow$ = combineLatest(this.soldFilter$, this.lesThan5000Filter$).pipe(
      mergeMap(([soldFilter, lessThan500]) => {
        return this.data$.pipe(map(data => {
          let dataToReturn = data.filter(d => soldFilter ? d.sold === soldFilter : true);
          if(lessThan500)
            dataToReturn = dataToReturn.filter(d => d.price < 5000)
          return dataToReturn;
        }));
      })
    )
  }
}