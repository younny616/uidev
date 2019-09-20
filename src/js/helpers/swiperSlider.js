class SwiperSlider {
  constructor(target, options, effect) {
    this.prefix = 'slider';
    this.target = target;
    this.options = options || {} ;
    /**
     * @effect : ['slide', 'fade', 'coverflow']
     */
    this.effect = effect || '';

    this.default = {
      containerModifierClass: `${this.prefix}Container-`,
      wrapperClass: `${this.prefix}Wrapper`,
      slideClass: 'slide',
      slideActiveClass: 'active',
      slideDuplicateClass: 'slideDuplicate',
      slideDuplicateActiveClass: 'slideDuplicateActive',
      slideVisibleClass: 'slideVisible',
      slidePrevClass: 'slidePrev',
      slideDuplicatePrevClass: 'slideDuplicatePrev',
      slideNextClass: 'slideNext',
      slideDuplicateNextClass: 'slideDuplicateNext',
      init: false,
      loop: true,
      speed: 800,
      effect: 'slide',
      allowTouchMove: false,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      pagination: {
        el: `${this.target} .${this.prefix}Pagination`,
        clickable : true,
        modifierClass: `${this.prefix}Pagination-`,
        clickableClass: `${this.prefix}Pagination-clickable`,
        bulletClass: 'page',
        bulletActiveClass: 'active',
      },
      navigation: {
        prevEl: `${this.target} .sliderCtrl .slidePrev`,
        nextEl: `${this.target} .sliderCtrl .slideNext`,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
        },
      },
      on: {
        init: function() {
          console.log(this.target);
          $(this.el).removeClass('loading');
        },
      }
    }

    this.setOptions = Object.assign({}, this.default, this.options);
  }

  init() {
    if (this.effect !== undefined && this.effect !== null) {
      const coverflow = {
        effect: 'coverflow',
        centerMode: true,
        parallax: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows : false,
        }
      }

      switch(this.effect) {
        case 'slide':
        case 'fade':
          break;
        case 'coverflow':
          this.setOptions = {
              ...this.setOptions,
              ...coverflow
          }
          break;
      }
    }

    return new Swiper(`${this.target} .sliderContainer`, this.setOptions).init();
  }
};

export default SwiperSlider;
