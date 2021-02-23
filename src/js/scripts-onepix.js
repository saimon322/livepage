$(document).ready(function () {
    // Positions nav
    $('.positions__nav a').on('click', function(e){
        e.preventDefault();
        let positionsTab = $(this).attr('href');
        $('.positions__nav a').removeClass('active');
        $(this).addClass('active');
        $('.positions__tab').removeClass('active');
        $(positionsTab).addClass('active');
    })

    // Levels nav
    $('.levels__nav a').on('click', function(e){
        e.preventDefault();
        let levelsTab = $(this).attr('href');
        $('.levels__nav a').removeClass('active');
        $(this).addClass('active');
        $('.levels__tab').removeClass('active');
        $(levelsTab).addClass('active');
    })
})
