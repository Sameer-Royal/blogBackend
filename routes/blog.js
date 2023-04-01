const { Router, response } = require("express");
const express = require("express");
const router = express.Router();
const blogServives = require("../services/blog");
const blog = require("../utilities/connection");
const short = require("short-uuid");
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_t7fgl6ldHuz0ufjfxxSoIl8fiT8=",
  privateKey: "private_THB4xIg49JGFn4demYFi7vN7FP8=",
  urlEndpoint: "https://ik.imagekit.io/y7uq2y6wy/",
});

var allImages=[]

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await blogServives.findAllBlogs();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  })
  .post(fileUpload, async (req, res, next) => {
    try {
      var arr = [];
      var bodyData = {};
      if(req.body.subTitle){
        let arrayCheck = Array.isArray(req.body.subTitle);
      if (arrayCheck) {
        for (var i = 0; i < req.body.subTitle.length; i++) {
          arr.push({
            title: req.body.subTitle[i],
            imageUrl:allImages[2+i],
            content: req.body.subComment[i],
          });
        }
      } else  {
        arr.push({
          title: req.body.subTitle,
          imageUrl:allImages[2],
          content: req.body.subComment,
        });
      }
      }
      
      bodyData.id=short.generate()
      bodyData.categoryTitle=req.body.categoryTitle;
      bodyData.title=req.body.title;
      bodyData.imageUrl=allImages[0];
      bodyData.subDetails=arr;
      bodyData.author=req.body.author;
      bodyData.authorImage=allImages[1];
      bodyData.created_at=getDate();
      bodyData.updated_at=getDate();
      console.log(bodyData);
      const data=await blogServives.createBlog(bodyData)
      res.send(JSON.stringify("hello world"));
    } catch (error) {
      res.send("something wrong");
    }
  })
  .put((req, res, next) => {
    res.send("put request on root blog");
  })
  .delete((req, res, next) => {
    res.send("delete request on root blog");
  });



function fileUpload(req, res, next) {
  var arr=[];
  
  arr.push({file:req.files.image.data,fileName:req.files.image.name},
    {file:req.files.authorImage.data,fileName:req.files.authorImage.name})

    let arrayCheck2=Array.isArray(req.files.subTitleImage)

    if(arrayCheck2){
      req.files.subTitleImage.map((element)=>{
        arr.push({file:element.data,fileName:element.name})
      })
    }
    else if(req.files.subTitleImage){
      arr.push({file:req.files.subTitleImage.data,fileName:req.files.subTitleImage.name})
    }

  
    Promise.all(
      arr.map(async (element) => {
        const uploadResponse = await imagekit.upload({
          file: element.file,
          fileName: element.fileName,
        });
        return uploadResponse.url;
      })
    )
      .then((uploadedUrls) => {
        allImages=uploadedUrls;
        console.log(allImages)
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload images' });
      });     
}


function getDate(){
  var date = new Date();
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var newformat = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var dateTime = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + newformat;
  return dateTime;
}

router.get("/:name", async (req, res) => {
  try{
    const data=await blogServives.findCatBlog(req.params.name);
    res.send(data);
  }catch(error){
    res.send('something went wrong');
  }
});

router.get('/oneBlog/oneBlog',async(req,res)=>{
  try{
    const data=await blogServives.findOneBlog(req.query.catBlog,req.query.blog);
    res.send(data);
  }catch(error){
    res.send('something went wrong');
  }
})

router.get('/subBlog/subBlog',async(req,res)=>{
  try{
    
    const data=await blogServives.findOneSubBlog(req.query.blogCat,req.query.blog,req.query.subBlog);
    console.log(data)
    res.send(data);
  }catch(error){
    res.send('something went wrong')
  }
  
})

module.exports = router;
