import {Request, Response} from 'express'
import Database from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path: ".env"})


const collection = Database.db.collection("users")

class User {
    public static login(req: Request, res: Response) {
        const {name, password} = req.body;
        if (name && password) {
            Database.client.connect()
            .then(() => {
                return collection.find({name: name}).limit(1).count()
            }).then(result => {
                if (result) {
                    return collection.findOne({name: name})
                }
            }).then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) console.log(err)
                        if (result) {
                            const token = jwt.sign({name: user.name, password: user.password}, process.env.SECRET, {expiresIn: '30m'})
                            res.cookie("jwt", token);
                            res.send("Logged in successfully!");
                        }
                        else res.send("Incorrect login!");
                    })
                }
            })
        }
    }
    public static signup(req: Request, res: Response) {
        const {name, password, confirmPassword} = req.body;
        if (name && password && confirmPassword) {
            if (password == confirmPassword) {
                bcrypt.hash(password, 10).then((hash: string) => {
                    Database.client.connect()
                    .then(() => collection.find({name: name}).limit(1).count()).then(result => {
                        if (!result) {
                            collection.insertOne({name: name, password: hash})
                            res.send("Registered successfully!");
                        } else {
                            res.send("Failed to register!")
                        }
                    }).catch(err => {
                        console.log(err)
                        res.send("Failed to register!")
                    })
                });
            }
        }
        
    }
}

export default User;