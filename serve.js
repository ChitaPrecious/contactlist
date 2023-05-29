const express=require("express")
const mongoose=require("mongoose")
const port=2012
const app=express()
app.use(express.json())
const contactSchma=new mongoose.Schema({
        name:String,
        gender:String,
        number:Number,
        
})
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to my page",
    
    })
})
const user=mongoose.model("contactbook",contactSchma)
//creating a data in our database
app.post("/createuser",async(req,res)=>{
    const newResult=await new user(req.body)
  newResult.save()
    res.status(200).json (newResult)
})
//retrieving data
app.get("/getall",async(req,res)=>{
    const All=await user.find()
    res.status(200).json(
        {
            message:"the available contacts are "+All.length,
            data:All
        }
    )
})
//retrieve a single user
app.get("/getOne/:id",async(req,res)=>{
    const id=req.params.id
    const Oneuser=await user.findById(id)
    res.status(200).json({
        message:`kindly find this contact of the user with the id of ${id}`,
        data:Oneuser}
    )
})
//delete one
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const deleteuser=await user.findByIdAndDelete(id)
    res.status(200).json({
        message:`the contact with this id  ${id} has been deleted`,
        data:deleteuser}
    )
})

// //update a user
// app.post("/update/:id",async(req,res)=>{
//     const id=req.params.id
//     const updateuser=await user.findByIdAndUpdate(id)
//     res.status(200).json ({
//         message:`this info has been updated`
        
//     })
// })

mongoose.connect("mongodb+srv://preciouschita37:OLiBbFgDz9JdsclA@cluster0.xfxpksl.mongodb.net/")
.then(()=>{
   console.log("connection to database is successful")
})


app.listen(port,()=>{
    console.log(`server is listening to port  ${port}`)
})