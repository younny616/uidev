function inquiryList() {
    $('.inquiryList .inquiry .eInquiryFold').on('click', function() {
        $(this).parents('.item').toggleClass('selected');
        $(this).parents('.head').siblings('.content').slideToggle();
    });
} inquiryList();