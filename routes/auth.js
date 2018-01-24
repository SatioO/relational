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
				`SELECT 
					User_Role_Id, 
					Emp_Master_No, 
					Emp_ID,
					Emp_Name,
					Emp_MName,
					Emp_Surname,
					Emp_Email1,
					Emp_Pic_Upload, 
					cities.name as Emp_City_Name, 
					states.name as Emp_State_Name 
					FROM user_master INNER JOIN employee_master INNER JOIN cities INNER JOIN states 
					ON user_master.User_Master_No = employee_master.Emp_Master_No 
					AND employee_master.Emp_City = cities.id 
					AND employee_master.Emp_State = states.id WHERE User_Login = ? AND User_Password=?`,
				[username, password],
				(err, user) => {
					if (err) {
						return res.status(500).json(err);
					}

					if (!!user && user.length > 0) {
						// append token in the response
						user[0].Token = jwt.sign(user[0], config.jwt_secret, {
							expiresIn: 86400
						});

						return res.status(200).json(user[0]);
					}

					return res.status(200).json(null);
				}
			);
		});
	});

	module.exports = router;
})();
