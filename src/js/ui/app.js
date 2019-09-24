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

    var newAppSlider = new Cafe24.SwiperSlider('#newApp', options).init();

})(Cafe24.UI);
