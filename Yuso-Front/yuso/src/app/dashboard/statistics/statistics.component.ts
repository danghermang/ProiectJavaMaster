import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'yuso-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  options: any;

	profitThisMonth: number = 300;
  profitsTotal: number = 1250;
  distanceThisMonth: number = 520;
  deliveriesThisMonth: number = 3;
  totalDistance: number = 4120;
  totalDeliveries: number = 13;
  constructor(private backendService: BackendApiService) {
  //   backendService.getStats(Cookie.get('sessionId')).subscribe(
  //     data => {
  //           let jsonParsed = JSON.parse(JSON.stringify(data));
  //           this.profitThisMonth = 300/*jsonParsed.profit_current_month*/;
  //           this.distanceThisMonth = 125/*jsonParsed.distance_current_month*/;
  //           this.deliveriesThisMonth = 5/*jsonParsed.deliveris_current_month*/;
  //           this.profitsTotal = 3452/*jsonParsed.total_profit*/;
  //           this.totalDistance = 342/*jsonParsed.total_distance*/;
  //           this.totalDeliveries = 25/*jsonParsed.total_deliveries*/;
  //           this.options = {
  //               chart: { type: 'pie' },
  //               title: { text: 'Total Profits' },
  //               credits: { enabled: false },
  //               series: [{
  //                   name: 'Profits',
  //                   data: [
  //                       {
  //                           name: 'Profits this month',
  //                           y: this.profitThisMonth,
  //                           sliced: true,
  //                           selected: true,
  //                       },
  //                       {
  //                           name: 'Total',
  //                           y: this.profitsTotal
  //                       }
  //                   ],
  //                   colors: ['#76B041', '#afe281']
  //               }]
  //           };
  //       },
  //       error => console.error('ERROR: BackendService - getStats()')
  //   );
  this.options = {
                  chart: { type: 'pie' },
                  title: { text: 'Total Profits' },
                  credits: { enabled: false },
                  series: [{
                      name: 'Profits',
                      data: [
                          {
                              name: 'Profits this month',
                              y: this.profitThisMonth,
                              sliced: true,
                              selected: true,
                          },
                          {
                              name: 'Total',
                              y: this.profitsTotal
                          }
                      ],
                      colors: ['#76B041', '#afe281']
                  }]
              };
   }
}
