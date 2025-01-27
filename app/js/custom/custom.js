var buttonMenu = document.querySelector('.menu-button'),        //находим кнопку
    menu = document.querySelector('.mobile-menu'),          //находим блок меню
    body = document.querySelector('body'), 
    closeMenu = document.querySelector('.mobile-menu__close'),
    menuBg = document.querySelector('.menu-bg');                   //добавляем переменную для body

buttonMenu.addEventListener("click", function(){        //слушаем клик по кнопке
    if(menu.classList.contains('open')){              //пишем условие(если у меню уже есть класс open)
        menuBg.classList.remove('show'),
        menu.classList.remove('open'),               //удаляем класс open
        body.classList.remove('overflow');          //удаляем класс overflow у body
    } else {                                        //если нет класса open
        menu.classList.add('open'),                 //добавляем класс open 
        body.classList.add('overflow'),
        menuBg.classList.add('show');              //добавляем класс overflow для body
    }
});

closeMenu.addEventListener("click", function(){                //слушаем клик по кнопке
    if(menu.classList.contains('open')){                        //пишем условие(если у меню уже есть класс open)
        menu.classList.remove('open'),                          //удаляем класс open
        body.classList.remove('overflow'),
        menuBg.classList.remove('show');                      //удаляем класс overflow у body
    } else {                                                     //если нет класса open
        menu.classList.add('open'),                                //добавляем класс open 
        body.classList.add('overflow'),
        menuBg.classList.add('show');                         //добавляем класс overflow для body
    }
});

//плавная прокрутка по якорям
$(document).ready(function(){ 
    //слушаем клик по тегу а в блоке .header__site-navigation 
    $(".header__site-navigation").on("click","a", function (event) { 
    //забираем идентификатор блока из атрибута href 
    var id = $(this).attr('href'), 
    //узнаем высоту от начала страницы до блока на который ссылается якорь 
    top = $(id).offset().top; 
    //анимируем переход на расстояние - top за 1500 мс 
    $('body,html').animate({scrollTop: top}, 1500); 
});

//слушаем клик по тегу а в блоке .mobile-menu 
$(".mobile-menu").on("click","a", function (event) { 
    //забираем идентификатор блока из атрибута href 
    var id = $(this).attr('href'); 
    // закрываем меню 
    $(".mobile-menu").removeClass('open'); 
    $("body").removeClass('overflow'); 
    $(".menu-bg").removeClass('show'); 
    //узнаем высоту от начала страницы до блока на который ссылается якорь 
    var top = $(id).offset().top; 
    //анимируем переход на расстояние - top за 1500 мс 
    $('body,html').animate({scrollTop: top}, 1500); 
    }) 
});


//button top

$(function() {
    $('#top').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');  //медленная прокрутка страницы наверх
   });
});

var btnTop = document.querySelector('#top');  //прячем кнопку top с первого экрана
window.onscroll = magic;
function magic() {
    if (window.pageYOffset > 20) {
        btnTop.style.opacity = '1';
    } else {
        btnTop.style.opacity = '0';
    }
}   
