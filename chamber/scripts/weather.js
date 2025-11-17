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
const todayTemp = document.querySelector("#today-temp");
const wedTemp = document.querySelector("#wed-temp");
const thuTemp = document.querySelector("#thu-temp");

const todayIcon = document.querySelector("#today-icon");
const wedIcon = document.querySelector("#wed-icon");
const thuIcon = document.querySelector("#thu-icon");

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
    todayTemp.textContent = Math.round(midday[0].main.temp);
    todayIcon.src = `https://openweathermap.org/img/wn/${midday[0].weather[0].icon}.png`;

    // Day 2
    wedTemp.textContent = Math.round(midday[1].main.temp);
    wedIcon.src = `https://openweathermap.org/img/wn/${midday[1].weather[0].icon}.png`;

    // Day 3
    thuTemp.textContent = Math.round(midday[2].main.temp);
    thuIcon.src = `https://openweathermap.org/img/wn/${midday[2].weather[0].icon}.png`;
}

loadCurrentWeather();
loadForecast();
