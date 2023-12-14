import express from "express";
import bodyParser from "body-parser";
const port=3000;
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
function Poster(head,body){
    this.head=head;
    this.body=body;
}

var posts=[];
let i=0;
app.post("/submit",(req,res)=>{
    posts[i]=new Poster(req.body.heading,req.body.body);
    i++; 
    res.render("index.ejs",{
        posts:posts
    });
    
});
var x;
app.post('/article-submit',(req,res)=>{
        x=req.body.which;       
res.render("articles.ejs",{
            input:x,
            posts1:posts,
            head1:posts[x].head,
            article1:posts[x].body
        });
});

app.post('/edit-submit',(req,res)=>{
    const buttonClicked = req.body.editSubmit || req.body.deleteSubmit;
    if(buttonClicked=='Edit'){
        posts[x].body=req.body.updated;
    }else{
        posts.splice(x,1);
    }
   
    res.render("index.ejs",{
        posts:posts
    });
});

app.listen(port,(req,res)=>{
    console.log(`THe server is running on ${port}`);
});