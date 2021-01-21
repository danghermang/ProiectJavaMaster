import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ol from 'openlayers';
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { PhotoviewerComponent } from '../../photoviewer/photoviewer.component';
import { MapService } from '../../services/map.service';
import { BackendApiService } from '../../services/backend-api.service';
import { Observable, interval } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';

@Component({
  selector: 'yuso-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @ViewChild('bidders_container') biddersContainer: ElementRef;
	@ViewChild('viewer') photoViewer: PhotoviewerComponent;

  auctionName: string = '';
  endDate: string = '';
  weight: string = '';
  fromCity: string = '';
  toCity: string = '';
  detalis: string = '';
  winner: string = '';
  auctionId: any;
  bidValue: number = 0;
  imageData: string = '';

  options: any;
  clicks = 0;
  coordOne : any;
  coordTwo : any;
  called: boolean = false;
  bidList = [];

  vectorSpace: any;
  vectorLayer: any;
  styles: any;
  constructor(
    private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    private backendService: BackendApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.auctionId = params['aid'];
        this.backendService.getJobDescription(Cookie.get('sessionId'), this.auctionId).subscribe(
            data => {
                let jsonParsed = JSON.parse(JSON.stringify(data));
                this.auctionName = jsonParsed.name;

                let date = new Date(jsonParsed.endDate);
                this.endDate = date.toISOString().substr(0, 11).replace('T', ' ');
                this.weight = jsonParsed.weight;
                this.fromCity = jsonParsed.fromCity;
                this.toCity = jsonParsed.toCity;
                this.detalis = jsonParsed.aditionalDetails;

                this.setupMapHandling(this.mapService, this.clicks, jsonParsed.pickupGeo, jsonParsed.deliveryGeo);

                const refreshInterval = interval(10000).subscribe(() => {
                    this.getBids();
                })

                //Get bid information
                this.backendService.getBidList(Cookie.get('sessionId'), this.auctionId).subscribe(
                    data => {
                        this.bidList = [];
                        for (let i = 0; i < data.length; i++) {
                            let bidderId = data[i].id
                            let bidderName = data[i].firstName + ' ' + data[i].lastName;
                            let price = data[i].price;
                            let tempDate = new Date(data[i].bidDate.substr(0,24));
                            let image = data[i].image;
                            let dateUTC = Date.UTC(tempDate.getFullYear(), tempDate.getMonth()+1, tempDate.getDay(),
                                tempDate.getHours(), tempDate.getMinutes());
                            console.log(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDay(),
                              tempDate.getHours(), tempDate.getMinutes())
                            this.bidList.push({enterdate: dateUTC, biddername: bidderName, bidvalue: price, imageData: image, id: bidderId});
                    }


                    if(this.bidList != null)
                        this.setupChart();
                },
                    error => console.error('ERROR: BackendService - getBidList()')
                );
            },
            error => this.router.navigateByUrl('/404')
        );
    });
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => this.scrollBidderContainerDown(), 100);
  }

  setupChart(){
    // Chart setup
    let chartArray = [];
    for (let i = 0; i < this.bidList.length; i++) {
        chartArray.push([this.bidList[i].enterdate, this.bidList[i].bidvalue]);
    }

    this.options = {
        chart: {type: 'area'},
        title: {text: 'Bid\'s'},
        series: [{
            data: chartArray,
            color: '#76B041',
            fillOpacity: 0.3

        }],
        credits: {enabled: false},
        xAxis: {type: 'datetime', title: {text: 'Date'}, dateTimeLabelFormats: {hour: '%H:%M', day: '%H:%M'}},
        yAxis: {title: {text: '$'}},
        legend: {enabled: false},
        tooltip: {
            formatter: function () {
                let date = new Date(this.x);
                return date.getUTCDay() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() +
                    ' - ' + date.getUTCHours() + ':' + date.getUTCMinutes()
                    + '<br>' + '$: ' + this.y;
            }
        }
    };
    this.spinner.hide();
}

onBidBtnClick(){
    if(this.bidValue <= 0){
        this.showAlert("Bid must be positive!");
        return;
    }
    if(this.bidList.length > 0 && this.bidList[this.bidList.length -1 ].bidvalue < this.bidValue){
        this.showAlert("Bid must be lower than " + this.bidList[this.bidList.length -1 ].bidvalue + "$");
        return;
    }
    this.backendService.addBid(Cookie.get('sessionId'), this.auctionId, this.bidValue).subscribe(
        res => {
            this.showAlert('You have bidded ' + this.bidValue + ' $!');
            this.getBids();
        },
        error => console.error('ERROR: BackendService - getBidList()' + error)
    );
}

