
export function loading() {
    const baton = document.querySelectorAll('button')
    const div = `<div class="ld ld-ring ld-spin"></div>`
    const classes = ['btn', 'btn-primary', 'ld-ext-right'];
    const newClass = baton.forEach(elem => elem.classList.add(...classes));
    baton.forEach(elem => elem.onclick = function () {
        elem.insertAdjacentHTML('beforeend', div)
        this.classList.toggle('running')
        setTimeout(() => {
            this.classList.toggle('running')
        }, 400)
    })
}