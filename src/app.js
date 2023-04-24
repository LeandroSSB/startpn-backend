import express from "express"
import compression from "compression"
import cors from "cors"
import routes from "./routes.js"
import serverLogMiddleware from "./middlewares/serverLogMiddleware.js"

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.server.use([cors(), express.json({limit: "30mb"}),compression(), serverLogMiddleware])
  }
  routes() {
    this.server.use(routes)
  }
}

export default new App().server