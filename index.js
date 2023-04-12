const express = require('express')
const app = express()
const mysql = require("mysql")
const pool = mysql.createPool({
    connectionLimit: 10,
    password: "",
    host: "localhost",
    user: "root",
    database: "thecamp_market"
})
app.use(express.json());
app.post("/todo/:id", (req, res) => {
    const id = req.params.id
    const activity = req.body.activity
    pool.query("UPDATE event SET activity = ?  WHERE Id = ?;", [activity, id], function (error, results, fields) {
        if (error) throw error;
        res.send("updated")
    })
})

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from thecamp_market WHERE Id = ?", id, function (error, results, fields) {
        if (error) throw error;
        res.send("deleted")
    })
})
app.listen(5000, () => {
    console.log("server running")
});