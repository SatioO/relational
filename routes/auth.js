(function() {
	"use strict";

	const express = require("express");
	const router = express.Router();
	const config = require("../config");
	const pool = require("../config/connect-db");
	const jwt = require("jsonwebtoken");
	const bcrypt = require("bcryptjs");

	router.post("/login", (req, res) => {
		const [username, password] = [req.body.User_Login, req.body.User_Password];

		pool.getConnection((err, connection) => {
			connection.query(
				`SELECT * FROM user_master INNER JOIN user_role INNER JOIN user_rolemaster ON user_master.UserId = user_role.user_id AND user_rolemaster.RoleId = user_role.role_id WHERE User_Login = ? AND User_Password = ?`,
				[username, password],
				(err, user) => {
					if (err) {
						return res.status(500).json(err);
					}

					if (!!user && user.length > 0) {
						const user_info = {
							UserId: user[0].UserId,
							User_Login: user[0].User_Login,
							Created_Date: user[0].Created_Date,
							Updated_Date: user[0].Updated_Date,
							RoleName: user[0].RoleName,
							Role_Status: user[0].Role_Status
						};

						// append token in the response
						user_info.Token = jwt.sign(user[0], config.jwt_secret, {
							expiresIn: 86400
						});

						return res.status(200).json(user_info);
					}

					return res.status(200).json(null);
				}
			);
		});
	});

	module.exports = router;
})();
