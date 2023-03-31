import dotenv from "dotenv"
import App from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 8080


App.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
