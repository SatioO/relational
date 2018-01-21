(function() {
	"use strict";

	const express = require("express");
	const router = express.Router();
	const pool = require("../config/connect-db");

	// =================================================================
	// ====================== Relational API'S =========================
	// =================================================================

	router.post("/list", (req, res) => {
		const fields = req.body.fields ? req.body.fields : "*";

		pool.getConnection((err, connection) => {
			connection.query(`SELECT ${fields} FROM business_master`, (err, rows) => {
				if (err) {
					return res.status(500).json(err);
				}

				return res.status(200).json(rows);
			});
			connection.release();
		});
	});

	module.exports = router;
})();
