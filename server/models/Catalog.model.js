import mongoose from 'mongoose'

const catalogSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  price: Number,
  description: String
})

export default mongoose.model('catalogs', catalogSchema)
