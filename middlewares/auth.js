const config = require("../config");
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
	// check header or url parameters or post parameters for token
	const token = req.headers["x-access-token"];
	const TOKENSECRET = config.jwt_secret;

	// decode token
	if (!!token) {
		// verifies secret and checks exp
		jwt.verify(token, TOKENSECRET, (err, user) => {
			if (err) {
				return res.status(401).json({
					responseDesc: "Failed to Authenticate Token.",
					data: err
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.user = user;
				next();
			}
		});
	} else {
		// if there is no token return an error
		return res.status(401).json({
			responseDesc: "No token provided.",
			data: null
		});
	}
}

module.exports = isAuthenticated;
