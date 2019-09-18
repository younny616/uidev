(function() {
    var UI = Cafe24.UI;

    var options = {
        loop: true,
        speed: 1200,
        autoplay: false,
        slidesPerView: 1,
    }

    var mainSlider = new Cafe24.SwiperSlider('.mainSlider', '').init();
    // var mainSlider1 = new Cafe24.SwiperSlider('.mainSlider1', {}, 'coverflow').init();


    var $target = '.btnTop';

    $(document).on('click', function(){

    });

    UI.onHide($target, function() {
        console.log(this);
        setTimeout(function time() {
            UI.onShow($target);
        }, 1500);
    }).on('click', function() {
        console.log(this);
    });

})();
