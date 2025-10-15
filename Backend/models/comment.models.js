import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    text :{
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    upvotedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    postId: {
        type: String,
        default: 'default-post',
    }
},{
    timestamps: true,
});

export const Comment = mongoose.model("Comment", commentSchema);
