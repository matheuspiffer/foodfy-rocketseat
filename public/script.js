const recipeEl = document.querySelectorAll('.recipe')
const toggleEl = document.querySelectorAll('.toggle')
const recipeDataEl = document.querySelectorAll('.recipe-data')

let show = false

toggleEl.forEach((el, index) => {
    el.addEventListener('click', () => {
        recipeDataEl[index].classList.toggle('show')
        show = !show
        const text = show ? 'ESCONDER' : 'MOSTRAR'
        el.innerHTML = text
    })
})

recipeEl.forEach((recipe, index) => {
    recipe.addEventListener('click', () => {
        window.location.href = '/recipes/' + index
    })
})
