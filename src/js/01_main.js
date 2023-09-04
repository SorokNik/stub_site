document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('.main'),
          slides = document.querySelectorAll('.slide');

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

//==========ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ НЕСКОЛЬКИХ СОБЫТИЙ СРАЗУ==========

    const assignMultipleEvents = (element, events, callback) => {
        events.forEach(item => {
            element.addEventListener(`${item}`, callback)
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
            console.log('done');
            return;
        }

        removeAnimation(min, current, max, arr)
    }


//==========ВЫЗОВ ФУНКЦИЙ==========
    slides.forEach((slide, i) => {
        assignMultipleEvents(slide, ['mouseover', 'click'], ()=>{
            const svgAnimations = slide.querySelectorAll('animateTransform');

            svgAnimations.forEach(svgAnimation => {
                svgAnimation.setAttribute('values','0; 360');
            })
            
            removeAnimation(0, i, slides.length-1, slides);
        })

        slide.addEventListener('mouseout', () => {
            slide.querySelectorAll('animateTransform').forEach(item => item.removeAttribute('values'));
            slides[0].querySelectorAll('animateTransform').forEach(svgAnimation => svgAnimation.setAttribute('values','0; 360'));
        });

    });
      
    if(!isSelectorSupported(":has(.main)")){

        assignMultipleEvents(slides[0], ['mouseover', 'click'], ()=>main.style.gridTemplateColumns = '2fr 0.2fr 0.2fr 0.2fr 1fr');
        assignMultipleEvents(slides[1], ['mouseover', 'click'], ()=>main.style.gridTemplateColumns = '0.75fr 2fr 0.2fr 0.2fr 1fr');
        assignMultipleEvents(slides[2], ['mouseover', 'click'], ()=>main.style.gridTemplateColumns = '0.75fr 0.2fr 2fr 0.2fr 1fr');
        assignMultipleEvents(slides[3], ['mouseover', 'click'], ()=>main.style.gridTemplateColumns = '0.75fr 0.2fr 0.2fr 2fr 1fr');
        assignMultipleEvents(slides[4], ['mouseover', 'click'], ()=>main.style.gridTemplateColumns = '0.35fr .15fr .15fr .15fr 2fr');        

        slides.forEach(slide => {
            slide.addEventListener('mouseout', () => {
                main.style.gridTemplateColumns = '2fr 0.2fr 0.2fr 0.2fr 1fr';
            })
        });
    }


});