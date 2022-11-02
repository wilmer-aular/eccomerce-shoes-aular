import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: String,
        price: Number,
        stock: Number,
        description: String,
        photo: String,
        code: String,
        timestamp: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("product", productSchema);