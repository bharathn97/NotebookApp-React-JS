 const connectToMongo=require("./db");
 connectToMongo();
 const express = require('express');
 const app = express();
 var cors=require("cors");
 app.use(cors());
 app.use(express.json());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));
app.listen(6400,()=>{
  console.log("Listening on port 6400");
})
