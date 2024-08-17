const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo

app.post("/todos", async(req,res)=>{
    try {

        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log("\ntodo item has been inserted to todo\n");
        res.json(newTodo.rows[0]);
        
    } catch (error) {
        console.error(error.message)
    }
});

//get all todos

app.get("/todos", async(req,res)=>{
    try {

        const alltodos = await pool.query("select * from todo");
        console.log("\nall existing todo fetched\n")
        res.json(alltodos.rows);
        
    } catch (error) {
        console.error(error.message)
    }
});

//get single todo

//update a todo

//delete a todo

app.listen(5001, ()=>{
    console.log("server has started on port 5001");
})