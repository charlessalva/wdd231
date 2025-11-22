const apiKey = "321d881d69ae9d6f1df37a15d6465060";
const city = "Pasig";

// Elements
const tempEl = document.querySelector("#current-temp");
const descEl = document.querySelector("#weather-desc");
const highEl = document.querySelector("#high-temp");
const lowEl = document.querySelector("#low-temp");
const humidityEl = document.querySelector("#humidity");
const sunriseEl = document.querySelector("#sunrise");
const sunsetEl = document.querySelector("#sunset");
const iconEl = document.querySelector("#weather-icon");

// Forecast elements
const day1Name = document.querySelector("#day1-name");
const day2Name = document.querySelector("#day2-name");
const day3Name = document.querySelector("#day3-name");

const day1Temp = document.querySelector("#day1-temp");
const day2Temp = document.querySelector("#day2-temp");
const day3Temp = document.querySelector("#day3-temp");

const day1Icon = document.querySelector("#day1-icon");
const day2Icon = document.querySelector("#day2-icon");
const day3Icon = document.querySelector("#day3-icon");

function formatTime(ts) {
    return new Date(ts * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

async function loadCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    tempEl.textContent = Math.round(data.main.temp);
    descEl.textContent = data.weather[0].description;
    highEl.textContent = Math.round(data.main.temp_max);
    lowEl.textContent = Math.round(data.main.temp_min);
    humidityEl.textContent = data.main.humidity;

    sunriseEl.textContent = formatTime(data.sys.sunrise);
    sunsetEl.textContent = formatTime(data.sys.sunset);

    const icon = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

async function loadForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    const midday = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Day 1
    day1Name.textContent = new Date(midday[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    day1Temp.textContent = Math.round(midday[0].main.temp);
    day1Icon.src = `https://openweathermap.org/img/wn/${midday[0].weather[0].icon}.png`;

    // Day 2
    day2Name.textContent = new Date(midday[1].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    day2Temp.textContent = Math.round(midday[1].main.temp);
    day2Icon.src = `https://openweathermap.org/img/wn/${midday[1].weather[0].icon}.png`;

    // Day 3
    day3Name.textContent = new Date(midday[2].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    day3Temp.textContent = Math.round(midday[2].main.temp);
    day3Icon.src = `https://openweathermap.org/img/wn/${midday[2].weather[0].icon}.png`;
}

loadCurrentWeather();
loadForecast();
