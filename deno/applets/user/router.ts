import { Router } from "oak";


// Imports
import { register, registerPost, home, login, loginPost } from "./controller.ts";

const pathPrefix = '/user'
const userRouter = new Router({ prefix: pathPrefix });

userRouter
  .get('/register', register)
  .post('/register', registerPost)
  .get('/home', home)
  .get('/login', login)
  .post('/login', loginPost)

export default userRouter;
