import { Request, Response, Router } from "express";
import Post from "../entity/Post";
import Sub from "../entity/Sub";
import auth from "../middleware/auth";

const createPost = async (req: Request, res:Response) => {

    const {title, body, sub} = req.body
    const user = res.locals.user;

    if(title.trim() === "" ) return res.status(400).json({message:"Title must not be empty"})

    try {
        // @ts-ignore
        const subRecord = await Sub.findOneBy({name: sub})

        if(!subRecord) return res.status(400).send("No sub found")

        const post = new Post({title, body, user, sub:subRecord})
        await post.save()

        return res.json(post)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

}

const router = Router()

router.post("/", auth, createPost)

export default router
