document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('.main'),
          slides = document.querySelectorAll('.slide');


    const isSelectorSupported = (selector) => {
        try {
          document.querySelector(selector)
          return true
        } catch (error) {
          return false
        }
    };

    const assignMultipleEvents = (element, events, callback) => {
        events.forEach(item => {
            element.addEventListener(`${item}`, callback)
        });
    };
    
      
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