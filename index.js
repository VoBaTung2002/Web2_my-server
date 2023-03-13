const express=require("express")
const fileUpload = require('express-fileupload')
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))  

app.use(
    fileUpload({
      limits: {
        fileSize: 10000000,
      },
      abortOnLimit: true,
    })
);
  
  // Add this line to serve our index.html page
app.use(express.static("public"));

const cors= require("cors")
app.use(cors())

app.get("/image/:id", cors(), (req, res) => {
    id = req.params["id"];
    console.log("upload/" + id);
    res.sendFile(__dirname + "/upload/" + id);
});
  
app.post("/upload", (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    image.mv(__dirname + "/upload/" + image.name);
    // All good
    res.sendStatus(200);
});

app.get("/",(req,res)=>{
    res.send("Hello Restful API")
})
app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})


let database= require("./database.json")
app.get("/books", cors(), (req,res)=>{
    res.send(database)
})

app.get("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    let p=database.find(x=>x.sachID==id)
    res.send(p)
})

app.post("/books",cors(),(req,res)=>{
    //put json book into database
    database.push(req.body);
    //send message to client(send all database to client)
    res.send(database)
})

app.put("/books",cors(),(req,res)=>{
    book=database.find(x=>x.sachID==req.body.sachID)
    if(book!=null)
    {
        book.tenSach = req.body.tenSach;
        book.giaBan = req.body.giaBan;
        book.moTa = req.body.moTa;
        book.anhBia = req.body.anhBia;
        book.ngayCapNhat = req.body.ngayCapNhat;
        book.soLuongTon = req.body.soLuongTon;
        book.maCD = req.body.maCD;
        book.maNXB = req.body.maNXB;
    }
    res.send(database)
})

app.delete("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    database = database.filter(x => x.sachID !== id);
    res.send(database)
})
    

    
