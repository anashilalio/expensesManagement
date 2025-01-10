import express, { request, response } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.mjs"
import expenseRouter from "./routes/expense.mjs"
import budgetRouter from "./routes/budget.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./startegies/local.mjs"

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "idkasecretiguess",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000
  }
}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(userRouter, expenseRouter, budgetRouter)

// Set port
const PORT = process.env.PORT || 3000;

const mongodbUrl = "mongodb://localhost/app_db"
mongoose.connect(mongodbUrl)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("error"))

app.listen(PORT, () =>{console.log(`server at ${PORT} `)})

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true
  response.cookie("hello", "world")
  response.send({msg: 'hello'})
})


app.post('/api/cart', (request, response) => {
  if(!request.session.user)
    return response.status(401).send({msg: "not connected"})
  const {body:item} = request
  const { cart } = request.session

  if(cart)
    cart.push(item)
  else
    request.session.cart = [item]

  return response.status(201).send("added")
})

app.get('/api/cart', (request, response) => {
  if(!request.session.user)
    return response.status(401).send({msg: "not connected"})

  return response.status(201).send(request.session.cart ?? [])
})

app.post(
  '/api/auth',
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200)
  }
)
app.get('/api/auth/session', (request, response) => {
  console.log("status : ");
  console.log(request.user);
  console.log(request.session);
  
  if(request.user)
    return response.status(200).send(request.user)
  else
    return response.status(401).send({msg: "not authen"})
})

app.post("/api/auth/logout", (request, response) => {
  if(!request.user)
    return response.status(400).send({msg: "not authen"})
  request.logout((err) => {
    if(err)
      return response.status(400).send({msg: "err in logout"})
    else
      return response.status(200).send("ok")
  })
})