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

function navigationMenu() {
    $('#header .btnFold').on('click', function () {
        if($('body').hasClass('navShow') == true){
            $('body').removeClass('navShow');
            $(this).text('메뉴보기');
        }else{
            $('body').addClass('navShow');
            $(this).text('메뉴닫기');
        }
    });
    $('#header .btnFoldLayout').on('click', function () {
        $('body').removeClass('navShow');
    });

    $('#header .navigation .menu > li > a').on('click', function () {
        if($(this).parent('li').hasClass('selected') == true){
            $(this).parent('li').removeClass('selected');
        }else{
            $(this).parent('li').addClass('selected').siblings('li').removeClass('selected');
        }
    });
} navigationMenu();

$(document).ready(function(){
    if($('.fSelect').length > 0){
        $('.fSelect').each(function(i){
            var arr = $(this).attr('class').split(' ');
            if(arr.length > 1){
                $(this).removeClass();
                for(var j = 0; j<(arr.length+1); j++){
                    if(j == 0){
                        $(this).addClass('fSelect');
                    }else if(j == 1){
                        $(this).addClass('eSelect');
                    }else{
                        var className = arr[(j-1)];
                        $(this).addClass(className);
                    }
                }
            }else{
                $(this).addClass('eSelect');
            }
        });
    }
});