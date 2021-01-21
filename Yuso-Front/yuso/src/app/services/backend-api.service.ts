import { Injectable } from '@angular/core';
import { Http, Headers ,URLSearchParams} from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  apiAddress = 'http://localhost:57829';
  authenticationAddress = 'http://localhost:8080/AuthenticationService/data/auth';
  profileAddress = 'http://localhost:8081/ProfileService/data';
  avatarAddress = 'http://localhost:8082/AvatarService/data';
  auctionAddress = 'http://localhost:8083/AuctionService/data';
  bidAddress = 'http://localhost:8084/BidService/data';

  constructor(private http: Http) { }

  login(email: string, password: string) {
    const headers = new Headers();
    const json = JSON.stringify({ Email: email, Password: password });

    headers.append('Content-Type', 'application/json');
    return this.http.post(this.authenticationAddress + '/login', json, { headers: headers, withCredentials: true }).pipe(map(res => res));
  }

  register(email: string, password: string, firstName: string, lastName: string, address: string,
    city: string, county: string, postalCode: string, phoneNumber: string) {
    const headers = new Headers();
    const json = JSON.stringify({
      Email: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      City:city,
      County:county,
      PostalCode:postalCode,
      Phone: phoneNumber });

    headers.append('Content-Type', 'application/json');
    return this.http.post(this.authenticationAddress + '/register', json, { headers: headers, withCredentials: true }).pipe(map(res => res));
  }

  updateProfileInfo(
    token: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    county: string,
    postalCode: string, phone: string) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token)
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = JSON.stringify(
      { firstName: firstName, lastName: lastName, address: address, city: city, county: county, postalCode: postalCode, phone: phone });

    return this.http.post(
      this.profileAddress + '/api/Profile/' + id,
      json,
      { headers: headers, withCredentials: true }).pipe(map(res => res));
  }
  getUserIdFromToken(token: string) {
    let splitted = token.split('.')[1];
    let decodedJwtJsonData = JSON.parse(atob(splitted)).sub;
    return decodedJwtJsonData;
  }
  getEmailFromToken(token: string) {
    let splitted = token.split('.');
    return JSON.parse(atob(splitted[1])).email;
  }

  getUserInfoFromId(token: string, id: string) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.profileAddress + '/api/Profile/' + id,
      { headers: headers, withCredentials: true }).pipe(map(res => res));
  }

  getAvatarData(token: string, userId: string) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(
      this.avatarAddress + '/api/Avatar/' + userId,
      { headers: headers, withCredentials: true }).pipe(map(res => res.json()));
  }
  setAvatar(token: string, data: string) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token)

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = { image: data };
    return this.http.post(this.avatarAddress + '/api/Avatar/' + id,
      json,
      { headers: headers, withCredentials: true }).pipe(map(res => res));
  }

  changePassword(token: string, oldPassword: string, newPassword: string) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });

    return this.http.post(
      this.authenticationAddress + '/password/' + id,
      json,
      { headers: headers, withCredentials: true }).pipe(map(res => res));
  }
  createJob(token: string, name: string, fromCity: string, fromAddress: string, fromPostalCode: string, toCity: string,
    toAddress: string, toPostalCode: string, endDate: string, pickupOneDate: string, deliverOnDate: string,
    detalis: string, weight: number, pickupGeo: string, deliveryGeo: string, distance: number) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = { name: name,
      fromCity: fromCity,
      fromAddress: fromAddress,
      fromPostalCode: fromPostalCode,
      toCity: toCity,
      toAddress: toAddress,
      toPostalCode: toPostalCode,
      endDate: endDate,
      pickupOnDate: pickupOneDate,
      deliverOnDate: deliverOnDate,
      aditionalDetails: detalis,
      weight: +weight,
      pickupGeo: pickupGeo,
      deliveryGeo: deliveryGeo,
      Distance: +distance
    };

    return this.http.post(this.auctionAddress + '/api/Auction/' + id, json, { headers: headers, withCredentials: true}).pipe(map(res => res));
  }

  getMyAuction(token: string) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(
      this.auctionAddress + '/api/Auction/User/' + id,
      { headers: headers, withCredentials: true }).pipe(map(res => res.json()));
  }

  getJobDescription(token: string, jobId: string){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.auctionAddress + '/api/Auction/' + jobId, { headers: headers, withCredentials: true }).pipe(map(res => res.json()));
  }

  getJobList(token: string, searchFilter: string, fromCityFilter: string, toCityFilter: string) {
    let headers = new Headers();
    let params = new URLSearchParams();
    if(searchFilter != "")
    {params.append("search", searchFilter)};
    if(toCityFilter != "")
    {params.append("toCity", toCityFilter)};
    if(fromCityFilter != "")
    {params.append("fromCity", fromCityFilter)};


    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.auctionAddress + '/api/Auction/filter',
        { headers: headers, withCredentials: true , search: params}).pipe(map(res => res.json()));
  }

  getPromotedList(token: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.auctionAddress + '/api/Auction/promoted', { headers: headers, withCredentials: true}).pipe(map(res => res.json()));
  }

  getBidList(token: string, auctionId: number){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(this.bidAddress + '/api/Bid/' + auctionId, { headers: headers, withCredentials: true}).pipe(map(res => res.json()));
  }

  addBid(token: string, jobId: string, price: number) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = { auctionId: jobId, price: +price };
    return this.http.post(this.bidAddress + '/api/Bid/' + id, json, { headers: headers, withCredentials: true}).pipe(map(res => res));
  }
  setWinner(token: string, jobId: string, winnerId: string) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let json = { WinnerId: winnerId };
    return this.http.post(this.auctionAddress + '/api/Auction/winner/' + jobId, json, { headers: headers, withCredentials: true}).pipe(map(res => res));
  }
  getStats(token: string){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(this.apiAddress + 'stats', { headers: headers, withCredentials: true}).pipe(map(res => res.json()));
  }
  getJobsWon(token: string, filter: string) {
    let headers = new Headers();
    let id = this.getUserIdFromToken(token);
    let params = new URLSearchParams();
    if(filter != "")
    {params.append("status", filter)};

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(this.auctionAddress + '/api/Auction/win/' + id, { headers: headers, withCredentials: true, search: params}).
    pipe(map(res => res.json()));
}
}
