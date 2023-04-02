import { Router } from "express";
import ControllerUsers from "./controllers/ControllerUsers.js";
import ControllerCards from "./controllers/ControllerCards.js";
import ControllerCategories from "./controllers/ControllerCategories.js";
import authPanelMiddleware from "./middlewares/authPanelMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const routes = Router()

/* USERS */
routes.get("/users", authMiddleware ,ControllerUsers.getUser)
routes.post('/users', ControllerUsers.postUser )
routes.post('/users/login',authPanelMiddleware, ControllerUsers.login)
routes.put('/users', authMiddleware, upload.single("avatar"), ControllerUsers.update)

/* Cards */
routes.get("/cards",authMiddleware, ControllerCards.get)
routes.post("/cards",authMiddleware, ControllerCards.post)
routes.put("/cards",authMiddleware, ControllerCards.put)

/* Categories */
routes.get("/categories", authMiddleware, ControllerCategories.get)
routes.post("/categories", authMiddleware, ControllerCategories.post)

export default routes