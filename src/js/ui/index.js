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


(function(UI) {
    var loadBoundary = $(window).width() > 769 ? true : false;
    var isDestroyTablet = false;
    var isDestroyMobile = false;
    var sliderOptions = {
        random: {
            mobile : {
                loop: false,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
            }
        },
    }

    var combineRandom = loadBoundary ? null : new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = 1080;
        var resizeBoundaryMobile = 769;

        if (ww < resizeBoundaryMobile && !isDestroyMobile) {
            isDestroyMobile = true;

            if (combineRandom !== null) {
                combineRandom.destroy();
            }

            combineRandom = new Cafe24.SwiperSlider('#combineRandom', sliderOptions.random.mobile).init();
        } else if (ww > resizeBoundaryMobile && isDestroyMobile) {
            isDestroyMobile = false;

            combineRandom.destroy();
            combineRandom = null;
        }
    });

})(Cafe24.UI);
