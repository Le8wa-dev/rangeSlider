document.addEventListener('DOMContentLoaded', () => {
    // исходные данные
    const data = [
        [ [1, 6500, 2, 15000], [2, 12000, 4, 30000], [3, 18000, 7, 52500], [4, 24000, 12, 90000], [6, 35000, 16, 127500] ], //Текущий уровень - Beginner
        [ [1, 7000, 2, 15000], [2, 13000, 5, 37500], [3, 19000, 10, 75000], [5, 30000, 13, 112500] ], //Текущий уровень - Elementary
        [ [1, 7000, 3, 22500], [2, 13000, 8, 60000], [4, 24000, 11, 97500] ], //Текущий уровень - Pre-Intermediate
        [ [1, 7000, 5, 37500], [3, 18000, 10, 75000] ], //Текущий уровень - Intermediate
        [ [2, 12000, 5, 37500] ]  //Текущий уровень - Upper Intermediate
    ]

    const start = document.getElementById('start'), // поле Текущий уровень
          end = document.getElementById('end'), // поле Желаемы уровень
          dayThis = document.querySelector('.day_this'), // поле затраченных средств
          moneyThis = document.querySelector('.money_this'), // поле затраченного времени
          dayOther = document.querySelector('.day_other'), // поле затраченных средств
          moneyOther = document.querySelector('.money_other'), // поле затраченного времени
          compareRange = document.querySelector('.compare-range');

// *** Функции

    //функция склонения месяцев
    // n - числоб t - массив из 3 вариантов склонения
    const declOfNum = (n, t) => {
        return t[ (n % 100 > 4 && n % 100 <20 )
                ? 2 
                : [2, 0, 1, 1, 1, 2][(n % 10 < 5) ? n % 10 : 5] ];
    };
    // функция вывода результата
    const showResult = arr => {
        const [dayT, moneyT, dayO, moneyO] = arr;
        const month = ['месяц', 'месяца', 'месяцев'];
        
        dayThis.textContent = dayT + ' ' + declOfNum(dayT, month);
        moneyThis.textContent =  moneyT + ' руб.';
        dayOther.textContent = dayO + ' ' + declOfNum(dayO, month);
        moneyOther.textContent = moneyO + ' руб.';
    };
    // расчет выходных данных
    const calcResult = () => {
        const startVal = parseInt(start.value),
              endVal = parseInt(end.value);

        startVal === endVal
        ? showResult([0, 0, 0, 0]) // вывод нулевого результата
        : showResult(data[startVal][endVal - startVal - 1]); // вывод значений из массива data
    };
    // проверка измененного значения
    function handler() {
        if(start.value > end.value) {
            start.value = end.value = this.value;
        };
        calcResult();
    };

    const changeRange = event => {
        const target = event.target;

        if(target.classList.contains('change_range')){
            // присвоим родителя верхнего либо нижнего в зависимости от того где был клик
            const parent = target.closest('#started') || target.closest('#ended');
            // у родителя ищем рендж
            const range = parent.querySelector('.range');
            // присваиваем значение лежащее в data-level элемента по которому был клик
            range.value = target.dataset.level;
            // вызовем handler и передадим контектст, тк он теряется
            handler.apply(range);
        }
    };

// *** Обработчики

    start.addEventListener('change', handler);
    end.addEventListener('change', handler);

    // делегирование, чтоб можно было кликать не только на полосу прокрутки ренджа
    compareRange.addEventListener('click', changeRange);

    // повесим на вкладки cursor pointer)))
    document.querySelectorAll('.change_range').forEach((elem) => elem.style.cursor = 'pointer');

    // вызываем чтоб сразу подставлялись корректные значения
    calcResult();
});
