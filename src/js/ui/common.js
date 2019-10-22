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

// toolTip
function mTooltip(){
    // 고정
    $('body').delegate('.mTooltip .eTip', 'click', function(e){
        mTooltipMouseEvent(this, e);
    });
    // mouseover
    $('body').delegate('.mTooltip .eTipHover', 'mouseover', function(e){
        mTooltipMouseEvent(this, e);
    });

    function mTooltipMouseEvent(_this, e){
        var findSection = $(_this).parents('.section:first'),
            findTarget = $($(_this).siblings('.tooltip')),
            findTooltip = $('.tooltip'),
            findHover = $(_this).hasClass('eTipHover'),
            findShow = $(_this).parents('.mTooltip:first').hasClass('show');

        if(findShow && !findHover){
            $('.mTooltip').removeClass('show');
            findTarget.hide();
            findSection.css({'zIndex':0, 'position':'static'});
        }else{
            $('.mTooltip').removeClass('show');
            $(_this).parents('.mTooltip:first').addClass('show');
            findSection.css({'zIndex':0, 'position':'static'});
            findSection.css({'zIndex':100, 'position':'relative'});

            // 툴팁의 넓이 + offset좌표 의 값이 body태그의 width보다 클때 좌표값 왼쪽으로 이동
            var bodyWidth = $('body').width(),
                targetWidth = findTarget.outerWidth(),
                offsetLeft = $(_this).offset().left,
                posWidth = targetWidth + offsetLeft;

            if(bodyWidth < posWidth){
                var propMarginLeft = (targetWidth+$(_this).width()+10);
                var propWidth = offsetLeft - targetWidth;
                if(propWidth > 0){
                    findTarget.addClass('posRight').css({'marginLeft': '-'+ targetWidth +'px' });
                }else{
                    findTarget.removeClass('posRight').css({'marginLeft': 0 });
                }
            } else {
                findTarget.removeClass('posRight').css({'marginLeft': 0 });
            }

            findTooltip.hide();
            findTarget.show();

            if($('#tooltipSCrollView').length > 0){
                $('#tooltipSCrollView').remove();
            }
        }
        e.preventDefault();
    }

    $('body').delegate('.mTooltip .eClose', 'click', function(e){
        // 동적
        if($(this).parents('.mTooltip:first').attr('virtual')){
            $('#tooltipSCrollView').remove();
        } else {
            var findSection = $(this).parents('.section:first');
            var findTarget = $(this).parents('.tooltip:first');
            findTarget.hide();
            findSection.css({'zIndex':0, 'position':'static'});
        }
        $('.mTooltip').removeClass('show');
        e.preventDefault();
    });
}
mTooltip();



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
    UI.onAddClass('.searchHead .btnFilter', '.mLayer', 'active');
    UI.onRemoveClass('.mLayer .btnClose', '.mLayer', 'active');

})(Cafe24.UI, Cafe24.Utils);