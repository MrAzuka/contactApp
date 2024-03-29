const {connect} = require('mongoose')
require('dotenv').config()
const {MONGO_URI} = process.env

exports.connectToDB = async ()=> {
    try {
        await connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database Connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}