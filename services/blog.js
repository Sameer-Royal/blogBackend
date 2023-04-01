
const blogModel=require('../models/blog');
const blog = require('../utilities/connection');

const blogServices={};



blogServices.createBlog=async(blog)=>{
    const data=await blogModel.createBlog(blog);
    return data;
}
blogServices.findAllBlogs=async()=>{
    const blogResult=await blogModel.findBlogs();
    return blogResult;
}


blogServices.findCatBlog=async(blogCat)=>{
    const result=await blogModel.findCatBlog(blogCat);
    return result;
}

blogServices.findOneBlog=async(catTitle,title)=>{
    const result=await blogModel.findOneBlog(catTitle,title);
    return result;
}

blogServices.findOneSubBlog=async(blogCat,blog,subBlog)=>{
    const result=await blogModel.fubOneSubBlog(blogCat,blog,subBlog);
    return result;
}

module.exports=blogServices;