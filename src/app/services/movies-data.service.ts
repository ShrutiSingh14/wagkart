import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
 url = "http://localhost:5001/api/movies";
  constructor(private http:HttpClient) { }
  movies (){
    return this.http.get(this.url)
  }
  //moviesdelete  (){
    //return this.http.delete(this.url)
  //}
  
}
