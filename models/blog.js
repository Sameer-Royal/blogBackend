const { getPostCollection } = require('../utilities/connection');
const db=require('../utilities/connection');

const blogModel={};

/* Here I am finding the all the blogs of all the categories */

blogModel.findBlogs=async()=>{
    const model=await db.getPostCollection();
    const data=await model.find({},{_id:0,authorImage:0,updated_at:0,__v:0});
    return data;
}

/* Here I am creating a blog */

blogModel.createBlog=async(blog)=>{
    
    const model=await db.getPostCollection();
    return model.create(blog);
}

/* Here I am finding the ALL the blogs of the PARTICULAR CATEGORY */ 

blogModel.findCatBlog=async(categoryTitle)=>{
    const model=await db.getPostCollection();
    const data=await model.aggregate(
        [ { $match : {categoryTitle} } ]
    );
    return data;
}

/* Here I am finding the ONE blog of the PARTICULAR CATEGORY */

blogModel.findOneBlog=async(catTitle,title)=>{
    const model=await db.getPostCollection();
    const data=await model.findOne({$and:[
        {"categoryTitle":catTitle},
        {"title":title}
    ]});
    return data;
}

/* Here I am finding One Blog with sub Blog */

blogModel.fubOneSubBlog=async(blogCat,blog,subBlog)=>{
    const model=await db.getPostCollection();
    const data=await model.find({$and:[
        {"categoryTitle":blogCat},
        {"title":blog},
        {"subDetails.title":subBlog}
    ]})

    return data;
}

module.exports=blogModel;
