const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId
        },
        firstName: {
            type: String,
            // required: true
        },
        lastName: {
            type: String,
            // required: true
        },
        email: {
            type: String
        },
        mobile: {
            type: String,
            unique: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Nil"],
            default: "Nil"
        }
    },
    {
        timestamps: true
    }
)

module.exports = model("Contacts", contactSchema)