(function(UI) {
    var options = {
        loop: true,
        loopedSlides: 4,
        loopAdditionalSlides: 4,
        slidesPerGroup: 4,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
        pagination: false,
    }

    var bestThemeSlider = new Cafe24.SwiperSlider('#bestTheme', options).init();
    var newThemeSlider = new Cafe24.SwiperSlider('#newTheme', options).init();
    var mobileTheme = new Cafe24.SwiperSlider('#mobileTheme', options).init();

    var combineMobileOptions = {
        loop: true,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
        navigation: false,
        pagination: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    };
    var combineMobileSlider = new Cafe24.SwiperSlider('#combineMobile', combineMobileOptions).init();
    var combinePcOptions = {
        loop: true,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        pagination: false,
        thumbs: {
            swiper: combineMobileSlider,
        }
    };
    var combinePcSlider = new Cafe24.SwiperSlider('#combinePC', combinePcOptions).init();

    var options2 = {
        loop: true,
        loopedSlides: 4,
        loopAdditionalSlides: 4,
        slidesPerGroup: 4,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
    }

})(Cafe24.UI);
