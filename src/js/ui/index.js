function headerFixed() {
    var headerHeight = 0; //$('#header').height();
    if(headerHeight < $(window).scrollTop()){
        $('#header').addClass('fixed');
    }else{
        $('#header').removeClass('fixed');
    }
} headerFixed();

function searchActive() {
    $('#header .search .btnSearch').on('click', function() {
        $(this).parents('.search').addClass('active');
    });
    $('#header .search .btnClose').on('click', function() {
        $(this).parents('.search').removeClass('active');
    });
    $('#header .searchForm input').on('keyup', function() {
        $(this).parents('.searchForm').addClass('selected');
    });
} searchActive();

function user() {
    $('#header .user .btnUser').on('click', function () {
        $(this).parents('.user').toggleClass('selected');
    });
} user();