showAlert(message: string) {
    const modalRef = this.modalService.open(AlertPopupComponent);
    modalRef.componentInstance.text = message;
  }

  scrollBidderContainerDown(){
    try {
      this.biddersContainer.nativeElement.scrollTop = this.biddersContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  onImageClick(){
    this.photoViewer.setImage('assets/package.jpg');
    this.photoViewer.toggleVisible(true);
  }
  setupMapHandling(mapService: MapService, clicky, coordOne, coordTwo){
    // Map creation
    this.vectorSpace = new ol.source.Vector();
    this.vectorLayer = new ol.layer.Vector({ source: this.vectorSpace });
    this.styles = {
        route: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 5, color: [16, 153, 28, 0.9]
            })
        }),
        icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: 'assets/map_point.png'
            })
        }),
        icon2: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: 'assets/map_point_location.png'
            })
        })
    };

    let map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            this.vectorLayer
        ],
        target: 'map',
        view: new ol.View({
            center: [27.574707, 47.173594],
            zoom: 16,
            projection: 'EPSG:4326'
        }),
        controls: []
    });

    let feature1 = new ol.Feature({
        type: 'place',
        geometry: new ol.geom.Point(JSON.parse(coordOne))
    });
    feature1.setStyle(this.styles.icon);
    this.vectorSpace.addFeature(feature1);

    let feature2 = new ol.Feature({
        type: 'place',
        geometry: new ol.geom.Point(JSON.parse(coordTwo))
    });
    feature2.setStyle(this.styles.icon);
    this.vectorSpace.addFeature(feature2);

    mapService.getRoute(JSON.parse(coordOne), JSON.parse(coordTwo)).subscribe(
        data => {
            let jsonParsed = JSON.parse(JSON.stringify(data));
            let route = new ol.format.Polyline({ factor: 1e5 }).readGeometry(jsonParsed.routes[0].geometry);
            let feature = new ol.Feature({
                type: 'route',
                geometry: route
            });
            feature.setStyle(this.styles.route);
            this.vectorSpace.addFeature(feature);
        },
        error => console.log('ERROR: MapService - getRoute()')
    );
  }

  getBids(){
    this.backendService.getBidList(Cookie.get('sessionId'), this.auctionId).subscribe(
        data => {
            if(data != null) {
                if(this.bidList.length > 0 && this.bidList[this.bidList.length -1 ].bidvalue > data[data.length - 1].price){
                    this.bidList = [];
                    for (let i = 0; i < data.length; i++) {
                        let bidderId = data[i].id;
                        let bidderName = data[i].firstName + ' ' + data[i].lastName;
                        let price = data[i].price;
                        let tempDate = new Date(data[i].bidDate.substr(0,23));
                        let image = data[i].image;
                        console.log(tempDate);
                        let dateUTC = Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDay(),
                            tempDate.getHours(), tempDate.getMinutes());
                      console.log(dateUTC);

                      this.bidList.push({enterdate: dateUTC, biddername: bidderName, bidvalue: price, imageData: image, id: bidderId});
                    }
                    if(this.bidList.length > 0)
                    this.setupChart();
                }
            }
        },
        error => console.error('ERROR: BackendService - getBidList()')
    );
  }

  myfunc(){
        if(!this.called){
            this.called = true;
            if(this.bidList.length > 0){
                if(this.backendService.getUserIdFromToken(Cookie.get('sessionId')) == this.bidList[this.bidList.length - 1].id){
                    this.showAlert("You won the auction!");
                    this.backendService.setWinner(Cookie.get('sessionId'), this.auctionId, this.bidList[this.bidList.length - 1].id).subscribe(
                        res => {
                            this.router.navigateByUrl('/');
                        },
                        error => console.error('ERROR: BackendService - getBidList()' + error)
                    );
                }
                else{
                    this.showAlert("Auction ended, good luck next time.");
                    this.router.navigateByUrl('/search');
                }
            }
            else{
                this.router.navigateByUrl('/search');
            }
        }
  }
}
