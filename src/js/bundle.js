import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { ScrollSmoother } from "gsap/ScrollSmoother"; // в базовой версии недоступен из пакета и подключается отдельно

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if(!ScrollTrigger.isTouch){

        ScrollSmoother.create({
            wrapper: '.wrapper', // оболочка, где будет плавный скролл
            content:  '.content', // контент, который будет "плавать"
            smooth: 1.5,
            effects: true // для указания отдельным блокам скорости:
            // data-speed - скорость, относительно единицы (1)
            // data0lag - задержка, относительно единицы (1)
        });

        // анимация: при скролле вниз заголовок и большая картинка плавно исчезают
        // fromBars - значение до анимации
        // toVars - значение в процессе скролла
        gsap.fromTo('.hero-section', {opacity: 1}, {
            opacity: 0,
            scrollTrigger: {
                trigger: '.hero-section', // эл-т триггера (тот эд-т, который появляется в поле зрения и будут происходить следующие события:)
                start: 'center', // начинаем анимацию, когда эл-т находится в центре
                end: '820', // где эл-т находится, когда совершили действие
                scrub: true // возвращаем предыдущее значение (когда листаем обратно, то эл-т снова появится)
            }
        });

        // анимация: эл-т портфолио собирались с боков и становились видимыми
        const itemsL = gsap.utils.toArray('.gallery__left .gallery__item'); // массив эл-тов
        itemsL.forEach(item => {
            gsap.fromTo(item, {x: -50, opacity: 0}, {
                opacity: 1, x: 0,
                scrollTrigger: {
                    trigger: item,
                    start: '-850',
                    end: '-100',
                    scrub: true
                }
            });
        })

        const itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
        itemsR.forEach(item => {
            gsap.fromTo(item, {x: 50, opacity: 0}, {
                opacity: 1, x: 0,
                scrollTrigger: {
                    trigger: item,
                    start: '-850',
                    end: '-100',
                    scrub: true
                }
            });
        })
    }

});