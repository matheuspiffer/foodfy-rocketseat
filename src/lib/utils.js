module.exports = {
    age(timestamp) {
        const today = new Date
        const birthDay = new Date(timestamp)

        let age = today.getFullYear() - birthDay.getFullYear()
        const month = today.getMonth() - birthDay.getMonth()
        const day = today.getDate - birthDay.getDate()

        if (month < 0 || month == 0 && day < 0) {
            age -= 1
        }
        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1
        const day = `0${date.getUTCDate()}`.slice(-2)
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: day + '/' + month,
            format: `${day}/${month}/${year}`

        }
    },
    since(timestamp) {
        const since = new Date(timestamp)
        const month = since.getUTCMonth() + 1 < 10 ? `0${since.getUTCMonth() + 1}` : since.getUTCMonth() + 1
        const year = since.getUTCFullYear()
        const day = `0${since.getUTCDate()}`.slice(-2)
        const dateFormated = `${day}/${month}/${year}`
        return dateFormated

    }
} 