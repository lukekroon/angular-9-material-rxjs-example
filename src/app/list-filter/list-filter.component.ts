import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

interface Items {
  item: string;
  sold: boolean;
  price: number;
}

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit {

  // Source 
  data$: Observable<Items[]> = of([
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

  constructor() { }

  ngOnInit(): void {
    this.dataToShow$ = combineLatest([this.soldFilter$, this.lesThan5000Filter$]).pipe(
      mergeMap(([soldFilter, lessThan500]) => {
        return this.data$.pipe(map(data => {
          let dataToReturn = data.filter(d => soldFilter ? d.sold === soldFilter : true);
          if (lessThan500)
            dataToReturn = dataToReturn.filter(d => d.price < 5000)
          return dataToReturn;
        }));
      })
    )
  }

}
