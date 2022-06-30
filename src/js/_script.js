new Swiper('.image-slider', {
   navigation:{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
   },
   pagination: {
    el: '.swiper-pagination',
       
       // // bullets
       // type: 'bullets',
 
       // // кликабельные
       // clickable: true,
       // // Динамические буллеты
       // dynamicBullets: true,
       // // Кастомные буллеты
       // renderBullet: function (index, className) {
       //    return '<span class="' + className + '">' + (index + 1) + '</span>';
       // },
 // ------------------------------------------------------------
       // Фракция
       // type: 'fraction',
       // renderFraction: function (currentClass, totalClass) {
       //    return 'Фото <span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>'
       // },
 //-------------------------------------------------------------
       // // Прогресс бар
       // type: 'progressbar',
   },
//    scrollbar: {
//         el: '.swiper-scrollbar',
//         draggable: true
//    },
   simulateTouch: true,
   touchRatio: 1,
   touchAngle: 45,
   grabCursor: true,
   slideToClickedSlide: true,
   keyboard: {
        enable: true,
        onlyInViewport: true,
        pageUpDown: true,
   },
   mousewheel: {
        sensitivity: 1,
        eventsTarget: ".image-slider"
   },
   autoHeight: true,
   initialSlide: 0,
   loop: false,
   loopedSlides: 3,
   speed: 800,
});