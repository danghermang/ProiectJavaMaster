import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as ol from 'openlayers';
import { BackendApiService } from '../../services/backend-api.service';
import { MapService } from '../../services/map.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';

@Component({
  selector: 'yuso-createauction',
  templateUrl: './createauction.component.html',
  styleUrls: ['./createauction.component.css']
})
export class CreateauctionComponent implements OnInit {
  success_dialog: boolean = false;
  auctionName: string = '';
  endDate: string = '';
  fromCity: string = '';
  fromAddress: string = '';
  fromPostalCode: string = '';
  toCity: string = '';
  toAddress: string = '';
  toPostalCode: string = '';
  pickupDate: string = '';
  dropDate: string = '';
  details: string = '';
  weight: string= '';
  distance: any;
  clicks = 0;
  coordOne : any;
  coordTwo : any

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  constructor(private backendService: BackendApiService,
    private mapService: MapService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });
  }

createMap() {
    this.setupMapHandling(this.mapService, this.clicks, this.coordOne, this.coordTwo, this.distance, this);
}
showAlert(message: string) {
    const modalRef = this.modalService.open(AlertPopupComponent);
    modalRef.componentInstance.text = message;
}

  onCreateAuctionClick() {
    if(this.auctionName == '' || this.endDate == '' || this.fromCity == '' || this.fromAddress == '' ||
        this.fromPostalCode == '' || this.fromCity == '' || this.toCity == '' || this.toAddress == '' ||
        this.toPostalCode == '' || this.pickupDate == '' || this.dropDate == '' || this.details == '') {
        this.showAlert('All fields must be completed!');
        return;
    }

    if(this.coordOne == null || this.coordTwo == null){
        this.showAlert('You must select the pickup and drop-off points on the map!');
        return;
    }
    
    this.backendService.createJob(Cookie.get('sessionId'), this.auctionName, this.fromCity, this.fromAddress,
    this.fromPostalCode, this.toCity, this.toAddress, this.toPostalCode, this.endDate, this.pickupDate, this.dropDate,
    this.details, Number(this.weight), JSON.stringify(this.coordOne), JSON.stringify(this.coordTwo), this.distance).subscribe(
        res => {
            if(res.status == 201) {
                this.success_dialog = true;
            }
            else {
                this.showAlert('Ati introdus date invalide! Va rugam sa corectati formularul!');
            }
        },
        error => console.error('ERROR: BackendService - createJob()')
    );
  }
  setupMapHandling(mapService: MapService, clicky, coordOne, coordTwo, distance, theClass){
    // Map creation
    let vectorSpace = new ol.source.Vector();
    let vectorLayer = new ol.layer.Vector({ source: vectorSpace });
    let styles = {
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
        })
    };

    let map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        target: 'map',
        view: new ol.View({
            center: [27.574707, 47.173594],
            zoom: 16,
            projection: 'EPSG:4326'
        }),
        controls: []
    });

    if(clicky == 0){
        this.coordOne = coordOne;
    }
    else if(clicky == 1){
        this.coordTwo = coordTwo;
    }

    // Map event handling
    map.on('click', function(evt){
        let coord = (evt as any)
        mapService.getNearest(coord.coordinate).subscribe(
            data => { let jsonParsed = JSON.parse(JSON.stringify(data));
                if(clicky >= 2)
                    return;

                if(clicky == 0){
                    coordOne = jsonParsed.waypoints[0].location;
                    theClass.coordOne = coordOne;
                }
                else if(clicky == 1){
                    coordTwo = jsonParsed.waypoints[0].location;
                    theClass.coordTwo = coordTwo;
                }

                // Create an icon at location of coordinates
                let feature = new ol.Feature({
                    type: 'place',
                    geometry: new ol.geom.Point(jsonParsed.waypoints[0].location)
                });
                feature.setStyle(styles.icon);
                vectorSpace.addFeature(feature);
                clicky++;

                if(clicky == 2){
                    // Create the route
                    mapService.getRoute(coordOne, coordTwo).subscribe(
                        data => {
                            let jsonParsed = JSON.parse(JSON.stringify(data));
                            let route = new ol.format.Polyline({ factor: 1e5 }).readGeometry(jsonParsed.routes[0].geometry);
                            let feature = new ol.Feature({
                                type: 'route',
                                geometry: route
                            });
                            feature.setStyle(styles.route);
                            vectorSpace.addFeature(feature);
                            distance = jsonParsed.routes[jsonParsed.routes.length - 1].distance;
                            theClass.distance = distance;
                        },
                        error => console.log('ERROR: MapService - getRoute()')
                    );
                }
            },
            error => console.log('ERROR: MapService - getNearest()')
        );
    });
  }
}
