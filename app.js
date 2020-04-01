window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');

    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";

        const api = `${proxy}https://api.darksky.net/forecast/bf5fbe5375945d087dcc537bca0ea6f8/${lat},${long}`;
        
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //pulls out all the data from currently

                //set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Formula for converting Fahrenheit and Celsius
                let celsius =  (5 * (temperature - 32)) /9;
               
                //set icon
                setIcons(icon, document.querySelector('.icon')
                );

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "wheat"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});