export default (() => {
    const searchBtnRef = document.querySelector('[data-menu-button]');
    const mobileSearchRef = document.querySelector('[data-menu]');

    searchBtnRef.addEventListener('click', () => {
        const expanded = searchBtnRef.getAttribute("aria-expanded") === "true" || false;

        searchBtnRef.classList.toggle("is-open");
        searchBtnRef.setAttribute("aria-expanded", !expanded);

        mobileSearchRef.classList.toggle("is-open")
    });
})();

