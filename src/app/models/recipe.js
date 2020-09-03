const db = require('../config/db')
const { date } = require('../../lib/utils')
module.exports = {
    all() {
        const query = `
        SELECT recipes.*, chefs.name AS author 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id  = recipes.chef_id)
        ORDER BY created_at ASC
        `
        return db.query(query)
    },
    create(data) {
        try{
            const query = `
            INSERT INTO recipes(
                chef_id,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING ID`
            const values = [
                data.chef_id,
                data.title,
                data.ingredients,
                data.preparation,
                data.information
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
    findByAuthor(id) {
        const query = `
        SELECT recipes.*
        FROM recipes
        WHERE recipes.chef_id = $1`
        return db.query(query, [id])
    },

    chefSelectOption() {
        return db.query(`SELECT name, id FROM chefs`)
    },
    update(data) {
        const query = `
        UPDATE recipes SET
        chef_id=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
        WHERE id = $6
        RETURNING ID`
        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
       return db.query(query, values)
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