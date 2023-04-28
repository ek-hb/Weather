import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
<div class="Item">
    <div class="wrapper">
    <p id="time"></p>
    <p id="date"></p>
    </div>
    <div class="weather">
    <h1 class="cityName"</h1>
      <label for="WeatherInput"></label>
      <input type="text" placeholder="Вкажіть місто" id="WeatherInput" />
      <button id="weatheBtn">Показати погоду</button>
    </div>
    </div>
     <div id="cityDesk"></div>
`;

setupCounter(document.querySelector("#counter"));
