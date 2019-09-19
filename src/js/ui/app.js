(function(UI) {
    var options = {
        loop: true,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
        pagination: false,
    }

    var mainSlider = new Cafe24.SwiperSlider('.mainSlider', options).init();
    // var mainSlider1 = new Cafe24.SwiperSlider('.mainSlider1', {}, 'coverflow').init();

})(Cafe24.UI);
