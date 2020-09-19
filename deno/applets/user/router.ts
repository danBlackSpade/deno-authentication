import { Router } from "https://deno.land/x/oak/mod.ts";


// Imports
import { register, registerPost } from "./controller.ts";

const pathPrefix = '/user'
const userRouter = new Router({ prefix: pathPrefix });

userRouter
  .get('/register', register)
  .post('/register', registerPost)


export default userRouter;
