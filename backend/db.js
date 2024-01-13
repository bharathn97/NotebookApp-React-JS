    const mongoose=require("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
async function connectToMongo() {
  await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}
module.exports=connectToMongo;
