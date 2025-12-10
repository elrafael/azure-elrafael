import { useState } from "react"

export interface Weather {
  temperature: number
  windspeed: number
  city: string
}


export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)

  const loadWeather = async (coords: string, city: string) => {
    try {
      setLoading(true)
      const [lat, lon] = coords.split(",")
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      )

      if (!res.ok) throw new Error(`Erro ao buscar clima para ${city}`)

      const data = await res.json()
      setWeather({
        city,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
      })
    } catch (err) {
      console.error(err)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return { weather, loading, loadWeather }
}
