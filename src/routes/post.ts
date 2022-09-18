import { Request, Response, Router } from "express";
import Post from "../entity/Post";
import auth from "../middleware/auth";

const createPost = async (req: Request, res:Response) => {

    const {title, body, sub} = req.body
    const user = res.locals.user;

    if(title.trim() === "" ) return res.status(400).json({message:"Title must not be empty"})

    try {
        // find a sub

        const post = new Post({title, body, user, subName:sub})
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