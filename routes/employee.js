(function() {
	"use strict";

	const express = require("express");
	const fs = require("fs-extra");
	const pool = require("../config/connect-db");
	const { multer, isAuthenticated } = require("../middlewares");
	const router = express.Router();

	// =================================================================
	// ====================== Relational API'S =========================
	// =================================================================

	router.get("/", (req, res) => {
		pool.getConnection((err, connection) => {
			connection.query(
				`SELECT *, cities.name as Emp_City_Name, states.name as Emp_State_Name FROM employee_master INNER JOIN cities INNER JOIN states ON employee_master.Emp_City = cities.id AND employee_master.Emp_State = states.id`,
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

	router.post("/", isAuthenticated, (req, res) => {
		const employee = req.body.employee;
		pool.getConnection((err, connection) => {
			connection.query(
				"INSERT INTO employee_master SET ?",
				employee,
				(err, rows) => {
					if (err) {
						return res.status(500).json(err);
					}
					const srcpath = `uploads/${req.user.Emp_Name}${
						req.user.Emp_Surname
					}/${employee.Emp_Pic_Upload}`;
					const dstpath = `uploads/${employee.Emp_Name}${
						employee.Emp_Surname
					}/${employee.Emp_Pic_Upload}`;
					fs.move(srcpath, dstpath, err => {
						if (err) return res.status(500).json(err);
						return res.status(200).json(rows);
					});
				}
			);
			connection.release();
		});
	});

	router.put("/", isAuthenticated, (req, res) => {
		const employee = req.body.employee;
		console.log(employee.Emp_ID);
		pool.getConnection((err, connection) => {
			connection.query(
				"UPDATE employee_master SET Emp_Title = ?, Emp_Name = ?, Emp_MName = ?, Emp_Surname = ?, Emp_Gender = ?, Emp_DOB = ?, Emp_Pic_Upload = ?, Emp_Marital_Status = ?, Emp_BloodG = ?, Emp_DOAnni = ?, Emp_DOJ = ?, Emp_DOR = ?, Emp_CCode = ?, Emp_Phone = ?, Emp_MCode = ?, Emp_Mobile = ?, Emp_AMCode = ?, Emp_AMobile = ?, Emp_Email1 = ?, Emp_Email2 = ?, Emp_Linkedin = ?, Emp_Twitter = ?, Emp_FB = ?, Emp_Add1 = ?, Emp_Country = ?, Emp_State = ?, Emp_City = ?, Emp_Pincode = ?, Emp_Add2 = ?, Emp_Country2 = ?, Emp_State2 = ?, Emp_City2 = ?, Emp_Pincode2 = ?, Emp_PAN = ?, Emp_Adhar = ?, Emp_Bank_Name = ?, Emp_Bank_AccNo = ?, Emp_IFSC_Code = ?, Emp_Pass_No = ?, Emp_Pass_Expiry = ?, Emp_Pass_Upload = ?, Emp_FC1_Name = ?, Emp_FC1_Relation = ?, Emp_FC1_Email = ?, Emp_FC2_Name = ?, Emp_FC2_Relation = ?, Emp_FC2_Email = ?, Emp_FC3_Name = ?, Emp_FC3_Relation = ?, Emp_FC3_Email = ?, Emp_FC4_Name = ?, Emp_FC4_Relation = ?,  Emp_FC4_Email = ?, Emp_FC5_Name = ?, Emp_FC5_Relation = ?, Emp_FC5_Email = ?, Emp_FC6_Name = ?, Emp_FC6_Relation = ?, Emp_FC6_Email = ?, Emp_Ref1_Name = ?, Emp_Ref1_Company = ?, Emp_Ref1_Phone = ?, Emp_Ref2_Name = ?, Emp_Ref2_Company = ?, Emp_Ref2_Phone = ?, Emp_Status = ?, UpdatedBy = ? WHERE Emp_ID = ?",
				[
					employee.Emp_Title,
					employee.Emp_Name,
					employee.Emp_MName,
					employee.Emp_Surname,
					employee.Emp_Gender,
					employee.Emp_DOB,
					employee.Emp_Pic_Upload,
					employee.Emp_Marital_Status,
					employee.Emp_BloodG,
					employee.Emp_DOAnni,
					employee.Emp_DOJ,
					employee.Emp_DOR,
					employee.Emp_CCode,
					employee.Emp_Phone,
					employee.Emp_MCode,
					employee.Emp_Mobile,
					employee.Emp_AMCode,
					employee.Emp_AMobile,
					employee.Emp_Email1,
					employee.Emp_Email2,
					employee.Emp_Linkedin,
					employee.Emp_Twitter,
					employee.Emp_FB,
					employee.Emp_Add1,
					employee.Emp_Country,
					employee.Emp_State,
					employee.Emp_City,
					employee.Emp_Pincode,
					employee.Emp_Add2,
					employee.Emp_Country2,
					employee.Emp_State2,
					employee.Emp_City2,
					employee.Emp_Pincode2,
					employee.Emp_PAN,
					employee.Emp_Adhar,
					employee.Emp_Bank_Name,
					employee.Emp_Bank_AccNo,
					employee.Emp_IFSC_Code,
					employee.Emp_Pass_No,
					employee.Emp_Pass_Expiry,
					employee.Emp_Pass_Upload,
					employee.Emp_FC1_Name,
					employee.Emp_FC1_Relation,
					employee.Emp_FC1_Email,
					employee.Emp_FC2_Name,
					employee.Emp_FC2_Relation,
					employee.Emp_FC2_Email,
					employee.Emp_FC3_Name,
					employee.Emp_FC3_Relation,
					employee.Emp_FC3_Email,
					employee.Emp_FC4_Name,
					employee.Emp_FC4_Relation,
					employee.Emp_FC4_Email,
					employee.Emp_FC5_Name,
					employee.Emp_FC5_Relation,
					employee.Emp_FC5_Email,
					employee.Emp_FC6_Name,
					employee.Emp_FC6_Relation,
					employee.Emp_FC6_Email,
					employee.Emp_Ref1_Name,
					employee.Emp_Ref1_Company,
					employee.Emp_Ref1_Phone,
					employee.Emp_Ref2_Name,
					employee.Emp_Ref2_Company,
					employee.Emp_Ref2_Phone,
					employee.Emp_Status,
					employee.UpdatedBy,
					employee.Emp_ID
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

	router.post(
		"/upload",
		isAuthenticated,
		multer.single("photos"),
		(req, res) => {
			if (!req.file) {
				return res.send({
					success: false
				});
			} else {
				return res.send({
					success: true
				});
			}
		}
	);

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
