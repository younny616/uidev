(function(UI, Utils){
    if (Utils._element_exist('.fSelect')) {
        $('.fSelect.eSelect').each(function(i) {
            var propTagName = $(this).prop('tagName');

            if (propTagName == 'SELECT') {
                var propClassName = $(this).attr('class');
                var propClassBol = $(this).hasClass('nowrap');

                $(this).selectPack({
                    settingBol: propClassBol,
                    boxClass: propClassName,
                });
            }
        });
    }
})(Cafe24.UI, Cafe24.Utils);