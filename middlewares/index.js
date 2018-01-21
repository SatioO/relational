const isAuthenticated = require("./auth");
const upload = require("./multer");

module.exports = {
	isAuthenticated: isAuthenticated,
	multer: upload
};
