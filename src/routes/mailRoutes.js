const Mailer = require('../services/mailer');
const mailTemplate = require('../services/mailTemplate');
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
var youtubeStream = require('youtube-audio-stream');
var multer  = require('multer')
var upload = multer({ dest: 'static/' })
var mv = require('mv');
var fs = require('fs');

cloudinary.config({
		cloud_name: "dcdnt",
		api_key: "271692222816783",
		api_secret: "DhgKXiXYQqQj0nEB74w_70HfPWI"
});

module.exports = app => {

	app.post("/api/send_email", async (req, res) => {
    console.log("send email")
     const mailer = new Mailer({
       subject: "text",
       recipients: [{email: "mikhailpro4@gmail.com"}]
     }, mailTemplate({body: "test"}));

     try {
      await mailer.send();
    } catch (err) {
      res.status(422).send(err);
    }
	});

    app.post("/api/upload", function (req, res) {
			// console.log(req.files.file)
			var file = req.files.file
			var newFileName = req.files.file.name.replace(/\s/g, '')

			var filePath = 'static/uploads/' + newFileName

			file.mv(filePath, function(err) {


				cloudinary.v2.uploader.upload_large(
					filePath,
					{ resource_type: "video" },
					function(error, result) {
						console.log(result, error);
						fs.unlinkSync(filePath);
						return res.send({uploaded: "ok", result: result});

				});


		  });

    });
};
