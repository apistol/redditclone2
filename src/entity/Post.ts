import { Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { makeId, slugify } from "../util/helpers"
import Comment from "./Comment"
import Entity from "./Entity"
import Sub from "./Sub"
import User from "./User"

@TOEntity('posts')
export default class Post extends Entity {

    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, post)
    }

    @Index()
    @Column({ unique: true })
    identifier: string // 7 char id

    @Column({ unique: true })
    title: string

    @Index()
    @Column()
    slug: string

    @Column({ nullable: true, type: "text" })
    body: string

    @Column()
    subName: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @ManyToOne(() => Sub, user => user.posts)
    @JoinColumn({ name: "subName", referencedColumnName: "name" })
    sub: Sub;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}
