// const fs = require('fs')
const data = require('./data.json')
// const { age, date, since } = require('../utils')
// const { parse } = require('path')

exports.index = (req, res) => {
    return res.render('admin/index', { items: data })
}

exports.create = (req, res) => {
    return res.render('admin/create')
}