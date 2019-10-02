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

function goTop(){
    $('#footer .btnTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
} goTop();

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

    Cafe24.UI.onToggleClass('#footer .familysite .eClick', true, 'selected');

});


(function(UI) {
    var isDestroy = {
        pc: false,
        tablet: false,
        mobile: false
    };

    var sliderOptions = {
        theme: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            }
        },
        app: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                pagination: false,
            },
            tablet: {
                loop: true,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            }
        },
        random: {
            mobile : {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
            }
        },
    };

    var bestThemeSlider = null;
    var newAppSlider = null;
    var newThemeSlider = null;
    var combineRandom = null;

    (function() {
        var loadBoundary = (function() {
            var ww = $(window).width();

            if (ww < 769) {
                return 'mobile';
            } else if (ww < 1080 && ww > 770) {
                return 'tablet';
            } else {
                return 'pc';
            }
        })();

        switch (loadBoundary) {
            case 'mobile':
                newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();
                newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();
                combineRandom = new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();
                break;
            case 'tablet':
                bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();
                newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();
                newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();
                break;
            case 'pc':
                bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();
                newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();
                newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
                break;
        }

        return true;
    })();

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = {
            pc: 1081,
            tablet: 1080,
            mobile: 770
        }

        if (ww < resizeBoundary.mobile && !isDestroy.mobile) {
            isDestroy.mobile = true;
            isDestroy.tablet = false;

            if (combineRandom !== null) {
                combineRandom.destroy();
                combineRandom = null
            }

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            combineRandom = new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.mobile).init();

        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            if (combineRandom !== null) {
                combineRandom.destroy();
                combineRandom = null
            }

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.tablet).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.tablet).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.tablet).init();

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

            if (bestThemeSlider !== null) {
                bestThemeSlider.destroy();
                bestThemeSlider = null;
            }

            bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', sliderOptions.theme.pc).init();

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();

            newThemeSlider.destroy();
            newThemeSlider = new Cafe24.SwiperSlider('#newTheme', sliderOptions.theme.pc).init();
        }
    });

    UI.onPagination('.btnMore', 'section', 4, 4);

})(Cafe24.UI);
