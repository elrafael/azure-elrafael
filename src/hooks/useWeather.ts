import { useState } from "react"
import { fetchWeather, Weather } from "../services/weather.service"

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadWeather(coords: string, cityName: string) {
    const [lat, lon] = coords.split(",")
    setLoading(true)
    const data = await fetchWeather(lat, lon)
    setWeather({ ...data, city: cityName })
    setLoading(false)
  }

  return {
    weather,
    loading,
    loadWeather,
  }
}
