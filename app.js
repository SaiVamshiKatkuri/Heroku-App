const express = require('express');
const bodyparser=require("body-parser");
const request=require('request');
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("*",function(req,res){

res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){
const fi=req.body.f;
const la=req.body.l;
const emailid=req.body.email;
const data={
members:[
{
email_address:emailid,
status:"subscribed",
merge_fields:{
  FNAME:fi,
  LNAME:la,
}
}
]
};
const jsonData=JSON.stringify(data);
const url='https://us10.api.mailchimp.com/3.0/lists/648f1f2a32';
const options={
method:"POST",
auth:"VK:cf18a0f80164e4e91828cc84885f39b3-us10",

}
const request=https.request(url,options,function(response){
if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}

response.on("data",function(data){
  console.log(JSON.parse(data));
})

})
request.write(jsonData);
request.end();

//cf18a0f80164e4e91828cc84885f39b3-us10
//lst
//648f1f2a32
console.log(fi,la,emailid);

});

app.post("/failure",function(request,response){
response.redirect("/");
})








 app.listen(process.env.PORT ||3000,function(){
console.log("its working");

 })
