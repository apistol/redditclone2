import { Request, Response, Router } from "express"
import User from "../entity/User";
import { validate, isEmpty } from "class-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import auth from "../middleware/auth"

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        // validate data

        // @ts-ignore
        const emailUser = await User.findOneBy({ email })
        if (emailUser) return res.status(400).json({message:"Email is already taken"})

        // @ts-ignore
        const userName = await User.findOneBy({ username })
        if (userName) return res.status(400).json({message:"Username is already taken"})


        // create user
        const user = new User({ email, username, password })
        let errors = await validate(user)
        if (errors.length > 0) {
            return res.status(400).json({message:"Validation errors"})
        }

        await user.save()
        return res.json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    try {
        let errors: any = {}

        if (isEmpty(username)) errors.username = "Username must not be empty"
        if (isEmpty(password)) errors.password = "Password must not be empty"

        // @ts-ignore
        const user = await User.findOneBy({ username })

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors })
        }

        if (!user) return res.status(404).json({ error: 'User not found' })

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) return res.status(401).json({ error: 'Password is incorect' })
        const token = jwt.sign({ username }, process.env.JWT_SECRET!)
        res.set(
            'Set-Cookie',
            cookie.serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600,
                path: "/"
            }))

        return res.json(user)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

}

const me = async (_: Request, res: Response) => {
    return res.json(res.locals.user)
}

const logout = (_: Request, res: Response) => {
    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: "/"
    }))

    return res.status(200).json({ success: true })
}

const router = Router()
router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, me)
router.get("/logout", auth, logout)

export default router;