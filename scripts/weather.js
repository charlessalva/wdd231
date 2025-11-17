// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Declare URL with coordinates of Trier (49.75° N, 6.64° E) and the API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=321d881d69ae9d6f1df37a15d6465060';

// Asynchronous function to fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the entire data for testing
            displayResults(data); // Display the results after successful fetch
        } else {
            throw Error(await response.text()); // If response is not OK, throw an error
        }
    } catch (error) {
        console.log(error); // Log any errors to the console
    }
}

// Function to display the results on the web page
function displayResults(data) {
    // Insert temperature (e.g., 59°F)
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    // Set the icon source (based on weather icon code from OpenWeatherMap)
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc); // Set the icon image source

    // Set the alt text for the weather icon (description of the weather)
    weatherIcon.setAttribute('alt', data.weather[0].description);

    // Display the weather description
    const desc = data.weather[0].description;
    captionDesc.textContent = `${desc}`;
}

// Call the function to fetch and display weather data
apiFetch();
