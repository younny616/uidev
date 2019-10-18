$(window).scroll(function() {
    var $el = $('#header');

    if($(this).scrollTop() > 0){
        $el.addClass('fixed');
    } else {
        $el.removeClass('fixed');
    }
});

function searchActive() {
    $('#header .search .btnSearch').on('click', function() {
        $(this).parents('.search').addClass('active');
        $('#header .searchForm input').focus();
    });
    $('#header .search .btnClose').on('click', function() {
        $(this).parents('.search').removeClass('active');
        $('#header .searchForm').removeClass('selected');
    });
    $('#header .searchForm input').on('keyup', function() {
        $(this).parents('.searchForm').addClass('selected');
    });
    $('.searchHead .searchForm input').on('focus', function() {
        $('#header .search').addClass('active');
        $('#header .searchForm input').focus();
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

function goTop(){
    $('#footer .btnTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
} goTop();

(function(UI, Utils) {
    UI.onToggleClass('#footer .familysite .eClick', '#footer .familysite', 'selected');

    if (Utils._element_exist('.fSelect')) {
        $('.fSelect.eSelect').each(function(i) {
            var propTagName = $(this).prop('tagName');

            if (propTagName == 'SELECT') {
                var propClassName = $(this).attr('class');
                var propClassBol = $(this).hasClass('nowrap');

                $(this).selectPack({
                    settingBol: propClassBol,
                    boxClass: propClassName,
                });
            }
        });
    }

    if (Utils._element_exist('.wFilter')) {
        UI.onAddClass('.searchHead .btnFilter', '.wFilter', 'active');
        UI.onRemoveClass('.filterWrap .btnClose', '.wFilter', 'active');
        UI.onResetAll('.filterWrap .btnReset', '.wFilter', 'checkbox');
        UI.onSlideToggleClass('.filterWrap > div .title', 'active');
    }

    if (Utils._element_exist('.eScrollDown')) {
        UI.onScrollDown('.eScrollDown', 65);
    }

    UI.onSlideAccordion('.eAccordion', '.btnFold', 'selected');


    // UI.onAddClass('.searchHead .btnFilter', '.mLayer', 'active');
    // UI.onRemoveClass('.mLayer .btnClose', '.mLayer', 'active');

})(Cafe24.UI, Cafe24.Utils);