const Recipe = require('../models/recipe')
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
    }
}