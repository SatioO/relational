(function() {
	"use strict";

	const express = require("express");
	const router = express.Router();
	const pool = require("../config/connect-db");

	// =================================================================
	// ====================== Relational API'S =========================
	// =================================================================

	router.get("/", (req, res) => {
		pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM employee_master`, (err, rows) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json(rows);
			});
			connection.release();
		});
	});

	router.post("/", (req, res) => {
		const employee = req.body;

		pool.getConnection((err, connection) => {
			connection.query(
				"INSERT INTO employee_master SET ?",
				employee,
				(err, rows) => {
					if (err) {
						return res.status(500).json(err);
					}
					return res.status(200).json(rows);
				}
			);
			connection.release();
		});
	});

	router.get("/search", (req, res) => {
		const q = req.query.q;

		pool.getConnection((err, connection) => {
			connection.query(
				`SELECT * FROM employee_master WHERE CONCAT(Emp_Email1, Emp_City, Emp_Add1, Emp_State, Emp_Country, Emp_MName, Emp_Name, Emp_Surname, Emp_Phone, Emp_Pincode) LIKE ?`,
				[`%${q}%`],
				(err, rows) => {
					if (err) {
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
