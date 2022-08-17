$(function () {
    let arr = [];
    let check = true;
    randOrder();
    let timerID;
    let modalTimeID;

    function randomNum(random) {
        random = Math.floor(Math.random() * 15);
        return random;
    }

    function randOrder() {
        $('.minutes').text('01');
        $('.seconds').text('00');
        $('.droppedPiece').appendTo($('#puzzles'));
        $('.unitPlace').empty();
        $('.unit').removeClass('droppedPiece');
        $('.unitPlace').removeClass('piecePresent');
        for (let i = 0; i < 16; i++) {
            if (!arr.includes(i)) {
                $(`.unit:eq(${randomNum()})`).appendTo($('#puzzles'))
            }
            if (arr.includes(i)) {
                randomNum();
            }
            arr.push(i);
        }
        arr.splice(0, 15);
    };

    function startTimer() {
        $('#start').prop('disabled', true);
        $('#check').prop('disabled', false);
        check = false;
        timerID = setInterval(() => {
            if ($('.minutes').text() == '01' && $('.seconds').text() == '00') {
                $('.minutes').text('00');
                $('.seconds').text('60');
            }
            $('.seconds').text(`${+$('.seconds').text() -1}`);
            if (+$('.seconds').text() < 10) {
                $('.seconds').text(`0${$('.seconds').text()}`)
            }
            if ($('.minutes').text() == '00' && $('.seconds').text() == '00') {
                clearInterval(timerID);
                $('.modalLost').css('display', 'flex');
                $('.minutes').text('01');
                $('#start').prop('disabled', false);
                $('#check').prop('disabled', true);
            }
        }, 1000)
    };

    function checkingPuzzles() {
        check = true;
        $('.modal').css('display', 'none');
        $('.modalWin').css('display', 'flex');
        clearInterval(timerID);
        clearInterval(modalTimeID);
        $('.minutes').text('01');
        $('.seconds').text('00');
        $('#start').prop('disabled', false);
        $('#check').prop('disabled', true);
        $('.droppedPiece').appendTo($('#puzzles'));
        $('.droppedPiece').removeClass('droppedPiece');
        $('.unitPlace').empty();
        randOrder();
        if ($(".droppedPiece").length != 16) {
            $('.modalWin p').text('Unfortunately, you lost');
        }
        for (let i = 0; i < 16; i++) {
            let item = $(`.droppedPiece:eq(${i})`);
            let order = +item.attr('data-order');
            if (i == order) {
                $('.modalWin p').text('Well done');
            }
            if (i != order) {
                $('.modalWin p').text('Unfortunately, you lost');
            };
        }
    };

    function newGame() {
        $('.minutes').text('01');
        $('.seconds').text('00');
        $('.droppedPiece').appendTo($('#puzzles'));
        $('.unitPlace').empty();
        $('.unit').removeClass('droppedPiece');
        $('.unitPlace').removeClass('piecePresent');
        for (let i = 0; i < 16; i++) {
            if (!arr.includes(i)) {
                $(`.unit:eq(${randomNum()})`).appendTo($('#puzzles'))
            }
            if (arr.includes(i)) {
                randomNum();
            }
            arr.push(i);
        }
        arr.splice(0, 15);
    }

    function modal() {
        modalTimeID = setInterval(() => {
            $('.modal').css('display', 'flex');
            $('.modal p').text(`You still have time, are you sure? ${$('.time').text()}`);
        }, 1000)
    };

    $('.unit').draggable({
        revert: 'invalid',
        start: function () {
            if ($(this).hasClass('droppedPiece')) {
                $(this).removeClass('droppedPiece');
                $(this).parent().removeClass('piecePresent');
            }
            if (check) {
                startTimer();
                check = false;
            }
        }

    });
    $('.unitPlace').droppable({
        drop: function (event, ui) {
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            droppedOn.addClass('piecePresent');
            draggableElement.addClass('droppedPiece').css({
                top: 0,
                left: 0,
                position: 'relative',
            }).appendTo(droppedOn);
        },
        accept: function () {
            return !$(this).hasClass('piecePresent')
        },
    });
    $('#start').on('click', startTimer);
    $('#check').on('click', modal);
    $('.modalLost #close').on('click', function () {
        $('.modalLost').css('display', 'none');
    });
    $('.modal #close').on('click', function () {
        $('.modal').css('display', 'none');
        clearInterval(modalTimeID);
    });
    $('#check1').on('click', checkingPuzzles);
    $('.modalWin #close').on('click', function () {
        $('.modalWin').css('display', 'none');
    });
    $('#newGame').on('click', newGame);








})