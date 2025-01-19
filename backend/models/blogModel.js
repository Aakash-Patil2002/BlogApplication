const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String, 
  content: String,
  category: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0, 
  },
  tags:String
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
