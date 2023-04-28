export function setupCounter(element) {
  const BtnWeather = document.getElementById("weatheBtn");
  BtnWeather.addEventListener("click", () => {
    const body = document.querySelector(".body");
    body.classList = "bodyNew";

    const InpWeather = document.getElementById("WeatherInput").value;
    const City = InpWeather;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${City}&units=metric&lang=ua&appid=42715e4a415eeaef3e24fb242ad4009e`;

    console.log("City: ", City);

    async function weather(URL) {
      const response = await fetch(URL);
      const data = await response.json();
      console.log("data: ", data);

      //Валідація
      if (data.cod === "404") {
        console.log("Помилка");
        const p = document.getElementById("date");
        p.innerHTML = "Міста не існує";
      }
      if (data.cod === "400") {
        console.log("Помилка");
        const p = document.getElementById("date");
        p.innerHTML = "Введіть місто";
      }

      // отримуємо дані про погоду на поточний момент
      const currentWeather = data.list[0];
      const currentTemp = currentWeather.main.temp.toFixed();
      const currentFeelsLike = currentWeather.main.feels_like.toFixed();
      const currentPressure = currentWeather.main.pressure;
      const currentHumidity = currentWeather.main.humidity;
      const currentIconCode = currentWeather.weather[0].icon;
      const currentIconUrl = `http://openweathermap.org/img/w/${currentIconCode}.png`;
      const currentWeatherDescription = currentWeather.weather[0].description;

      const cityNameDes = document.querySelector(".cityName");
      cityNameDes.innerHTML = `${data.city.name}<p>${data.city.country}</p>
    <img src="${currentIconUrl}" alt="${currentWeatherDescription}">
    <p>Температура: ${currentTemp}℃</p>
    <p>Відчувається як: ${currentFeelsLike}℃</p>
    <p>Тиск: ${currentPressure} hPa</p>
    <p>Вологість: ${currentHumidity}%</p>
  `;
      //Виводимо дані про погоду на desktop
      const cityDesk = document.getElementById("cityDesk");

      const weatherByDay = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .reduce((acc, item) => {
          const date = new Date(item.dt_txt);
          const day = date.toLocaleDateString("uk-UA", { weekday: "long" });
          const temp = item.main.temp.toFixed();
          const feels_like = item.main.feels_like.toFixed();
          const pressure = item.main.pressure;
          const humidity = item.main.humidity;
          const iconCode = item.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

          if (!acc[day]) {
            acc[day] = {
              temp: `${temp}℃`,
              feels_like: `${feels_like}℃`,
              pressure: `${pressure} hPa`,
              humidity: `${humidity}%`,
              icon: `<img src="${iconUrl}" alt="${item.weather[0].description}"/>`,
              minTemp: temp, // додали властивість minTemp
              maxTemp: temp, // додали властивість maxTemp
            };
          } else {
            // додали обробку властивостей minTemp та maxTemp
            if (temp < acc[day].minTemp) {
              acc[day].minTemp = temp;
            }
            if (temp > acc[day].maxTemp) {
              acc[day].maxTemp = temp;
            }
          }

          return acc;
        }, {});

      const sortedWeatherByDay = Object.entries(weatherByDay)
        .sort((a, b) => {
          const days = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
          return days.indexOf(a[0]) - days.indexOf(b[0]);
        })
        .reduce((acc, [day, data]) => {
          acc[day] = data;
          return acc;
        }, {});

      Object.entries(weatherByDay).forEach(([day, data]) => {
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        cityDesk.appendChild(ul);
        ul.appendChild(li);

        li.innerHTML = `${day} ${data.icon} <li>Температура: ${data.temp}</li> <li>Відчувається як: ${data.feels_like}</li> <li>Тиск: ${data.pressure}</li> <li>Вологість: ${data.humidity}</li> <li>Мінімальна температура: ${data.minTemp}℃</li> <li>Максимальна температура: ${data.maxTemp}℃</li>`;
      });
    }

    weather(URL);
  });
  //Функція, яка виводить час на головний екран
  function time() {
    const dateDes = document.getElementById("time");
    const date = new Date();
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());
    const time = hours + ":" + minutes + ":" + seconds;
    dateDes.innerHTML = time;
  }

  function addLeadingZero(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  setInterval(time, 1000);
  //Основна дата на головному екрані
  let date = new Date();
  const dateDesktop = document.getElementById("date");
  dateDesktop.innerHTML = date;
}
