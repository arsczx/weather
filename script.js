let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`

let $currentimg = document.querySelector('.icon')
let $description = document.querySelector('.description')
let $feels = document.querySelector('.feels')

let $hourly = document.querySelector('.hourly')
let $daily = document.querySelector('.daily')

let $humidity = document.querySelector('.humidity__txt')
let $dew_point = document.querySelector('.dew_point')

let $sunset__txt = document.querySelector('.sunset__txt')
let $sunset__txt2 = document.querySelector('.sunset__txt2')

let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        let current = data.current
        let hourly = data.hourly
        let daily = data.daily

        $feels.textContent = Math.trunc(current.temp) + "°"
        $description.textContent = current.weather[0].description
        $humidity.textContent = current.humidity + "%"
        $dew_point.textContent = "Точка росы сейчас " + Math.trunc(current.dew_point) + "°"

        $sunset__txt.textContent = current.sunset
        $sunset__txt2.textContent = "Восход: " + current.sunrise

        hourly.forEach(function(elem) {
            $hourly.insertAdjacentHTML('beforeend', `
                <div class="hour">
                    <p>${new Date().getHours()}
                    <p class="hour__txt">${Math.trunc(elem.temp) + "°"}</p>
                    <p>${elem.weather[0].description}</p>
                </div>
            `)
        });

        daily.forEach(function(elem, index) {
            $daily.insertAdjacentHTML('beforeend', `
                <div class="day">
                    <p class="day__title">${index == 0 ? "Сегодня" : days[new Date().getDay() + index]}</p>
                    <p>${Math.trunc(elem.temp.min) + "°"}</p>
                    <p>${Math.trunc(elem.temp.max) + "°"}</p>
                </div>
            `)
        })

    })

   