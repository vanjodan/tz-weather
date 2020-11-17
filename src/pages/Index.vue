<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md">
      <q-input
        bottom-slots
        v-model="search"
        @keyup.enter="displayWeatherBySearch"
        @keyup="badRequest = false"
        placeholder="Enter City"
      >
        <template v-slot:before>
          <q-icon name="location_city" />
        </template>

        <template v-if="badRequest" v-slot:hint>
          <div style="color: red">City not found</div>
        </template>

        <template v-slot:append>
          <q-btn
            @click="displayWeatherBySearch"
            round
            dense
            flat
            icon="search"
          />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData">
      <div class="flex raw">
        <div class="block-left text-center">
          <div class="text-h5 q-pa-lg">
            <div class="text-h4">Nearest forecast</div>
            <q-list>
              <q-item
                v-for="chosenDay in weatherData.forecast.forecastday"
                :key="chosenDay.id"
                clickable
                v-ripple
                @click="displayDetailedForecast(chosenDay)"
              >
                <q-item-section>
                  {{ chosenDay.date.slice(5) }},
                  {{
                    Math.round(chosenDay.day.avgtemp_c)
                  }}&deg;C</q-item-section
                >
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="block-right text-black text-center">
          <div class="text-h2 text-weight-light">
            {{ weatherData.location.name }}<br />({{
              weatherData.location.country
            }})
          </div>

          <div class="text-h5 text-weight-light">
            {{ dayForecast.day.condition.text }}
          </div>

          <div class="text-h2 text-weight-thin q-my-lg">
            {{ Math.round(dayForecast.day.avgtemp_c) }}&deg;C
          </div>

          <div class="text-center">
            <img :src="`https://${dayForecast.day.condition.icon}`" />
          </div>

          <div class="text-h5 text-weight-light">{{ dayForecast.date }}</div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="col text-h1 column text-center text-black">
        Weather<br />
        Forecast
      </div>
    </template>

    <div class="col skyline"></div>
  </q-page>
</template>

<script>
import WeatherApiService from "../services/WeatherApiService.js";
import EnvironmentConstants from "../constants/EnvironmentConstants.js";
import WeatherConstants from "../constants/WeatherConstants.js";

export default {
  name: "PageIndex",

  data() {
    return {
      search: "",
      weatherData: null,
      dayForecast: null,
      apiUrl: EnvironmentConstants.weatherApiUrl,
      apiKey: EnvironmentConstants.apiKey,
      daysCount: WeatherConstants.defaultWeatherDaysCountToShow,
      badRequest: false,
    };
  },
  methods: {
    displayWeatherBySearch() {
      new WeatherApiService()
        .getWeatherRequest(this.search)
        .then((response) => {
          this.weatherData = response.data;

          this.dayForecast = this.weatherData.forecast.forecastday[0];
        })
        .catch((err) => {
          this.badRequest = true;
        })
        .finally(() => (this.search = ""));
    },

    displayDetailedForecast(chosenDay) {
      this.dayForecast = chosenDay;
    },
  },
};
</script>

<style lang="sass">
.q-page
  background: linear-gradient(to bottom, #CFDEF3, #E0EAFC)

.skyline
  flex: 0 0 220px
  background: url(../assets/architecture.png)
  background-size: contain
  background-position: center bottom

.block-left
  width: 30%; height: 100%; overflow:auto
.block-right
  width: 65%; height: 100%; overflow:auto
</style>
