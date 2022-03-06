const express=require("express")
const app=express()
const bodyParser=require("body-parser")

module.exports=app.use(bodyParser.json({
	verify: function (req, res, buf) {
	  var url = req.originalUrl;
	  if (url.startsWith('/users/webhook')) {
		 req.rawBody = buf.toString();
	  }
	}
  }));