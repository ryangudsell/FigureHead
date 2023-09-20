const Comment = require("../models/commentModel");
const Product = require("../models/productModel");

const mongoose = require('mongoose')

const createComment = async (req, res) => {
    const {id} = req.params; // ID of the product the comment will belong to

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({error: "Product does not exist"})
        }

        const newComment = new Comment({
            text: req.body.text,
            user_id: req.body.user_id,
        });

        await newComment.save();

        product.comments.push(newComment); // Push comments to Products Comments Array
        await product.save();

        res.status(201).json (newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getComment = async (req, res) => {
    const { id, commentId } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Product: invalid Id'})
    }

    try {
        const product = await Product.findById(id).populate("comments");

        if(!product) {
            return res.status(404).json({error: 'No such product: product does not exist'})
        }

        const comment = product.comments.find(comment=> comment._id.toString() === commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(201).json(comment)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
};

const editComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({error: "Product does not exist"})
        }

        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                text: req.body.text,
            },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({error: "Product does not exist"})
        }

        const comment = await Comment.findByIdAndRemove(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        product.comments = product.comments.filter(
            (comment) => comment.toString() !== commentId
        );

        await product.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { createComment, getComment, editComment, deleteComment };