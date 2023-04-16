/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { object, string, number, date, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

// define a schema for the collection
const todoItemSchema = object({
  text: string().required(),
  done: boolean().required().default(() => false),
  userId: string().required(),
  created: date().default(() => new Date()),
});

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

app.use("/todoitems", (req, res, next) => {
  if (req.method === "POST") {
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      req.query.userId = req.user_token.sub
  }
  next();
});

app.use('/todoitems/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      console.log(id);
      const doc = await conn.getOne('todoitems', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})

app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {todoitems: todoItemSchema});

// bind to serverless runtime
export default app.init();
