const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { Schema, default: mongoose } = require("mongoose");
const url =
  "mongodb+srv://root:" +
  process.env.PASSWORD +
  "@firstcluster.zndu0.mongodb.net/Blogs?retryWrites=true&w=majority";

mongoose.connect(url);


const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  categoryTitle:{type:String,required:true},
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  subDetails: [
    {
      title: { type: String, required: true },
      imageUrl:{type:String,required:true},
      content: { type: String, required: true },
    },
  ],
  author: { type: String, required: true },
  authorImage:{type:String,required:true},
  created_at: { type: String,},
  updated_at: { type: String, },
});
const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});
const postCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostBlog",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
    required: true,
  },
});
const tableSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  row1: {
    col1: { type: String },
    col2: { type: String },
    col3: { type: String },
  },
  row2: {
    col1: { type: String },
    col2: { type: String },
    col3: { type: String },
  },
  row3: {
    col1: { type: String },
    col2: { type: String },
    col3: { type: String },
  },
});

const blog={};


blog.getPostCollection=async()=>{
    let model=await mongoose.model('PostBlog',postSchema);
    return model;
}

blog.getTableCollection=async()=>{
    let model=await mongoose.model('Table',tableSchema);
    return model;
}

blog.getBlogCategoryCollection=async()=>{
    let model=await mongoose.model('BlogCategory',categorySchema);
    return model;
}

blog.getBlogPostCategory=async()=>{
    let model=await mongoose.model('BlogPostCategory',postCategorySchema);
    return model;
}

module.exports=blog;