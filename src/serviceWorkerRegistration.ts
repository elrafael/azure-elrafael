export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("SW registrado 🎉"))
        .catch((err) => console.error("Erro ao registrar SW:", err))
    })
  }
}
