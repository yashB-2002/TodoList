const path = require("path");
const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true });
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();
var newItems = ["buy apple", "buy banana"];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);
const Item1 = new Item({
    name: "buy something"
})


const startingItems = [Item1];
// const staticPath =;
// console.log(staticPath);
app.use(express.static("public"));
app.get("/", (req, res) => {
    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", option);
    Item.find({}, (err, result) => {
        if (result.length === 0) {
            Item.insertMany(startingItems, (err) => {
                if (err) console.log("error occured");
                else console.log("items added siccesfully");
            })
            res.redirect("/");

        }
        else {
            res.render("todo", { todayDate: day, newItem: result });

        }


    })

    // res.send();
})
app.post("/", (req, res) => {
    var items = req.body.item;
    const Item4 = new Item({
        name: items
    })
    Item4.save();
    res.redirect("/");
    // newItems.push(items);

})
app.post("/removed", (req, res) => {
    const itemToBeRemoved = req.body.check;
    Item.findByIdAndRemove(itemToBeRemoved, (err) => {
        console.log("removed successfully");
        res.redirect("/");

    })

})
app.listen("5000", () => {
    console.log("listening to port 5000");

})