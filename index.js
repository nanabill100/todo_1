import dotenv from 'dotenv';
import express from "express";
import todoModel from "./Schema/schema.js";
import cors from 'cors';
import mongoose from 'mongoose';

const app=express();

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

const PORT=3000 || process.env.PORT;

const db = process.env.DB_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

//home
app.get(`/`, (req, res)=>{
    res.json('Welcome to M.A.D todo backend API');
})

/*const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/*rl.question("What is your name ? ", function saveInput(name) {
    console.log(`His name is ${name}`);
    rl.close();
  });
  
  rl.on("close", function saveInput() {
      console.log("\nBYE BYE !!!");
      process.exit(0);
  });*/

/*rl.question("Enter your score:", function (score) {
if (score>100){
    console.log("Invalid score");
}
else if(score>=80){
    console.log("A");
}
else if(score>=75){
    console.log("B+");
}
else if(score>=70){
    console.log("B");
}
else if(score>=65){
    console.log("C+");
}
else if(score>=60){
    console.log("C");
}
else if(score>=55){
    console.log("D+");
}
else if(score>=50){
    console.log("D");
}
else (console.log("F"));

rl.close();});*/


//get method
//home route
// app.get('/home', (req, res)=>{
//     res.send('Post request received');
 
/*app.get('/home', (req, res)=>{
    res.json({message: 'Welcome to the todo backend API'});
})

post()
app.post('/todo', (request,response)=>{
    response.send('Use this route to create a new Todo');
})

//post()
app.post('/todo', (req,res)=>{
    res.send('Use this route to create a new Todo');
})

//patch()
app.patch('/todo', (req,res)=>{
    res.send('Use patch to update some data in the database');
})

//put()
app.put('/todo', (req,res)=>{
    res.put('Use put to update an entire/whole data in a database');
})

//delete()
app.delete('/todo', (req,res)=>{
    res.delete('Use delete to remove some data in a database');
})

CRUD: createImageBitmap, Read, Update, Delete */




//Get all Todos
app.get('/todos',async (req, res)=>{
    const allTodos =await todoModel.find({});
    if(allTodos){
//successful
return res.status(200).json({
    message: "Todos fetched successfully",
    data: allTodos
});
    }
    else{
     //error
     return res.status(500).json({
    message: "Ooops!, unable to fetch todos",
      })
}
})

//Get specific categories
app.get('/todos/:category', async (req, res)=>{
    const{category}=req.params;   //is same as: const category=req.params.category;
const allCategoryTodos = await todoModel.find({})
    .where("category").equals(category);
    if(todosByCategory){
        //success
        return res.status(200).json({
            message: `${category} todos fetched successfully`,
            data: allCategoryTodos
        });
    }else{
        //error
        return res.status(500).json({
            message: `Ooops!, unable to fetch ${category} todos`,
              })
    }
})
//Creating a new todo
app.post('/todo', async (req, res)=>{
    const {todoTitle, category} = req.body;
    const newTodo= await todoModel.create(
        {
            todoTitle: todoTitle,   //in JS is same as todoTitle,
            category: category     //in JS is same as category
        });
        if(newTodo){
//success
res.status(200).json({
    message:'Todo created successfully',
    data: newTodo
})
        }else{
//error
return res.status(500).json({
    message: 'Error creating todo'
})
        }
})

//Deleting a todo
app.delete('/todo/:id', async (req, res)=> {
    const{id}=req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if(deletedTodo){
//success
   return res.status(200).json({
       message: 'Todo deleted successfully'
   })
    }else{
//error
  return res.status(500).json({
      message: 'Error deleting Todo'
  })
    }
})

app.listen((PORT), ()=>{
    console.log(`listening on port ${PORT}`);
})