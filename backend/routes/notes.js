const express=require("express");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser");
const Notes=require("../models/Notes");
const {body,validationResult}=require("express-validator");




router.get("/fetchallnotes",fetchuser,async (req,res)=>{
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
});



router.post("/addnote",fetchuser,[body("title","Enter a valid title").isLength({min:3}),body("description","Description should of min 5 characters").isLength({min:5})],async (req,res)=>{
try{
     const {title,description,tag}=req.body;
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {return res.status(400).json({erros:errors.array()});
}
     const note=new Notes({
       title,description,tag,user:req.user.id
     })
const savedNote=await note.save();
     req.json(savedNote);
   } catch(error){
     console.log(error.message);
     res.status(500).send("Soem Error occured");
   }
}); 




router.put("/updatenote/:id",fetchuser,async (req,res)=>{
const {title,description,tag}=req.body;
try{
const newnote={};
if(title){newnote.title=title;}
if(description){newnote.description=description;}
if(tag){newnote.tag=tag;}
let note=await Notes.findbyId(req.params.id);
if(!note){return res.status(404).send("User not found")};
if(note.user.toString()!==req.user.id)
{
  return res.status(401).send("Usere not allowed");
}
note = await Notes.findbyIdandUpdate(req.params.id,{$set:newnote},{new:true});
res.json({note});
} catch(error){
  console.log(error.message);
  res.status(500).send("Soem Error occured");
}
});



router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
try{
let note=await Notes.findbyId(req.params.id);
if(!note){return res.status(404).send("User not found")};
if(note.user.toString()!==req.user.id)
{
  return res.status(401).send("Usere not allowed");
}
note = await Notes.findbyIdandDelete(req.params.id);
res.json({"Success":"Note has beeen deleted", note: note});
} catch(error){
  console.log(error.message);
  res.status(500).send("Soem Error occured");
}
});

module.exports=router
