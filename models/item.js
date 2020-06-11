var mongoose = require("mongoose");

itemSchema = mongoose.Schema({
    name: String,
    desc: String,
    addesc: String,
    images: {
        image1: String,
        image2: String,
        image3: String,
        image4: String
    },
    points: String,
    category: String,
    author: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user"
        }
    }
})

module.exports = mongoose.model("item", itemSchema);