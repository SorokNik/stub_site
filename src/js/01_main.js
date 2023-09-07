document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('.main'),
          slides = document.querySelectorAll('.slide'),
          body = document.querySelector('body'),
          startHeader = document.querySelector('.header-start-mob'),
          startHeaderDescr = document.querySelector('.header__descr-start-mob'),
          startHeaderLogo = document.querySelector('.header__logo-start-mob'),
          startPic = document.querySelector('.slide-1-start-mob'),
          startSlide = document.querySelector('.slide__pic-1-start-mob'),
          startSwirl =  document.querySelector('.swirl-r-1-start-mob');

//==========ОБЪЯВЛЕНИЕ ФУНКЦИЙ==========

slides[0].querySelectorAll('animateTransform').forEach(svgAnimation => svgAnimation.setAttribute('values','0; 360'));

//==========ПРОВЕРКА НА ТО, ПОДДЕРЖИВАЕТСЯ ЛИ КАКОЙ-ТО ФУНКЦИОНАЛ БРАУЗЕРОМ ИЛИ НЕТ==========

    const isSelectorSupported = (selector) => {
        try {
          document.querySelector(selector)
          return true
        } catch (error) {
          return false
        }
    };

//==========ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ СЛУШАТЕЛЯ НЕСКОЛЬКИХ СОБЫТИЙ СРАЗУ==========

    const assignMultipleEvents = (element, events, callback) => {
        events.forEach(item => {
            element.addEventListener(`${item}`, callback)
        });
    };

//==========ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ СЛУШАТЕЛЯ НЕСКОЛЬКИХ СОБЫТИЙ СРАЗУ==========

    const removeMultipleEvents = (element, events, callback) => {
        events.forEach(item => {
            element.removeEventListener(`${item}`, callback)
        });
    };

//==========ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ АНИМАЦИИ С НЕАКТИВНЫХ БЛОКОВ==========    
    const removeAnimation = (min, current, max, arr) => {

        if(min<current){
            arr[min].querySelectorAll('animateTransform').forEach(item => item.removeAttribute('values'));
            min = min + 1;
        }

        if(max>current){
            arr[max].querySelectorAll('animateTransform').forEach(item => item.removeAttribute('values'));
            max = max - 1;
        }

        if(min === current && max === current){
            return;
        }

        removeAnimation(min, current, max, arr)
    }

//==========ФУНКЦИЯ ДЛЯ РАБОТЫ ФУНКЦИОНАЛА ЛЕНДА, КОГДА :HAS НЕ РАБОТАЕТ==========     

    const hasNotSupported = (min, current, max, cssDeskClass, cssTabLanClass, cssTabPorClass, cssMobClass, wrapper) => {

        function removeExcessClass (val) {

            wrapper.classList.remove(`${wrapper.classList.contains(`${cssDeskClass}${val}`) ? cssDeskClass :
                                        wrapper.classList.contains(`${cssTabLanClass}${val}`) ? cssTabLanClass :
                                        wrapper.classList.contains(`${cssTabPorClass}${val}`) ? cssTabPorClass :
                                        wrapper.classList.contains(`${cssMobClass}${val}`) ? cssMobClass : true}${val}`);

        }

        if(min<current){

            removeExcessClass(min);
            removeExcessClass(min+1);

            min = min + 1;
        }
        
        if(max>current){

            removeExcessClass(max);
            removeExcessClass(max-1);

            max = max - 1;
        }
        
        if(min === current && max === current){

            wrapper.classList.add(`${body.clientWidth>1199 ? cssDeskClass :
                body.clientWidth>575 && body.clientWidth<=1199 && body.clientWidth/body.clientHeight > 1 ? cssTabLanClass :
                body.clientWidth>575 && body.clientWidth<=1199 && body.clientWidth/body.clientHeight < 1 ? cssTabPorClass :
                body.clientWidth<=575 && body.clientWidth/body.clientHeight < 1 ? cssMobClass : cssDeskClass}${current}`);

            return;           
        }


        hasNotSupported(min, current, max, cssDeskClass, cssTabLanClass, cssTabPorClass, cssMobClass, wrapper);
    }

//==========ВЫЗОВ ФУНКЦИЙ==========
    slides.forEach((slide, i) => {
        assignMultipleEvents(slide, ['mouseover', 'click'], ()=>{
            const svgAnimations = slide.querySelectorAll('animateTransform');

            svgAnimations.forEach(svgAnimation => {
                svgAnimation.setAttribute('values','0; 360');
            })

            if(body.clientWidth < 575) {
                startHeader.classList.remove('header-start-mob');
                startHeaderDescr.classList.remove('header__descr-start-mob');
                startHeaderLogo.classList.remove('header__logo-start-mob');
                startPic.classList.remove('slide-1-start-mob');
                startSlide.classList.remove('slide__pic-1-start-mob');
                startSwirl.classList.remove('swirl-r-1-start-mob');
            }          
            
            removeAnimation(0, i, slides.length-1, slides);
        })

        slide.addEventListener('mouseout', () => {
            slide.querySelectorAll('animateTransform').forEach(item => item.removeAttribute('values'));
            slides[0].querySelectorAll('animateTransform').forEach(svgAnimation => svgAnimation.setAttribute('values','0; 360'));
        });
        
        if(!isSelectorSupported(":has(.main)")){

                assignMultipleEvents(slide, ['mouseover', 'click'], () => {               
                    hasNotSupported(1, i+1, slides.length, 'has-not-supported__desk-', 'has-not-supported__tab-lan-', 'has-not-supported__tab-por-', 'has-not-supported__mob-', main);
                });

                assignMultipleEvents(window, ['resize', 'orientationchange'], () => {    
                    
                    if(body.clientWidth > 575) {
                        startHeader.classList.add('header-start-mob');
                        startHeaderDescr.classList.add('header__descr-start-mob');
                        startHeaderLogo.classList.add('header__logo-start-mob');
                        startPic.classList.add('slide-1-start-mob');
                        startSlide.classList.add('slide__pic-1-start-mob');
                        startSwirl.classList.add('swirl-r-1-start-mob');
                    } 

                    hasNotSupported(1, 1, slides.length, 'has-not-supported__desk-', 'has-not-supported__tab-lan-', 'has-not-supported__tab-por-', 'has-not-supported__mob-', main);
                });

                slide.addEventListener('mouseout', () => main.classList.remove(`has-not-supported__desk-${i+1}`));
            
        }

    });

});