
const Chef = require('../models/chef')
const Recipe = require('../models/recipe')
const { age, date, since } = require('../../lib/utils')

exports.index = (req, res) => {
    Chef.all(chefs => {
        return res.render('admin/chefs/index', { chefs })
    })
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    keys.forEach(key => {
        if (!req.body[key]) {
            return res.send('please fill the ' + ' field')
        }
    })
    Chef.create(req.body, () => {
        return res.redirect('/admin/chefs')
    })

}

exports.show = (req, res) => {
    const { id } = req.params
    Chef.find(id, chef => {
        Recipe.findByAuthor(id, recipes => {
            return res.render('admin/chefs/show', { chef, recipes })
        })
    })

}

exports.edit = (req, res) => {
    const { id } = req.params
    Chef.find(id, chef => {
        return res.render('admin/chefs/edit', { chef, })
    })
}

exports.put = (req, res) => {
    console.log(req.body)
    Chef.update(req.body, (id) => {
        return res.redirect('chefs/' + id)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body
    Chef.delete(id, () => {
        return res.redirect('chefs')
    })
}