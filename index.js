const express = require("express");
const methodOverride = require('method-override')

const port = 8081;
const app = express();
const path = require("path");

const { v4: uuidv4 } = require('uuid');
app.use(methodOverride('_method'));


// ----------------------------------------------------------------

app.use(express.urlencoded({extended : true}));     // Middleware

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

// ----------------------------------------------------------------

let posts = [
    {
        id : uuidv4(),
        username : "sounak nandi",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "trivi",
        content : "I love playing"
    },
    {
        id : uuidv4(),
        username : "siddharth ray",
        content : "I love malaysia"
    }
];

app.get("/posts" , (req , res) => {
    res.render("index.ejs" , {posts});
});

app.get("/posts/new" , (req , res) => {
    res.render("new.ejs");
});

app.post("/posts" , (req , res) => {
    // console.log(req.body);

    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    // res.send("Post request working");
    res.redirect("/posts");
});

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    // console.log("Id : " +id);
    let post = posts.find((p) => id === p.id);  // To check if the given 
    // Id matches with the Ids in database or not.
    console.log(post);

    res.render("show.ejs" , {post});
    res.send("Request working");
});

// To update a specific post :-
app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log("New Content : " +newContent);
    // res.send("Patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id" , (req , res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    // res.send("Delete success");
    res.redirect("/posts");
});

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
});


