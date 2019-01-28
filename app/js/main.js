let menuButton = document.querySelector('.menu-button'),        //находим кнопку
    menu = document.querySelector('.mobile-menu'),          //находим блок меню
    body = document.querySelector('body');                      //добавляем переменную для body

menuButton.addEventListener("click", function(){                //слушаем клик по кнопке
    if(menu.classList.contains('open')){                        //пишем условие(если у меню уже есть класс open)
        menu.classList.remove('open');                          //удаляем класс open
        body.classList.remove('overflow');                      //удаляем класс overflow у body
    }else {                                                     //если нет класса open
        menu.classList.add('open');                                 //добавляем класс open 
        body.classList.add('overflow');                         //добавляем класс overflow для body
    }
})
