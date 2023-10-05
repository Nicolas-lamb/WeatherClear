//Variaveis


const apiKey= "b517aa00472fe4e81fa522312279121a";
const apiCountry= "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-button");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#flag");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

//Funções
const getWeatherApi = async(city) =>{
    const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const  res = await fetch(apiWeatherURL);
    const data = await res.json();
    if(data.main.temp<20){
        document.body.style.background= 'linear-gradient(180deg, #181774 0%, #435bdf 100%)';
        
    }else if(data.main.temp>20 && data.main.temp<30){
        document.body.style.background= 'linear-gradient(180deg, #fa991b 0%, #eaec5d 100%)'
        
    }
    else{
        document.body.style.background= 'linear-gradient(180deg, #eb2929 0%, #f37979 100%)'
        
    }
    return data;
}
const showWeatherData = async(city) =>{
    const data = await getWeatherApi(city);

    cityElement.innerText = data.name;
    tempElement.innerText= parseInt(data.main.temp);
    descElement.innerText= data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    humidityElement.innerText= `${data.main.humidity}%`;
    windElement.innerText= `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
}

//Eventos

searchButton.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})

