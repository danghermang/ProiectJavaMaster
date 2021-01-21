import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { PhotoviewerComponent } from '../../photoviewer/photoviewer.component';
import { ActivatedRoute, Router } from "@angular/router";
import { BackendApiService } from '../../services/backend-api.service';
import { MapService } from '../../services/map.service';
import * as ol from 'openlayers';

var latitude;
var longitude;

@Component({
  selector: 'yuso-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @ViewChild('viewer') photoViewer: PhotoviewerComponent;

  bookingName: string = '';
    weight: string = '';
    fromCity: string = '';
    fromAddress: string = '';
    fromPostalCode: string = '';
    toCity: string = '';
    toAddress: string = '';
    toPostalCode: string = '';
    details: string = '';
    status: string = '';
    cost: string = '-'
    vectorSpace: any;
    vectorLayer: any;
    styles: any;

  constructor(private activatedRoute: ActivatedRoute, 
    private backendService: BackendApiService,
    private router: Router, 
    private mapService: MapService) { 
        this.activatedRoute.queryParams.subscribe(params => {
            let auctionId = params['aid'];
            this.backendService.getJobDescription(Cookie.get('sessionId'), auctionId).subscribe(
                data => {
                    let json = JSON.stringify(data);
                    let jsonParsed = JSON.parse(json);
                    this.bookingName = jsonParsed.name;
                    this.weight = jsonParsed.weight;
                    this.fromCity = jsonParsed.fromCity;
                    this.fromAddress = jsonParsed.fromAddress;
                    this.fromPostalCode = jsonParsed.fromPostalCode;
                    this.toCity = jsonParsed.toCity;
                    this.toAddress = jsonParsed.toAddress;
                    this.toPostalCode = jsonParsed.toPostalCode;
                    this.details = jsonParsed.aditionalDetails;
                    if(jsonParsed.status == 0){
                        this.status = 'In auction';
                        this.cost = '-'
                    }
                    if(jsonParsed.status == 1){
                        this.status = 'On route';
                        this.cost = '-'
                    }
                    if(jsonParsed.status == 3){
                        this.status = 'Delivered';
                        this.cost = '-'
                    }

                    this.setupMapHandling(this.mapService, 0, jsonParsed.pickupGeo,jsonParsed.deliveryGeo);
                },
                error => this.router.navigateByUrl('/404')
            );
            this.backendService.getBidList(Cookie.get('sessionId'), auctionId).subscribe(
                data => {
                   if(data.length > 0){
                       this.cost = data[data.length - 1].price + " $";
                   }
                },            
                error => console.error('ERROR: BackendService - getBidList()')
            );
        });
        
    }
  
    getPosition(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
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

      navigator.geolocation.getCurrentPosition(this.getPosition);

      setTimeout(() => { let feature3 = new ol.Feature({
          type: 'place',
          geometry: new ol.geom.Point([longitude, latitude])
      });
          feature3.setStyle(this.styles.icon2);
          this.vectorSpace.addFeature(feature3); }, 3000);
  }
  ngOnInit() {
  }

  onImageClick(){
    this.photoViewer.setImage('assets/package.jpg');
    this.photoViewer.toggleVisible(true);
  }
}
