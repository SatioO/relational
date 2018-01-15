(function() {
    "use strict";

    const express = require("express");
    const router = express.Router();
    const pool = require("../config/connect-db");

    // =================================================================
    // ========================= Store API'S ===========================
    // =================================================================

    router.get("/", (req, res) => {
        pool.getConnection((err, connection) => {
            connection.query("SELECT * FROM master_data", (err, rows) => {
                if (err) {
                    return res.json(err);
                }
                return res.status(200).json(rows);
            });
            connection.release();
        });
    });

    router.get("/countries", (req, res) => {
        pool.getConnection((err, connection) => {
            connection.query("SELECT * FROM countries", (err, rows) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(rows);
            });
            connection.release();
        });
    });

    router.get("/states", (req, res) => {
        const countryid = req.query.id;

        pool.getConnection((err, connection) => {
            connection.query(
                "SELECT * FROM states WHERE country_id = ?",
                [countryid],
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

    router.get("/cities", (req, res) => {
        const countryid = req.query.id;

        pool.getConnection((err, connection) => {
            connection.query(
                "SELECT * FROM cities WHERE state_id = ?",
                [countryid],
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
