
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',()=>{
})

app.post('/api/forma', (req,res) => {
  let data =req.body
  let smtpTransport = nodemailer.createTransport({
    service:'Gmail',
    port:465,
    auth:{
      user:process.env.REACT_APP_EMAIL,
      pass:process.env.REACT_APP_PASS
    }
  });


let mailOptions={
  from:data.email,
  to:'stefanmihai2919@gmail.com',
  subject:`Message from ${data.firstname} ${data.lastname}`,
  html:`
      <h3>Information</h3>
      <ul>
        <li>FirstName: ${data.firstname}</li>
        <li>LastName: ${data.lastname}</li>
        <li>E-mail: ${data.email}</li>
        <li>Phone: ${data.phone}</li>
        <li>TypeOfSite: ${data.typeOfSite}</li>
      </ul>
      <h3>Message</h3>
      <p>${data.message}</p>
  
  `
};

smtpTransport.sendMail(mailOptions, (error,response)=>{ 
  if(error){
    res.send(error);
  }
  else{
    res.send('success')
  }
})

smtpTransport.close();

})

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server starting at port : ${PORT}`);
})