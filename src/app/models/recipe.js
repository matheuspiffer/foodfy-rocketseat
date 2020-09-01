const db = require('../config/db')
const { date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        const query = `
        SELECT recipes.*, chefs.name AS author 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id  = recipes.chef_id)
        `
        db.query(query, (err, results) => {
            if (err) throw 'DataBase error ' + err
            callback(results.rows)
        })
    },
    create(data) {
        try{
            const query = `
            INSERT INTO recipes(
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING ID`
            const values = [
                data.chef_id,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso,
            ]
            return db.query(query, values)
        } catch(err){
         console.error(err)
        }
    },
    find(id) {
        const query = `
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`
       return db.query(query, [id])
    },
    findByAuthor(id, callback) {
        const query = `
        SELECT recipes.*
        FROM recipes
        WHERE recipes.chef_id = $1`
        db.query(query, [id], (err, results) => {
            if (err) throw 'Database error ' + err
            callback(results.rows)
        })
    },

    chefSelectOption() {
        return db.query(`SELECT name, id FROM chefs`)
        
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
        chef_id=($1),
        image=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
        WHERE id = $7
        RETURNING ID`
        const values = [
            data.chef_id,
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
    },

     search(filter){
        let query = `SELECT recipes.*, chefs.name AS author
                FROM recipes
                LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                WHERE recipes.title ilike '%${filter}%'`

               const recipes =  db.query(query)

               return recipes.rows
    }
}