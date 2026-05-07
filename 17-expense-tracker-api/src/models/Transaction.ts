import  { model, models, Schema } from "mongoose";


const TransactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    type : {
        type : String,
        enum : ["income","expense"],
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    date : {
        type : String,
    }
}, {
    timestamps : true,
})


const Transaction =  models.Transaction || model("Transaction",TransactionSchema)

export default Transaction