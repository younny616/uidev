(function(UI) {
    var loadBoundary = $(window).width() > 769 ? true : false;
    var isDestroyTablet = false;
    var sliderOptions = {
        app: {
            pc: {
                loop: true,
                loopedSlides: 4,
                loopAdditionalSlides: 4,
                slidesPerGroup: 4,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                pagination: false,
            },
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                slidesPerView: 'auto',
                navigation: false,
                pagination: {
                    type: 'fraction',
                },
            }
        },
    }

    var newAppSlider = new Cafe24.SwiperSlider('#newApp', loadBoundary ?  sliderOptions.app.pc : sliderOptions.app.mobile).init();

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = 1080;

        if (ww < resizeBoundary && !isDestroyTablet) {
            isDestroyTablet = true;

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.mobile).init();
        } else if (ww > resizeBoundary && isDestroyTablet) {
            isDestroyTablet = false;

            newAppSlider.destroy();
            newAppSlider = new Cafe24.SwiperSlider('#newApp', sliderOptions.app.pc).init();
        }
    });

})(Cafe24.UI);
