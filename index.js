import i18Obj from './js/translate.js';

document.addEventListener("DOMContentLoaded", function() {
  // Открываем/закрываем бургер
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile_menu');
  burger.addEventListener("click", function(e) {
    toggleMenu(e.target, mobileMenu);
  });
  // Закрываем меню при выборе пункта меню
  const linksArray = mobileMenu.querySelectorAll('a');
  linksArray.forEach(function(link) {
    link.addEventListener("click", function(e) {
      toggleMenu(burger, mobileMenu);
    });
  });
  // Переключаем тему
  const switcherTheme = document.querySelector('.switcher_theme');
  switcherTheme.addEventListener("click", (e) => {
    document.body.classList.toggle('light_theme');
    const theme = document.body.classList.contains('light_theme') ? 'light' : '';
    localStorage.setItem('theme', theme);
  });
  // Переключаем портфолио
  const portfolioButtons = document.querySelectorAll('.portfolio_buttons button');
  portfolioButtons.forEach(function(button) {    
    button.addEventListener("click", function(e) {
      if(!e.target.classList.contains('active')) {
        changeImages(e.target.dataset.tab);
        removeClassCollection(portfolioButtons, 'active');
        e.target.classList.add('active');
      }
    });    
  });

  //Переключаем язык
  const langButtons = document.querySelectorAll('.header_lang span');
  langButtons.forEach(function(langButton) {
    langButton.addEventListener("click", function(e) {
      if(!e.target.classList.contains('active')) {
        translate(e.target.dataset.lang);
        removeClassCollection(langButtons, 'active');
        e.target.classList.add('active');
        localStorage.setItem('lang', e.target.dataset.lang)
      }
    });
  });

  const buttons = document.querySelectorAll('.ripple');
  buttons.forEach(function(button) {
    button.addEventListener('click', function (e) {
      const x = e.pageX;
      const y = e.pageY;
      
      const circle = document.createElement('span');
      circle.style.top = y - button.offsetTop + "px";
      circle.style.left = x - button.offsetLeft + "px";
      circle.classList.add('circle');
      button.append(circle);
      const timer = setTimeout(() => {
        circle.remove();
        clearTimeout(timer)
      }, 500);
    });
  });  
});

function removeClassCollection(collection, className) {
  collection.forEach(function(item) {
    item.classList.remove(className);
  });
}

function changeImages(folder) {
  const portfolioImages = document.querySelectorAll('.portfolio_images img');
  portfolioImages.forEach(function(image, index) {
    image.src = `images/${folder}/${index + 1}.jpg`;
  });
}

function toggleMenu(burger, mobileMenu) {
  if(burger.classList.contains('active')) {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.querySelector('body').style.overflow = '';
  } else {
    burger.classList.add('active');
    mobileMenu.classList.add('active');
    document.querySelector('body').style.overflow = 'hidden';
  }
}

function translate(lang) {
  const strings = document.querySelectorAll('[data-i18]');
  strings.forEach(function(string) {
    const keyLang = string.dataset.i18;
    string.textContent = i18Obj[lang][keyLang]
  })
}

if(localStorage.getItem('lang')) {
  const langButtons = document.querySelectorAll('.header_lang span');
  const lang = localStorage.getItem('lang');
  const elementLang = document.querySelector(`[data-lang=${lang}]`) 
  translate(lang);
  removeClassCollection(langButtons, 'active');
  elementLang.classList.add('active');
}

if(localStorage.getItem('theme')) {
  document.body.classList.toggle('light_theme');
}

console.log(`
Score: 65
- Вёрстка [10/10]
  - [x] вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
- Кнопка Play/Pause на панели управления [10/10]
  - [x] при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
  - [x] внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5
- Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка [10/10]
- При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка [10/10]
- При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля [10/10]
- Кнопка Play/Pause в центре видео [10/10]
  - [x] есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
  - [x] когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5
- Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения [10/10]
  - [x] Добавил скрытие панели управления при проигрывание когда указатель не наведен на плеер
`);

