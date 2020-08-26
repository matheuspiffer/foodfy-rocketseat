const Recipe = require('../models/recipe')

module.exports = {

    async index(req, res){
        try{
            const {filter} = req.query
            if(!filter) return res.redirect('/recipes')
            let items = await Recipe.search(filter)
            const search = {
                term: req.query.filter
            }
            return res.render('./client/search', {items, search})

        }catch(err){rs
            console.error(err)
        }
    }
}