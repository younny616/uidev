import _ from 'lodash';

class SwiperSlider {
  constructor(target, options, effect) {
    this.prefix = 'slider';
    this.target = target;
    this.options = options || {} ;
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
      noSwipingClass: 'displayed',
      init: false,
      loop: false,
      speed: 1200,
      effect: 'slide',
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      allowTouchMove: false,
      grabCursor: false,
      spaceBetween: 0,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: `${this.target} .${this.prefix}Pagination`,
        type: 'bullets',
        clickable : true,
        modifierClass: `${this.prefix}Pagination-`,
        clickableClass: `${this.prefix}Pagination-clickable`,
        bulletClass: 'page',
        bulletActiveClass: 'active',
        currentClass: 'current',
        totalClass: 'total',
      },
      navigation: {
        prevEl: `${this.target} .sliderCtrl .slidePrev`,
        nextEl: `${this.target} .sliderCtrl .slideNext`,
      },
      // on: {
      //   init: () => {
      //     $(this.el).removeClass('loading');
      //   }
      // }
    }

    this.setOptions = _.mergeWith(this.default, this.options);
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

    const slider = new Swiper(`${this.target} .sliderContainer`, this.setOptions);
    slider.init();

    return slider;
  }
};

export default SwiperSlider;
