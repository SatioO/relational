(function() {
	"use strict";

	const express = require("express");
	const router = express.Router();
	const isAuthenticated = require("../middlewares/auth");
	const pool = require("../config/connect-db");

	// =================================================================
	// ====================== Relational API'S =========================
	// =================================================================

	router.get("/", isAuthenticated, (req, res) => {
		let query = "";

		if (req.user.User_Role_Id !== 1) {
			query = `SELECT *, cities.name as Con_City_Name, states.name as Con_State_Name FROM contacts INNER JOIN cities INNER JOIN states ON contacts.Con_City = cities.id AND contacts.Con_State = states.id WHERE Con_Owner = ?`;
		} else {
			query = `SELECT *, cities.name as Con_City_Name, states.name as Con_State_Name FROM contacts INNER JOIN cities INNER JOIN states ON contacts.Con_City = cities.id AND contacts.Con_State = states.id`;
		}

		pool.getConnection((err, connection) => {
			connection.query(`${query}`, [req.user.Emp_ID], (err, rows) => {
				if (err) {
					return res.status(500).json(err);
				}

				return res.status(200).json(rows);
			});
			connection.release();
		});
	});

	router.post("/create", (req, res) => {
		pool.getConnection((err, connection) => {
			connection.query(
				"INSERT INTO contacts SET ?",
				req.body,
				(err, result) => {
					if (err) {
						return res.status(500).json(err);
					}

					return res.status(200).json(result);
				}
			);
			connection.release();
		});
	});

	router.post("/update", (req, res) => {
		const contact = req.body;

		pool.getConnection((err, connection) => {
			connection.query(
				"UPDATE contacts SET Con_Title = ?, Con_Name = ?, Con_Mname = ?, Con_Surname = ?, Con_Company_Id = ?, Con_Owner = ?, Con_Department = ?, Con_Designation = ?, Con_Type = ?, Con_DOB = ?, Con_Ann_Date = ?, Con_CCode = ?, Con_Phone = ?, Con_MCode = ?, Con_Mobile = ?, Con_Email1 = ?, Con_AMCode = ?, Con_AMobile = ?, Con_Email2 = ?, Con_Address = ?, Con_Country = ?, Con_State = ?, Con_City = ?, Con_Pincode = ?, Con_Linkedin = ?, Con_Fb = ?, Con_Twitter = ?, Con_SkypeId = ?, Con_Status_Flag = ?, UpdatedBy = ?, Updated_Date = ?WHERE Con_No = ?",
				[
					contact.Con_Title,
					contact.Con_Name,
					contact.Con_Mname,
					contact.Con_Surname,
					contact.Con_Company_Id,
					contact.Con_Owner,
					contact.Con_Department,
					contact.Con_Designation,
					contact.Con_Type,
					contact.Con_DOB,
					contact.Con_Ann_Date,
					contact.Con_CCode,
					contact.Con_Phone,
					contact.Con_MCode,
					contact.Con_Mobile,
					contact.Con_Email1,
					contact.Con_AMCode,
					contact.Con_AMobile,
					contact.Con_Email2,
					contact.Con_Address,
					contact.Con_Country,
					contact.Con_State,
					contact.Con_City,
					contact.Con_Pincode,
					contact.Con_Linkedin,
					contact.Con_Fb,
					contact.Con_Twitter,
					contact.Con_SkypeId,
					contact.Con_Status_Flag,
					contact.UpdatedBy,
					new Date(),
					contact.Con_No
				],
				(err, result) => {
					if (err) {
						return res.status(500).json(err);
					}

					return res.status(200).json(result);
				}
			);
			connection.release();
		});
	});

	router.get("/search", isAuthenticated, (req, res) => {
		const q = req.query.q;

		let query = "";

		if (req.user.User_Role_Id !== 1) {
			query = `SELECT *, cities.name as Con_City, states.name as Con_State FROM contacts INNER JOIN cities INNER JOIN states ON contacts.Con_City = cities.id AND contacts.Con_State = states.id WHERE CONCAT(Con_Email1, Con_Email2, Con_Address, Con_Country, Con_State, Con_City, Con_Name, Con_MName, Con_Surname, Con_Type) LIKE ? AND Con_Owner = ?`;
		} else {
			query = `SELECT *, cities.name as Con_City, states.name as Con_State FROM contacts INNER JOIN cities INNER JOIN states ON contacts.Con_City = cities.id AND contacts.Con_State = states.id WHERE Con_Name LIKE ? OR Con_MName = ? OR Con_Surname = ? OR Con_Address = ? OR Con_Country = ? OR Con_State = ? OR Con_City =?`;
		}

		pool.getConnection((err, connection) => {
			connection.query(
				`${query}`,
				[
					`%${q}%`,
					`%${q}%`,
					`%${q}%`,
					`%${q}%`,
					`%${q}%`,
					`%${q}%`,
					`%${q}%`,
					req.user.Emp_ID
				],
				(err, rows) => {
					if (err) {
						console.log(err);
						return res.status(500).json(err);
					}
					return res.status(200).json(rows);
				}
			);
			connection.release();
		});
	});

	module.exports = router;
})();
