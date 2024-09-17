async function fetchWeatherData(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log(lat, lon);

    const url = `https://api.weatherstack.com/current?access_key=5da8bd3ed46ee5d56bec949700505da3&query=${lat},${lon}`;
    const options = {
        method: "GET",
    };

    
        const response = await fetch(url, options);
        console.log(response);

        const result = await response.json();
        if (result == null || result.error) {
            throw new Error(result.error.info || 'Unknown error');
        }
        console.log(result);
        setData(result);
    
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            var position = {
                coords: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                }
            };
            fetchWeatherData(position);
        }, (error) => {
            console.error('Geolocation error:', error);
            alert('Failed to get location. Please enable location services.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

{
    const refresh = ()=>{
        location.reload()
    }
    document.querySelector(".refresh").addEventListener("click",refresh);
    document.querySelector(".refresh").addEventListener("dblclick",refresh);
}
getLocation();

function setData(data) {
    document.querySelector("main").style = "padding: 90px 0 20px; visibility: visible;";

    const feel = data.current.feelslike;
    const humidity = data.current.humidity;
    const wind = data.current.wind_speed;
    const precipitation = data.current.precip;
    const uvIndex = data.current.uv_index;
    const visibility = data.current.visibility;
    const pressure = data.current.pressure;
    const temperature = data.current.temperature;
    const weatherDescription = data.current.weather_descriptions[0];
    const weatherIcon = data.current.weather_icons[0];
    const windDir = data.current.wind_dir;

    const locationName = data.location.name;
    const locationRegion = data.location.region;
    const locationCountry = data.location.country;
    const lat = data.location.lat;
    const lon = data.location.lon;

    // Set data weather
    document.getElementById("feels").innerText = feel + "°C";
    document.getElementById("description").innerText = weatherDescription;
    document.getElementById("temp").innerText = temperature + "°C";
    document.querySelector(".weather-icon").src = weatherIcon;

    document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
    document.getElementById("wind-speed").innerText = `Speed: ${wind} km/hr`;
    document.getElementById("wind-dir").innerText = `Dir: ${windDir}`;
    document.getElementById("uv-index").innerText = `UV Index: ${uvIndex}`;
    document.getElementById("precip").innerText = `Precipitation: ${precipitation}%`;
    document.getElementById("pressure").innerText = `Pressure: ${pressure} hPa`;
    document.getElementById("visibility").innerText = `Visibility: ${visibility} km`;

    document.getElementById("city").innerText = locationName;
    document.getElementById("state").innerText = locationRegion;
    document.getElementById("country").innerText = locationCountry;
    document.getElementById("coords").innerText = `Lat: ${lat}, Lon: ${lon}`;
}

function onSearch() {
    let slat = document.querySelector("#s_lat");
    let slon = document.querySelector("#s_lon");

    console.log(slon.value, slat.value);
    if (slon.value === "" || slat.value === "") {
        alert("Please enter both Latitude and Longitude.");
        return;
    }

    var position = {
        coords: {
            latitude: parseFloat(slat.value),
            longitude: parseFloat(slon.value),
        }
    };

    fetchWeatherData(position);
}
