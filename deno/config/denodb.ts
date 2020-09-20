import { Database } from "https://deno.land/x/denodb@v1.0.9/mod.ts";

import User from '../applets/user/model.ts';


// DenoDB config
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



db.link([User]);

export default db;

// await db.sync();




