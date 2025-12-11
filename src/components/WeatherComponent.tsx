import { useEffect } from "react"
import { useWeather } from "../hooks/useWeather"
import styles from "./WeatherComponent.module.css"
import coldBG from "../assets/weather-background/cold.webp"
import mildBG from "../assets/weather-background/mild.webp"
import hotBG from "../assets/weather-background/hot.webp"

const cities = [
  { name: "Almada", coords: "38.680,-9.155" },
  { name: "Porto", coords: "41.1579,-8.6291" },
  { name: "São Paulo - BR", coords: "-23.5505,-46.6333" },
] as const
function getBackground(temp: number) {
  if (temp <= 10) return coldBG
  if (temp >= 23) return hotBG
  return mildBG
}
export default function WeatherComponent() {
  const { weather, loading, loadWeather } = useWeather()
  const defaultCity = cities[0]

  useEffect(() => {
    loadWeather(defaultCity.coords, defaultCity.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${
          weather ? getBackground(weather.temperature) : ""
        })`,
      }}
    >
      <div className={`container ${styles.panel}`}>
        <h2>Weather 🌤️</h2>

        <select
          className="form-select mt-3"
          defaultValue={defaultCity.coords}
          onChange={(e) => {
            const city = cities.find((c) => c.coords === e.target.value)
            if (city) loadWeather(city.coords, city.name)
          }}
        >
          {cities.map((c) => (
            <option key={c.name} value={c.coords}>
              {c.name}
            </option>
          ))}
        </select>

        {loading && <div className="mt-3">Carregando...</div>}

        {weather && !loading && (
          <div className="alert alert-info mt-3">
            <b>{weather.city}</b>
            <br />
            Temperatura: {weather.temperature}°C
            <br />
            Vento: {weather.windspeed} km/h
          </div>
        )}
      </div>
    </div>
  )
}
