const express = require("express");
const cors = require("cors");
const data = require("./quotes");

// const fetch = require('node-fetch')
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000
// console.log(data[0])
app.get("/quotes", (req, res) => {
  var offset = 5
  var pg_data = 0
  var start_index = 0
  var end_index = 0

  const { page, items } = req.query
  const page_number = (data_length, offset) => {
    var no_of_pages = Math.floor(data_length / offset);
    var remaining_items = data_length % offset;
    if (remaining_items) res.json({"Page limit":no_of_pages + 1})
    res.json({"Page limit":no_of_pages})

  }

  // Check if page has been passed as a query parameter
  if ((page)) {

    // Check if the number of items has been specified
    if (items) {
      offset = items
      start_index = (items * page) - items
      end_index = items * page
      pg_data = data.slice(start_index, end_index)

    } else {
      // Default to an item number of 5
      start_index = (5 * page) - 5
      end_index = 5 * page
      pg_data = data.slice(start_index, end_index)
    }


    // Check if the request has no page.
    if (pg_data.length == 0) {
      page_number(data.length,offset)
    } else {
      res.json({
        "page number": parseInt(page),
        "items": parseInt(offset),
        "number of pages": data.length%offset?Math.floor(data.length/offset)+1:Math.floor(data.length),
        "data": pg_data
      })


    }
  }

  // If their is no pagination, send the entire data
  else {
    res.send(data);

  }
});

app.get("/quote/:id", (req, res) => {
  const id = req.params.id;
  // console.log(data[id])
  res.send(data[id]);
});

app.get("/quotes/rand", (req, res) => {
  const id = Math.floor(Math.random() * data.length);
  res.send(data[id]);
});


app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
