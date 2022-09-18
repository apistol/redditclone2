import { Request, Response, Router } from "express";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import Sub from "../entity/Sub";
import auth from "../middleware/auth";

const createPost = async (req: Request, res: Response) => {

    const { title, body, sub } = req.body
    const user = res.locals.user;

    if (title.trim() === "") return res.status(400).json({ message: "Title must not be empty" })

    try {
        // @ts-ignore
        const subRecord = await Sub.findOneBy({ name: sub })

        if (!subRecord) return res.status(400).send("No sub found")

        const post = new Post({ title, body, user, sub: subRecord })
        await post.save()

        return res.json(post)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

}


const getPosts = async (_: Request, res: Response) => {
    try {
        // @ts-ignore
        const posts = await Post.find({
            order: {
                createdAt: "DESC"
            }
        })

        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


const getPost = async (req: Request, res: Response) => {
    const { identifier, slug } = req.params

    try {
        // @ts-ignore
        const posts = await Post.find({ identifier, slug }, { relations: ['sub'] })
        if (!posts) return res.status(200).json({ error: "No post found" })

        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "Post not found" })
    }
}

const commentOnPost = async (req: Request, res: Response) => {
    const { identifier, slug } = req.params
    const body = req.body.body

    try {
        // @ts-ignore
        const post = await Post.find({ identifier, slug })
        if (!post) return res.status(200).json({ error: "No post found" })

        const comment = new Comment({
            body,
            user: res.locals.user,
            post:post[0]
        })

        await comment.save()
        return res.json(comment)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "Error while creating your comment" })
    }
}

const router = Router()

router.post("/", auth, createPost)
router.get("/", getPosts)
router.get("/:identifier/:slug", getPost)
router.post("/:identifier/:slug/comments", auth, commentOnPost)

export default router
