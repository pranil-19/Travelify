const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/blogs', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    })
    try {
        await blog.save()
        res.status(200).send(blog)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.send(blogs)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/blogs/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const blog = await Blog.findOne({ _id })
        if (!blog) {
            return res.status(404).send()
        }

        res.send(blog)
    } catch {
        res.status(500).send()
    }
})

router.delete('/blogs/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const blog = await Blog.deleteOne({ _id, owner: req.user._id })
        if (!blog) {
            return res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/blogs/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'source', 'destination', 'content', 'ExpensePerHead', 'AvailableSeats']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates!' })
    }

    const _id = req.params.id
    try {
        const blog = await Blog.findOne({ _id, owner: req.user._id })

        if (!blog) {
            return res.status(404).send()
        }

        updates.forEach((update) => blog[update] = req.body[update])
        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/blogs/addLike/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id })
        if (!blog) {
            return res.status(404).send({ error: 'Invalid id!' })
        }

        const userid = req.user._id
        const alreadyliked = blog.Likes.filter((user) => user.userid.toString() === userid.toString())

        if (!alreadyliked.length) {
            blog.Likes = blog.Likes.concat({userid})
        }
        else{
            blog.Likes = blog.Likes.filter((user) => user.userid.toString() !== userid.toString())
        }

        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/blogs/addcomment/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id })
        if (!blog) {
            return res.status(404).send({ error: 'Invalid id!' })
        }

        blog.comments = blog.comments.concat({ userid: req.user._id, description: req.body[Object.keys(req.body)], date:new Date() })

        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/blogs/deletecomment/:blogid/:commentid', auth, async (req, res) => {
    try {
        const _blogid = req.params.blogid
        const _commentid = req.params.commentid
        const blog = await Blog.findOne({ _id : _blogid})
        if (!blog) {
            return res.status(404).send()
        }

        blog.comments = blog.comments.filter((comment) => {
            if (comment.userid.toString() === req.user._id.toString() && comment._id.toString() ===  _commentid) {
                return false
            }
            else {
                return true
            }
        })

        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
