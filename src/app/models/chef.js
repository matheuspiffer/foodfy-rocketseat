const db = require('../config/db')
const { date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        const query = `
        SELECT *
        FROM chefs
        `
        db.query(query, (err, results) => {
            if (err) throw 'DataBase error ' + err
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO chefs(
            name,
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3)`
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]
        db.query(query, values, (err, results) => {
            if (err) throw 'Database error ' + err
            callback()
        })
    },
    find(id, callback) {
        const query = `
        SELECT chefs.*
        FROM chefs
        WHERE chefs.id = $1`
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
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
        chefe_id=($1),
        image=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
        WHERE id = $7
        RETURNING ID`
        const values = [
            data.chefe_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
        db.query(query, values, (err, results) => {
            if (err) throw 'Database error ' + err
            callback(results.rows[0].id)
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
            if (err) throw 'Database error ' + err
            callback()
        })
    }
}