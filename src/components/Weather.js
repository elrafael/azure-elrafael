import axios from "axios"
import { useState } from "react"

export default function Weather() {
  const [tempo, setTempo] = useState(null)

  async function buscarClima() {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=38.680&longitude=-9.155&current_weather=true"
    const r = await axios.get(url)
    setTempo(r.data.current_weather)
  }

  return (
    <div className="container mt-5">
      <h2>Clima em Almada 🌤</h2>
      <button className="btn btn-primary mt-3" onClick={buscarClima}>
        Buscar agora
      </button>

      {tempo && (
        <div className="alert alert-info mt-3">
          Temperatura: {tempo.temperature}°C
          <br />
          Vento: {tempo.windspeed} km/h
        </div>
      )}
    </div>
  )
}
