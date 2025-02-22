const express = require('express');
const app = express();
const port = 3006;

const productRouter = require("./routers/productRouter")
const errorHandler = require('./error/errorHandler');

// To parse JSON
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
    console.log(`Executed: ${req.method} ${req.url} Log Time: ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} `);
    next();
});

// new Date().toLocaleTimeString()
app.use("/products", productRouter)

app.use(errorHandler);
// app.all("*", (req, res) => {
//     res.status(404).json({
//         message: "Page not found"
//     })
// });


app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
} )
