import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {device} from '../models/device';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from '../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceService  {

  constructor(private http: Http,
  ) { }


  private log(message: string) {
   console.log(message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // get deivce using localhost:3000/api/user
  getDevice(){

  return  this.http.get('/api/api/device').pipe(
    map(d=>d.json()),
    tap(devices=>console.log("get  successful data")),
    catchError(this.handleError('getHeroes', []))
  ).subscribe(devices=>console.log(devices));
  }


  // post device 
  postDevice(_device:device) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 
  return  this.http.post('/api/api/device',_device,options).pipe(r=>r).subscribe(d=>console.log(d));
    
  }
}
