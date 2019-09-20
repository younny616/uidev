(function(UI) {
    var options = {
        loop: true,
        speed: 1200,
        autoplay: false,
        slidesPerView: 'auto',
        pagination: false,
    }

    var simpleSlider1 = new Cafe24.SwiperSlider('#appSlider1', options).init();
    var simpleSlider2 = new Cafe24.SwiperSlider('#appSlider2', options).init();

})(Cafe24.UI);
