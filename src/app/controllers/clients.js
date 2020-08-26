const Recipe = require('../models/recipe')
const Chef = require('../models/chef')
module.exports = {
    index(req, res) {
        Recipe.all(recipes => {

            return res.render('./client/index', { items: recipes })
        })
    },
    recipes(req, res) {
        Recipe.all(recipes => {
            return res.render('./client/recipes', { items: recipes })
        })
    },

    recipe(req, res) {
        const id = req.params.index;
        Recipe.find(id, recipe => {
            res.render('./client/recipe', { item: recipe })
        })
    },
    about(req, res) {
        res.render('./client/about')
    },
    async chefs(req, res){
        try{
            let results = await Chef.all()
            return res.render('./client/chefs', {chefs: results})
        }catch(err){
            console.log(err)
        }
    }
}