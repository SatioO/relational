const multer = require("multer");
const fs = require("fs-extra");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		fs.ensureDir(
			`tmp/uploads/${req.user.Emp_Name}${req.user.Emp_Surname}/`,
			(err, exists) => {
				if (err) {
					return cb(err, null);
				}
				return cb(
					null,
					`tmp/uploads/${req.user.Emp_Name}${req.user.Emp_Surname}/`
				);
			}
		);
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({
	storage: storage
});

module.exports = upload;
