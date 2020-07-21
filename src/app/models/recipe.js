const db = require('../config/db')
const { date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        const query = `
        SELECT recipes.*, chefs.name AS author 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id  = recipes.chefe_id)
        `
        db.query(query, (err, results) => {
            if (err) throw 'DataBase error ' + err
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO recipes(
            chefe_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING ID`
        const values = [
            data.chefe_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
        ]
        db.query(query, values, (err, results) => {
            if (err) throw 'Database error ' + err
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        const query = `
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chefe_id)
        WHERE recipes.id = $1`
        db.query(query, [id], (err, results) => {
            if (err) throw 'Database error ' + err
            callback(results.rows[0])
        })
    },

    chefSelectOption(callback) {
        db.query(`SELECT name, id FROM chefs`, (err, results) => {
            if (err) throw 'Database error ' + err
            callback(results.rows)
        })
    }
}