const fs = require('fs')
const data = require('./data.json')
// const { age, date, since } = require('../utils')
// const { parse } = require('path')

exports.index = (req, res) => {
    return res.render('admin/index', { items: data.recipes })
}

exports.create = (req, res) => {
    return res.render('admin/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    keys.forEach(key => {
        if (!req.body[key]) {
            return res.send('please fill the ' + ' field')
        }
    })
    let id = 1
    let lastMember = data.recipes[data.recipes.length - 1]
    if (lastMember) id = lastMember.id + 1

    const recipe = {
        ...req.body,
        id
    }
    data.recipes.push(recipe)
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('writeFile error')
        return res.redirect('recipes/' + id)
    })
}

exports.show = (req, res) => {
    const { id } = req.params
    const foundRecipe = data.recipes.find(recipe => {
        return recipe.id == id
    })
    if (!foundRecipe) return res.send('Recipe not found.')

    res.render('admin/show', { item: foundRecipe })
}

exports.edit = (req, res) => {
    const { id } = req.params
    const foundRecipe = data.recipes.find(recipe => {
        return recipe.id == id
    })
    if (!foundRecipe) return res.send('Recipe not found.')

    console.log(foundRecipe)

    res.render('admin/edit', { item: foundRecipe })
}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0
    console.log(id)
    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        if (recipe.id == id) {
            index = foundIndex
            return true
        }
    })
    if (!foundRecipe) return res.send('Recipe not found')
    const updatedRecipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }
    data.recipes[index] = updatedRecipe
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send("Write File error")
        return res.redirect('recipes/' + id)
    })

}

exports.delete =(req, res)=>{
    const {id} = req.body
    const filteredRecipes = data.recipes.find(recipe=> recipe.id != id)
    data.recipes = filteredRecipes
    fs.writeFile('data.json', JSON.stringify(data, null,2), err=>{
        if(err)return res.send("Write file error")
        return res.redirect('recipes')
    })
    

}