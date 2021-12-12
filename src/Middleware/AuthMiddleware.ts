import e, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({path: ".env"})

class Auth {
    public static isLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (Auth.refreshToken(req, res, next) == false) res.send("Not signed in!")
        else next();
    }
    public static isGuest(req: Request, res: Response, next: NextFunction) {
        if (Auth.refreshToken(req, res, next)) res.send("Already signed in!")
        else next();
    }
    public static refreshToken(req: Request, res: Response, next: NextFunction)
    {
        try {
            if (req.cookies.jwt) {
                const decoded = jwt.verify(req.cookies.jwt, process.env.SECRET);
                if (decoded) {
                    const newToken = jwt.sign(decoded, process.env.SECRET)
                    res.clearCookie("jwt")
                    res.cookie("jwt", newToken, {maxAge: 1800000});
                    return true;
                } else {
                    res.clearCookie("jwt")
                    return false
                }
            }
            return false
        } catch (err) {
            res.clearCookie("jwt")
            return false
        }
    }
    public static default(req: Request, res: Response, next: NextFunction) { 
        Auth.refreshToken(req, res, next)
        next()
    }
}

export default Auth;