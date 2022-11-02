import { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        products: [{
            id: String,
            name: String,
            price: Number,
            stock: Number,
            description: String,
            photo: String,
            code: String,
            timestamp: Date,
        }]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("cart", cartSchema);
