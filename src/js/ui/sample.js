(function(UI){
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

    // UI 테스트
    UI.onAddClass('.selectArea .fSelect', '.selectArea .alert', 'disabled');

    $('.btnFrameArea').on('click', function(e) {
        var $target = $(e.target);
        var $contentArea = $('.sampleArea .content');
        var types = '';
        var keyword = 'btnFrame';
        var className = $target.attr('class').split(' ');

        for (var i = 0; i < className.length; i++) {
            if (className[i].indexOf(keyword) !== -1) types = className[i].replace(keyword, '');
        }

        $target.addClass('active').siblings().removeClass('active');

        switch(types) {
            case 'Desktop':
                $contentArea.addClass('viewDesktop').removeClass('viewMobile');
                break;
            case 'Mobile':
                $contentArea.addClass('viewMobile').removeClass('viewDesktop');
                break;
            default :
                return;
        }
    });

})(Cafe24.UI);