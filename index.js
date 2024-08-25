const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT||5001;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname,"client/build")));

if(process.env.NODE_ENV === "production"){
    //server static content
    app.use(express.static(path.join(__dirname,"client/build")));
}

//Routes

//create a todo

app.post("/todos", async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]);
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

app.get( "/todos/:id", async(req,res)=>{

    try {
        const {id} = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }

})

//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2",[description,id]);

        res.json("Todo was updated");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo

app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("delete from todo where todo_id = $1", [id]);
        res.json("todo was deleted");
    } catch (error) {
        console.error(error,message);
    }
})
//reroute undefined routes to index.html
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})