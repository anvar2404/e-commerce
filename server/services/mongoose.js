import mongoose from 'mongoose'

const url =
  'mongodb+srv://anvar-mern:anvar2003@cluster0.tcfte.mongodb.net/web-site?retryWrites=true&w=majority'

exports.myConnect = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  return mongoose.connection
}
