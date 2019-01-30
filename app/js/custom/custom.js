var buttonMenu = document.querySelector('.menu-button'),        //находим кнопку
	menu = document.querySelector('.mobile-menu'),          //находим блок меню
    body = document.querySelector('body'), 
    closeMenu = document.querySelector('.mobile-menu__close'),
    menuBg = document.querySelector('.menu-bg');                   //добавляем переменную для body

buttonMenu.addEventListener("click", function(){                //слушаем клик по кнопке
    if(menu.classList.contains('open')){                        //пишем условие(если у меню уже есть класс open)
        menuBg.classList.remove('show'),
        menu.classList.remove('open'),                          //удаляем класс open
        body.classList.remove('overflow');                      //удаляем класс overflow у body
    } else {                                                     //если нет класса open
        menu.classList.add('open'),                                 //добавляем класс open 
        body.classList.add('overflow'),
        menuBg.classList.add('show');                         //добавляем класс overflow для body
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


// Мы находим все спаны, при клике на один из них берем его атрибут
// делаем прокрутку к блоку с соответствующим id,
//  затем убираем все добавленные ранее классы
var menuLink = document.querySelectorAll('.mobile-menu__item span'); 

menuLink.forEach(function(item) { 
    item.addEventListener("click", function(){ 
        var name = item.getAttribute('name'); 
        document.getElementById(name).scrollIntoView(); 
        menu.classList.remove('open'); 
        body.classList.remove('overflow'); 
        menuBg.classList.remove('show'); 
    }) 
});




