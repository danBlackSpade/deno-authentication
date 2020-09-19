import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";


const app = new Application();
const p = Number(Deno.env.get('PORT') || 8095);


const db = new Database(
  {
    dialect: 'mongo',
    debug: true,
  },
  {
    uri: 'mongodb://mongo:27017/',
    database: 'app-testing-auth-and-denon',
  }
);

// import Models here
import User from './applets/user/model.ts';

db.link([User]);
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


import { Database } from "https://deno.land/x/denodb@v1.0.9/mod.ts";
import { Model } from "https://deno.land/x/denodb@v1.0.9/mod.ts";


app.addEventListener('error', (evt) => {
  console.log(evt.error);
});


console.log('server connected on port: 8095');
await app.listen({ port: p });



