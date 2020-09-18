const db = require("../config/db");
const {hash} = require('bcryptjs')
const crypto = require('crypto')

module.exports = {
    async create(data){
        try{
            const query = `
            INSERT INTO users(
                name,
                email,
                password,
                is_admin
            ) VALUES ($1, $2, $3, $4)`
            const password = crypto.randomBytes(10).toString('hex')
            const values = [
                data.name,
                data.email,
                password,
                data.admin
            ]
            await db.query(query, values)
            return
        }
        catch(err){
            console.error(err)
        }
    }

}