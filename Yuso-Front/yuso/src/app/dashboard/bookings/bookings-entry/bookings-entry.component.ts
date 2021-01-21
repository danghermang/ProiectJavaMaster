import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yuso-bookings-entry',
  templateUrl: './bookings-entry.component.html',
  styleUrls: ['./bookings-entry.component.css']
})
export class BookingsEntryComponent implements OnInit {
  @ViewChild('btn') btn: ElementRef;
  @Input() buttonColor : string;
  @Input() auctionName : string;
  @Input() details : string;
  @Input() jobId: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.btn.nativeElement.style.background = this.buttonColor;
  }

  onViewAuctionClick(){
    this.router.navigateByUrl('/status?aid=' + this.jobId);
  }
}
