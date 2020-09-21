import { Application } from "oak";
import "dotenv/load";

import db from "./config/denodb.ts";


const app = new Application();
const p = Number(Deno.env.get('PORT') || 8095);

// Start db
await db.sync();

// General 404 error page
app.use(async (ctx, next) => {
  ctx.response.status = 404;
  ctx.response.body = "404 page not found, maybe ill show u something later";
  await next();
});

// Routes
import userRouter from './applets/user/router.ts';
app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());




app.addEventListener('error', (evt) => {
  console.log(evt.error);
});


console.log('server connected on port: 8095');
await app.listen({ port: p });











