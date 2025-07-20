const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const ownerRoute = require("./routes/owner");
const app = express();


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ProductDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

app.use(express.json());
app.use("/product", productRouter);
app.use("/owner", ownerRoute);
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
