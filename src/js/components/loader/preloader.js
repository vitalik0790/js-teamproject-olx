const preloaderLink = document.querySelector('.preloader')
const preloaderWrapper = document.querySelector('.preloader-wrapper')

export function preloader() {
    window.addEventListener('load', function () {
        // preloaderWrapper.classList.toggle('loaded-hidding')
        preloaderWrapper.classList.toggle('hidden')
        window.setTimeout(function () {
            preloaderWrapper.classList.toggle('hiden');
        }, 2000);

    })
    // window.onload = function () {
    //     preloaderWrapper.classList.add('loaded-hiden');
    //     // preloaderWrapper.classList.add('loaded-hiden');
    //     window.setTimeout(function () {
    //         preloaderWrapper.classList.add('hiden');
    //         preloaderWrapper.classList.remove('loaded-hiden');
    //     }, 1300);
    // }
}



