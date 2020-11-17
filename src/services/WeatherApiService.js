import axios from "axios";
import WeatherConstants from "../constants/WeatherConstants.js";
import EnvironmentConstants from "../constants/EnvironmentConstants.js";

export default class WeatherApiService {
  getWeatherRequest(search) {
    return axios(
      `${EnvironmentConstants.weatherApiUrl}?q="${search}"&days=${WeatherConstants.defaultWeatherDaysCountToShow}&key=${EnvironmentConstants.apiKey}`
    );
  }
}
