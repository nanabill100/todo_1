import mongoose from 'mongoose';
//Destructuring
const {Schema, model} = mongoose;

//Use Schema to structure the  data in the DB
const todoSchema = Schema({
    todoTitle: {
        type:String,
        required:true 
    },
   
    category: {
        type:String,
        required:true
    },
  
});
const todoModel = model('todo', todoSchema);
export default todoModel;

/*Types of exports
1. default export
2. named export*/