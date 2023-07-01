import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherServiceService } from './services/weather-service.service';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { forecastList, forecastModel } from './models/forecastModel';
import { weatherModel } from './models/weatherModel';
import { rapidModel } from './models/rapidModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';
  searchKey!:string

  geoData!:Observable<any>
  searchObs$!: Observable<any>

  weatherData!: weatherModel;
  forecastData!: forecastList[];
  forecastWeek!: forecastList[];
  availableForecast!:number

  DateToday = new Date().toDateString();
  curTime = new Date().toLocaleTimeString().slice(0,5)
  input = new Subject<string>()

  constructor( private service:WeatherServiceService , private datePipe: DatePipe ){
    this.input.pipe(
      debounceTime(400),
      distinctUntilChanged()).subscribe(val=>{
      this.searchResult(val)
    })
  }

  searchResult(key: string){
    console.log(key);
    this.geoData = this.service.getPlaces(key)
  }

  getResult(latitude: number, longitude: number) {
    this.geoData = new Observable<rapidModel[]>
    this.service.getWeatherData(latitude,longitude).subscribe((val: weatherModel) => {
      this.weatherData = val
      this.searchKey=this.weatherData.name
      console.log(this.weatherData.name);

    });
    this.service.getForecastData(latitude, longitude).subscribe((val: forecastModel) => {
      this.forecastData = val.list.filter((val) => {
        let a = this.datePipe.transform(val.dt_txt, 'yyyy/MM/dd')
        let b = this.datePipe.transform(this.DateToday, 'yyyy/MM/dd')
        return a == b
      })
      this.availableForecast=this.forecastData.length
      this.forecastWeek = val.list.filter((val) => {
        let a = this.datePipe.transform(val.dt_txt, 'hh:mm a');
        let b = '12:00 AM'
        return a == b
      })
    })
  }


  getCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( (position) =>{
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          this.getResult(lat, lon);
          }, function errorCallback(error) {
            alert(error)
        });
    }
  }

}
