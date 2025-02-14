import express from "express";
import mongoose from "mongoose";
import loginRouter from "./routes/auth/login.mjs"
import logoutRouter from "./routes/auth/logout.mjs"
import signUpRouter from "./routes/auth/signup.mjs"
import expenseRouter from "./routes/expense.mjs"
import budgetRouter from "./routes/budget.mjs"
import categoryRouter from "./routes/category.mjs"
import userRouter from "./routes/user.mjs"
import communityRouter from "./routes/community.mjs"
import communityCategoryRouter from "./routes/communityCategory.mjs"
import communityExpenseRouter from "./routes/communityExpense.mjs"
import communityBudgetRouter from "./routes/communityBudget.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

const app = express();

const PORT = process.env.PORT || 3000;
const mongodbUrl = "mongodb://localhost/app_db"

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "idkasecretiguess",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1800000
  },
  store: MongoStore.create({
    mongoUrl: mongodbUrl
  })
}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(
  signUpRouter, loginRouter, logoutRouter, expenseRouter, budgetRouter, categoryRouter, userRouter,
  communityRouter, communityCategoryRouter, communityExpenseRouter, communityBudgetRouter
)

// Set port

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
