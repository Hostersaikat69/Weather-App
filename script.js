const apiKey = "ca16114e6af874e7630339d6809927d1"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search img")
const mainApp = document.querySelector(".app")

const weatherDiv = document.querySelector(".weather")
const detailsDiv = document.querySelector(".details")
const weatherIcon = document.querySelector(".weather-icon")

let divs = [weatherDiv, detailsDiv]

function reloadAnime() {
    checkWeather(searchBox.value)
        mainApp.classList.add("expanded")

        setTimeout(() => {
            divs.forEach((e) => {
                e.style.opacity = "1"
            })
        }, 650)

    weatherIcon.style.animation = "none"
    void weatherIcon.offsetWidth;
    weatherIcon.style.animation = "reloadAnime 0.8s ease"

    divs.forEach((e) => {
        e.style.display = "flex"
    })
}

searchBtn.addEventListener("click", () => {
    if(!searchBox.value)  {
        alert("Please enter a place!")
    } else {
        reloadAnime()   
    }
})

async function checkWeather(cityname) {
    const response = await fetch(apiUrl + cityname + `&appid=${apiKey}`)
    let data = await response.json()

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == 'Clouds') weatherIcon.src = "images/clouds.png"
    else if(data.weather[0].main == 'Clear') weatherIcon.src = "images/clear.png"
    else if(data.weather[0].main == 'Rain') weatherIcon.src = "images/rain.png"
    else if(data.weather[0].main == 'Drizzle') weatherIcon.src = "images/drizzle.png"
    else if(data.weather[0].main == 'Snow') weatherIcon.src = "images/snow.png"
    else weatherIcon.src = "images/mist.png"
}

checkWeather()
