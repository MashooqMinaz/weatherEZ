import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Datum, rapidModel } from '../models/rapidModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor( private http: HttpClient) { }

  RAPID_BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'
  WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5'
  WEATHER_API_KEY = '700de1c9e03a9ed1a114951442b28e6d'
  // d1852c1a3fmshd846fd913e2f964p13fb1djsn3409f1c6de14

  getPlaces(rapidInput:string):Observable<Datum[]>{
    return this.http.get<rapidModel>(`${this.RAPID_BASE_URL}/cities?minPopulation=10000&namePrefix=${rapidInput}`,{
      headers: {
        'X-RapidAPI-Key': '03defdbdf7msh69a896cba735f39p18eb49jsn527fff47540e',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    }).pipe(map(res=>{
      return res.data
    }))
  }

  getWeatherData(longitude:number, latitude:number):Observable<any>{
    return this.http.get(`${this.WEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.WEATHER_API_KEY}&units=metric`)
  }

  getForecastData(longitude:number, latitude:number):Observable<any>{
    return this.http.get(`${this.WEATHER_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${this.WEATHER_API_KEY}&units=metric`)
  }
}
