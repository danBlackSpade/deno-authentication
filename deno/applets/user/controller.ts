import type { RouterContext } from "oak"
// import * as dejs from 'https://deno.land/x/dejs@0.8.0/mod.ts'
import * as dejs from 'dejs'
import * as path from "path"
import * as bcrypt from "bcrypt"
// import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload } from "djwt/create"

import User from "./model.ts"

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

const views = path.join(Deno.cwd(), 'applets/user/views')


async function register(ctx: RouterContext) {
  ctx.response.body = await dejs.renderFile(path.join(views, '/register.ejs'), {
    name: 'balskjdjas'
  })
}

async function registerPost(ctx: RouterContext) {
  let { value } = await ctx.request.body({
    type: 'form-data'
  })
  let formData = await value.read()
  let email = formData.fields.email
  let password = formData.fields.password;
  console.log(email)

  // Check if exists
  if (!await User.where('email', email).count()) {
    console.log('user not found.... . . . . . creating user')
    let hashedPassword = await bcrypt.hashSync(password)
    User.create({
      email: email,
      password: hashedPassword
    })
    
    ctx.response.body = await dejs.renderFile(`${views}/home.ejs`, {
      msg: {
        success: 'user criado'
      }
    })
  }
  else {
    ctx.response.body = await dejs.renderFile(path.join(views, '/register.ejs'), {
      msg: {
        error: 'usuário já registrado',
      }
    })
  }
}

async function login(ctx: RouterContext) {
  // console.log(import.meta.url)
  ctx.response.body = await dejs.renderFile(`${views}/login.ejs`, {})
}

async function loginPost(ctx: RouterContext) {
  let { value } = await ctx.request.body({ type: 'form-data' })
  let formData = await value.read()
  let email = formData.fields.email
  let password = formData.fields.password
  let user = await User.where({ email: email }).first()
  
  if (!user) {
    console.log('usuario nao registrado')
    ctx.response.body = await dejs.renderFile(`${views}/login.ejs`, {
      msg: {
        error: 'Usuário não registrado'
      }
    })
  }
  else if (!bcrypt.compareSync(password, user.password)) {
    ctx.response.body = await dejs.renderFile(`${views}/login.ejs`, {
      msg: {
        error: 'Senha incorreta'
      }
    })
  }
  else {
    const payload: Payload = {
      iss: user._id,
      exp: setExpiration(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    }
    const jwt = await makeJwt({ header, payload, key: Deno.env.get('JWT_KEY') || '' })
    ctx.cookies.set('jwt', jwt)
    ctx.response.redirect('/user/home');
  }
}

async function home(ctx: RouterContext) {
  let users = await User.all()
  ctx.response.body = await dejs.renderFile(path.join(views, '/home.ejs'), {
    users: users,
  })
}

export { register, registerPost, home, login, loginPost }
