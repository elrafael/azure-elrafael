import axios from "axios"

export interface Weather {
  temperature: number
  windspeed: number
  city: string
}

export async function fetchWeather(lat: string, lon: string): Promise<Weather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

  const r = await axios.get<{
    current_weather: { temperature: number; windspeed: number }
  }>(url)

  return {
    temperature: r.data.current_weather.temperature,
    windspeed: r.data.current_weather.windspeed,
    city: "", // placeholder, o hook completa
  }
}
