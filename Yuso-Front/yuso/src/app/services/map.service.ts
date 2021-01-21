import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: Http) {}

    getNearest(coords){
        return this.http.get('http://127.0.0.1:5000/nearest/v1/driving/' + coords.join()).pipe(map(res => res.json()));
    }

    getRoute(coord1, coord2){
        return this.http.get('http://127.0.0.1:5000/route/v1/driving/' + 
        coord1.join() + ';' + coord2.join()).pipe(map(res => res.json()));
    }
}
