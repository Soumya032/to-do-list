//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine","ejs");


//connection database
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
.then(() => {console.log("connected tto the server")})
.catch((err) => {console.error(err)})

//databse schema
const todoSchema = new mongoose.Schema({
    name:{type:String}
})

//database model
const NewToDo = mongoose.model("todolist",todoSchema)




// var workList =[];

app.get("/", (req,res) => {
    
let day = date.getDate();

   /*  switch (day) {
        case 0:
            message="sunday";
            break;
        case 1:
            message="monday";
            break;
        case 2:
            message="tuesday";
            break;
        case 3:
            message="wednesday";
            break;
        case 4:
             message="thursday";
             break;
        case 5:
            message="friday";
            break; 
        case 6:
            message="saturday";
             break;   
        default:
            console.log("erroe");
            break;
    } */
    

     NewToDo.find({})
     .then((list) => {
        res.render("list",{title:day,activity:list,pushType:"chnage"});
      })
      .catch((err) => {console.error(err)})

})

app.post("/",(req,res) => {
    let item;
    if(req.body.push==="work"){
        item = req.body.new;
        workList.push(item);
        res.redirect("/work");
    }
    else{
    console.log("mein yahan aa raha glti se");
    item = req.body.new;
    // toDoList.push(item);
     

   if(item !== ""){
    const todo = new NewToDo({  
        name:item                 // saving to database
    }) 
    todo.save();
    }

    res.redirect("/");
    }
})


app.get("/work",(req,res) => {
    let day = date.getOnlyDay();
    res.render("list",{title:day,activity:workList,pushType:"work"})
})

// app.post("/work",(req,res) => {
//     let workItem = req.body.new;
//     workList.push(workItem);
//     res.redirect("/work");
// })




app.post("/delete",(req,res) => {
    let deleteId = req.body.deleteornot;
    let deleteName;
    console.log(deleteId);

    NewToDo.findOne({_id:deleteId}).then((item) => {deleteName = item.name;console.log("found")})

    NewToDo.deleteOne({ _id:deleteId }).then(function(){
        console.log( deleteName+" deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    // res.redirect("/");

})





app.listen(3000 ||  process.env.port, (req,res) => {
    console.log("server stared at port 3000");
})
