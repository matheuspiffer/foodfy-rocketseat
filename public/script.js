const recipeEl = document.querySelectorAll('#recipe')
const toggleEl = document.querySelectorAll('.toggle')
const recipeDataEl = document.querySelectorAll('.recipe-data')

let show = false

toggleEl.forEach((el, index) => {
    el.addEventListener('click', () => {
        recipeDataEl[index].classList.toggle('show')
        const text = el.innerHTML === 'ESCONDER' ? 'MOSTRAR' : 'ESCONDER'
        el.innerHTML = text
    })
})

recipeEl.forEach((recipe, index) => {
    recipe.addEventListener('click', () => {
        window.location.href = '/recipes/' + index
    })
})
