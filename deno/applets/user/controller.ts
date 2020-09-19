import type { RouterContext } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import * as dejs from 'https://deno.land/x/dejs@0.8.0/mod.ts';
import * as path from "https://deno.land/std/path/mod.ts";

import User from "./model.ts";

const views = path.join(Deno.cwd(), 'applets/user/views');


async function register(ctx: RouterContext) {
  ctx.response.body = await dejs.renderFile(path.join(views, '/register.ejs'), {
    name: 'balskjdjas'
  });
};

async function registerPost(ctx: RouterContext) {
  let { value } = await ctx.request.body({
    type: 'form-data'
  });
  let formData = await value.read();
  let email = formData.fields.email;
  let password = formData.fields.password;
  console.log(email);

  // Check if exists
  if (!await User.where('email', email).count()) {
    console.log('user not found');
  } else {
    console.log('user founded');
  }

  ctx.response.body = await dejs.renderFile(path.join(views, '/test.ejs'), {
    email: formData.fields.email
  })
}

export { register, registerPost };
