const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users( first_name, last_name, gender, contact_number, address, email_id, password) VALUES(?,?,?,?,?,?,?);`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.contact_number,
                data.address,
                data.email_id,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id,first_name, last_name, gender, contact_number, address, email_id FROM users;`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmail: (email_id, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email_id = ?`,
            [email_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

};