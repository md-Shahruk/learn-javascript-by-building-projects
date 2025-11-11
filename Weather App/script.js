
import { API_Keys } from "./secret.js";

class WeatherApp{
    constructor(){
        this.cityInput = document.getElementById('city-input');
        this.searchBtn =  document.getElementById('search-btn');
        this.weatherDesc =  document.getElementById('weather-description');
        this.cityName = document.getElementById('city-name');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('wind-speed');
        this.temperature =  document.getElementById('temp');
        this.weatherInfo = document.getElementById('weather-info');
        this.loadingSpin = document.getElementById('loading');


        this.apiKey = API_Keys.weather_api;
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


        this.init();
    } // end constructor
    
     init(){
        this.searchBtn.addEventListener('click',()=> this.searhWeather());
        
     }

    async searhWeather(){
        const city =  this.cityInput.value.trim();
        this.cityInput.value = '';
        if(!city){
            alert('please enter city');
            return;
        }
        
         this.loadingSpin.style.display = 'block';
         this.weatherInfo.style.display = 'none';
        try{
            const response = await fetch(`${this.baseUrl}${city}&appid=${this.apiKey}`);
            const data = await response.json();
             // console.log(data);
            if(response.ok){
               
                setTimeout(()=>{
                    this.displayWeatherData(data);
                    this.loadingSpin.style.display = 'none';
                },2000);
                
            }else{
                alert('city not found');
            }


        }catch(error){
            console.error('error fetching weather', error);
            alert('error fetching weather data');
        }
     }


     displayWeatherData(data){
        this.cityName.textContent = data.name;
        this.temperature.textContent = `${Math.round(data.main.temp)}°C`
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} km/h`;
        this.weatherDesc.textContent = `${data.weather[0].description}`;

        this.weatherInfo.style.display = 'block';
     }


}

document.addEventListener('DOMContentLoaded',()=>{
    new WeatherApp();
});