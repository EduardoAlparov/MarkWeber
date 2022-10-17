document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.remove('preload');

    //work of range inputs:
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    };

    document.querySelectorAll('.double-range__input_left').forEach( element => {
        element.addEventListener('input', (e) => {
            element.setAttribute('data-value', e.target.value.substring(1));
            element.closest('.double-range__half').querySelector('.double-range__min-area-value').value = '';
            element.closest('.double-range__half').querySelector('.double-range__min-area-value').value = element.getAttribute('data-value');
        })
    });

    document.querySelectorAll('.double-range__input_right').forEach( element => {
        element.addEventListener('input', (e) => {
            element.setAttribute('data-value', e.target.value);
            element.closest('.double-range__half').querySelector('.double-range__max-area-value').value = '';
            element.closest('.double-range__half').querySelector('.double-range__max-area-value').value = element.getAttribute('data-value');
        })
    });
    // ================================================

    // custom
    var cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', function(e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    });

    // swiper slider on main page:
    const swiper = new Swiper('.swiper', {
        wrapperClass: 'slider__wrapper',
        slideClass: 'slider__slide',
        slideActiveClass: 'slider__slide_active',

        parallax: true,
        speed: 1200,

        // effect: 'fade',
        // fadeEffect: {
        //   crossFade: true
        // },

        // effect: 'cards',
        // cardsEffect: {
        //     perSlideOffset: 0,
        //     perSlideRotate: 0,
        //     rotate: false,
        //     slideShadows: false,
        // },

        effect: 'coverflow',
        coverflowEffect: {
            depth: 0,
            rotate: 0,
            slideShadows: true,
            stretch: 0
          },

        navigation: {
            nextEl: '.slider__button_next',
            // prevEl: '.slider__button_prev',
        },

        on: {

            init: function () {
                document.querySelector('.slider__slide_active').querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '100%');
                document.querySelector('.slider__slide_active').querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '200%');
            },

            activeIndexChange: function() {
                document.querySelectorAll('.slider__slide').forEach( el => {
                    el.querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '0%');
                    el.querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '0%');
                })
            },

            navigationNext: function() {
                document.querySelector('.slider__slide_active').querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '100%');
                document.querySelector('.slider__slide_active').querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '200%');
            },

            reachEnd: function() {
                document.querySelector('.slider__button_prev').disabled = false;
            },

            transitionEnd: function() {
                if(swiper.isEnd) {
                    document.querySelectorAll('.slider__slide_active').forEach( el => {
                        el.querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '0%');
                        el.querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '0%');
                    })

                    document.querySelectorAll('.slider__slide').forEach( el => {
                        el.querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '0%');
                        el.querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '0%');
                    })
                }
            }
        },
    });


    document.querySelector('.slider__button_prev').addEventListener('click', () => {
        swiper.slideTo(0, 100);

        document.querySelector('.slider__button_prev').disabled = true;

        document.querySelector('.slider__slide').querySelector('.slide__background-wrapper').setAttribute('data-swiper-parallax', '100%');
        document.querySelector('.slider__slide').querySelector('.slide__info-wrapper').setAttribute('data-swiper-parallax', '200%');
    })
    // ==========================================================================

    // burger menu click handler:
    document.querySelector('.burger-menu__button').addEventListener('click', () => {
        document.body.classList.toggle('menu-opened');
    })

    document.querySelector('.modal-menu').addEventListener('click', (e) => {
        if(!e.target.closest('.modal-menu__body')) {
            document.body.classList.remove('menu-opened');
        }

        if(e.target.closest('.modal-menu__close-button')) {
            document.body.classList.remove('menu-opened');
        }
    })
    // ============================

    document.querySelector('.filter__mobile-button').addEventListener('click', () => {
        document.body.classList.toggle('filters-open');
    })

    document.querySelector('.modal-filter-bar').addEventListener('click', (e) => {
        if(e.target.closest('.modal-filter-bar__close-button')) {
            document.body.classList.remove('filters-open');
        }
    })

    document.querySelector('.filter__add-filters-button').addEventListener('click', () => {
        document.querySelector('.footer').classList.toggle('filter-open');
    })
})
