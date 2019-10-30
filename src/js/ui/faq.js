(function(UI) {
    var calcBoundary = function() {
        var ww = $(window).width();

        if (ww < 769) {
            return 'mobile';
        } else if (ww < 1080 && ww > 770) {
            return 'tablet';
        } else {
            return 'pc';
        }
    };
    var isDestroy = {
        pc: false,
        tablet: false,
        mobile: false
    };
    var sliderOptions = {
        faq: {
            mobile: {
                loop: false,
                speed: 1200,
                autoplay: false,
                allowTouchMove: true,
                navigation: false,
                pagination: false,
            },
        },
    };
    var faqAppSlider = null;
    var faqThemeSlider = null;

    switch (calcBoundary(window.innerWidth)) {
        case 'mobile':
            faqAppSlider = new Cafe24.SwiperSlider('#faqApp', sliderOptions.faq.mobile).init();
            faqThemeSlider = new Cafe24.SwiperSlider('#faqTheme', sliderOptions.faq.mobile).init();
            break;
        case 'tablet':
            break;
        case 'pc':
            break;
    }

    $(window).on('resize', function() {
        var ww = $(window).width();
        var resizeBoundary = {
            pc: 1081,
            tablet: 1080,
            mobile: 769
        }

        if (ww < resizeBoundary.mobile && !isDestroy.mobile) {
            isDestroy.mobile = true;
            isDestroy.tablet = false;

            if (faqAppSlider !== null) {
                faqAppSlider.destroy();
                faqAppSlider = null;
            }

            faqAppSlider = new Cafe24.SwiperSlider('#faqApp', sliderOptions.faq.mobile).init();

            if (faqThemeSlider !== null) {
                faqThemeSlider.destroy();
                faqThemeSlider = null;
            }

            faqThemeSlider = new Cafe24.SwiperSlider('#faqTheme', sliderOptions.faq.mobile).init();

        } else if (ww > resizeBoundary.mobile && ww < resizeBoundary.tablet && !isDestroy.tablet) {
            isDestroy.mobile = false;
            isDestroy.tablet = true;
            isDestroy.pc = false;

            if (faqAppSlider !== null) {
                faqAppSlider.destroy();
                faqAppSlider = null;
            }

            if (faqThemeSlider !== null) {
                faqThemeSlider.destroy();
                faqThemeSlider = null;
            }

        } else if (ww > resizeBoundary.pc && !isDestroy.pc) {
            isDestroy.tablet = false;
            isDestroy.pc = true;

        }
    });
})(Cafe24.UI);
