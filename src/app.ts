import dotenv from 'dotenv'
import express, {Request, Response, NextFunction} from 'express'
import Records from './Controllers/RecordController'
import User from './Controllers/UserController'
import bp from 'body-parser'
import cookieParser from 'cookie-parser'
import Auth from './Middleware/AuthMiddleware'
import path from 'path'

dotenv.config({path: ".env"})
const app = express()

app.set('view engine', 'pug')
app.set('views', './public')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser());

// Routes
app.get("/", Auth.default, (req: Request, res: Response) => res.render("index.pug", {jwt: req.cookies.jwt}))
app.get("/records", Auth.isLoggedIn, (req: Request, res: Response) => Records.allRecords().then(result => res.render("records", {rows: result, jwt: req.cookies.jwt})))
app.get("/login", Auth.isGuest, (req: Request, res: Response) => res.render("login.pug", {jwt: req.cookies.jwt}))
app.post("/login", (req: Request, res: Response) => User.login(req, res))

app.get("/signup", Auth.isGuest, (req: Request, res: Response) => res.render("signup.pug", {jwt: req.cookies.jwt}))
app.post("/signup", (req: Request, res: Response) => User.signup(req, res))

// API
app.get("/hello/:record", (req: Request, res: Response) => {
    Records.newRecord(req, `/hello/${req.params.record}`);
    res.send(`Hello, ${req.params.record}!`);
})
app.get("/goodbye/:record", (req: Request, res: Response) => {
    Records.newRecord(req, `/goodbye/${req.params.record}`);
    res.send(`Goodbye, ${req.params.record}!`);
})

app.listen(5000)