//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var firstName =req.body.fn;
  var secondName = req.body.sn;
  var email =req.body.email;

  var data ={
      members:[
        {
          email_address:email,
          status: "subscribed",
          merge_fields:{
            FNAME: firstName,
            LNAME:secondName
          }
        }
      ]

  };
  var jsonData = JSON.stringify(data);

  var options={
    url:"https://us5.api.mailchimp.com/3.0/lists/78fc259e9a",
    method :"POST",
    headers : {
      "Authorization" : "Mathi fd0cc2de5a1424a81763026489538924-us5"
    },
    body:jsonData
  };

  request(options , function(error,response,body){
      if(error){
        res.sendFile(__dirname + "/failure.html");
      }
      else{
        res.sendFile(__dirname + "/success.html");
      }
  });
  });
app.post("/failure" , function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is started");
});

//fd0cc2de5a1424a81763026489538924-us5
