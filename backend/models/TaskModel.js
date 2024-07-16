import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    taskName : {
        type : String,
        required : true,
    },
    isDone : {
        type : Boolean,
        default : false,
        required : true,
    }

});

export const TaskModel = mongoose.model('todos', TaskSchema);