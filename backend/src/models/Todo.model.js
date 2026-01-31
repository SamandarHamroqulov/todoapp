const { Schema, model, Types } = require("mongoose");

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "done"],
        default: "pending"
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})
module.exports = model("Todo", TodoSchema)