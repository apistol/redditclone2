import { Request, Response, Router } from "express"
import { isEmpty } from "class-validator"

import User from "../entity/User";
import auth from "../middleware/auth";
import { AppDataSource } from "../data-source";
import Sub from "../entity/Sub";

const createSub = async (req: Request, res: Response) => {
    const { name, title, description } = req.body

    const user: User = res.locals.user;

    try {
        let errors: any = {}

        if (isEmpty(name)) errors.name = "Name must not be empty"
        if (isEmpty(title)) errors.title = "Title must not be empty"

        const sub = await AppDataSource.getRepository(Sub)
            .createQueryBuilder('sub')
            .where('lower(sub.name) = :name', { name: name.toLowerCase() })
            .getOne()

        if (sub) errors.name = 'Sub exists already'

        if (Object.keys(errors).length > 0) {
            throw errors
        }

    } catch (error) {
        return res.status(400).json(error)
    }

    try {
        const sub = new Sub({ name, description, title, user })
        await sub.save()

        return res.json(sub)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const router = Router()

router.post("/", auth, createSub)

export default router