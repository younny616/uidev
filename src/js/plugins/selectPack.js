/*
    @version	20190305
*/

;(function ($) {
    'use strict';

    var settings = {};

    $.fn.selectPack = function (method) {

        var defaults = {
            settingBol:        false,
            boxClass:         "selectDesign",
            listClass:          "fOption",
            dataBol:           false,
            dataNum:         0,
            aniMode:         true,
            upClassName:   "upShow",
            downClassName:   "downShow"
        };

        var methods = {
            /*@private*/
            _eInit: function (options) {
                settings = $.extend({}, defaults, options);

                return this.each(function () {
                    methods._eSetup.apply(this, Array.prototype.slice.call(arguments, 1));
                });
            },
            /*@private*/
            _eSetup: function () {
                var findThis = $(this);
                objStart._eCreate(findThis);
            }
        };
        return methods._eInit.apply(this, arguments);
    };


    var objStart = {
        _eCreate: function (findThis) {
            var propClass = findThis.attr('design'),
                propDisabled = findThis.attr('disabled'),
                propStyle = findThis.attr('style'),
                propWidthSize = propStyle,
                propPercent = null;

            if(propStyle){
                var arrStyle = propStyle.split(";");
                if(propStyle.indexOf("width") >= 0){
                    propWidthSize = parseInt(arrStyle[0].replace(/[^0-9]/g,''));
                    propPercent = arrStyle[0].indexOf("%");
                }else{
                    propWidthSize = "";
                }
            }

            if(!propClass){
                findThis.removeAttr('design').removeAttr('class');
                propClass = settings.boxClass;
            } else {
                findThis.removeAttr('design').removeAttr('class');
            }

            var propSelect = propClass;
            if(propDisabled){ propSelect = propClass + ' disabled'; }

            if(propWidthSize){
                if(propPercent && propPercent > 0){
                    findThis.wrap('<div class="'+ propSelect +'" style="width:'+propWidthSize+'%;"  />');
                }else{
                    findThis.wrap('<div class="'+ propSelect +'" style="width:'+propWidthSize+'px;"  />');
                }
            }else{
                findThis.wrap('<div class="'+ propSelect +'" />');
            }

            if(propStyle){
                var figureNum = 0;
                if(propStyle.indexOf("color") >= 0){
                    if(propStyle.indexOf("width") >= 0){
                        figureNum = 1;
                    }
                    var propColor = arrStyle[figureNum],
                        arrColorCut = propColor.split(":"),
                        arrClassCut = propSelect.split(" "),
                        strClass = "."+arrClassCut[0];

                    findThis.parents(strClass).css({"color":arrColorCut[1]});
                }
            }

            findThis.before('<p class="fNow" />');
            findThis.before('<button type="button" class="fButton">옵션 변경</button>');

            objStart._eStatusLoadingChk(findThis);
        },
        /*@private*/
        _eStatusLoadingChk: function(findThis){
            var propStatus = findThis.data('rcUiStatus');

            findThis.data('selectStatus', "hide");

            if(propStatus == undefined || propStatus == "success"){
                objStart._eListCreate(findThis);
            }else{
                if(propStatus == "loading"){
                    objStart.eLoadingCreate(findThis);
                }
            }
        },
        /*@public*/
        eLoadingCreate: function(findThis){
            var propWrap = findThis.parent(),
                propButton = findThis.siblings('.fButton'),
                propStatus = findThis.data('rcUiStatus'),
                loadFlag = findThis.data('rcUiOptions').display_loading;

            var findLoading = findThis.parents('.fSelect.eSelect').find('.mLoading.typePart');
            if(findLoading.length > 0){
                findThis.parents('.fSelect.eSelect').find('.mLoading.typePart').remove();
            }

            if(propStatus != "loading"){
                propButton.unbind( "click" );
            }

            if(propStatus == "success"){
                objStart._eListCreate(findThis);
            }else if(propStatus == "loading"){
                propWrap.append('<div class="mLoading typePart"><div class="inner"><img src="//img.echosting.cafe24.com/api/recipe/img_loading.gif" alt="loading" width="66" class="imgLoading">설정을 불러오는 중입니다.</div></div>');
            }else if(propStatus == "fail"){
                propWrap.append('<div class="mLoading typePart"><div class="inner">오류가 발생하여 설정을 불러오지 못했습니다.<br><button type="button" class="btnLine"><span class="text">이곳을 클릭</span></button>하시면 재시도 합니다.</div></div>');

                findThis.parents('.fSelect.eSelect').find('.mLoading.typePart .btnLine').click(function(e){
                    propButton.unbind( "click" );
                    $(this).unbind( "click" );

                    var propRefrshMethod = findThis.data('rcCallbackRefreshMethod')+"(findThis)";
                    eval(propRefrshMethod);
                });
            }

            if(propStatus != "success"){
                if(findThis.data('selectStatus') == "hide"){
                    propWrap.find('.mLoading').hide();
                }else{
                    propWrap.find('.mLoading').show();
                }

                propButton.click(function(e){
                    var propDisplay = $(this).parents('.fSelect.eSelect').find('.mLoading.typePart').css("display");
                    if(propDisplay == "none"){
                        findThis.data('selectStatus', "show");
                    }else{
                        findThis.data('selectStatus', "hide");
                    }

                    if(loadFlag){
                        $(this).parents('.fSelect.eSelect').find('.mLoading.typePart').toggle();
                    }else{
                        $(this).parents('.fSelect.eSelect').find('.mLoading.typePart').hide();
                    }
                    e.preventDefault();
                });
            }
        },
        /*@private*/
        _eListCreate: function(findThis){
            if(settings.dataBol){
                findThis.before('<ul class="'+settings.listClass+'" style="overflow-x:hidden; width:'+settings.dataNum+'px" />');
            }else{
                findThis.before('<ul class="'+settings.listClass+'" style="overflow-x:hidden;" />');
            }

            var propWrap = findThis.parent(),
                propPtag = findThis.siblings('.fNow'),
                propUl = findThis.siblings('.fOption'),
                propButton = findThis.siblings('.fButton');

            findThis.find('option').each(function(i){
                var strText  = $(this).text(),
                    strValue = $(this).attr('value'),
                    propSelected = $(this).attr("selected");
                if(propSelected){
                    propPtag.text(strText);
                    propUl.append('<li class="selected"><a href="#none" data-rc="'+ strValue +'">'+ strText +'</a></li>');
                }else{
                    if(i == 0){
                        propPtag.text(strText);
                        propUl.append('<li class="selected"><a href="#none" data-rc="'+ strValue +'">'+ strText +'</a></li>');
                    }else{
                        propUl.append('<li><a href="#none" data-rc="'+ strValue +'">'+ strText +'</a></li>');
                    }
                }
                var propOpt = $(this).attr("value");
                if(propOpt){
                    $('.'+settings.listClass).find("li").eq(i).attr("data", propOpt);
                }
            });

            if(settings.settingBol){
                var arrCut = settings.boxClass.split(" "),
                    strBoxSeleter = "."+arrCut[0]+"."+arrCut[1],
                    strListSeleter = "."+settings.listClass,
                    findSelected = findThis.parents(strBoxSeleter).find(strListSeleter);

                var figureSelect = findThis.parents(strBoxSeleter).outerWidth(),
                    figureListWidth = findThis.width()+100;
                if(figureSelect >= figureListWidth){
                    findSelected.css({"width":"", "overflow-x":"auto", "white-space":"nowrap"});
                }else{
                    findSelected.css({"width":figureListWidth, "overflow-x":"auto", "white-space":"nowrap"});
                }
            }
            objStart._eHandler(findThis, propWrap, propPtag, propButton);
        },
        /*@private*/
        _eHandler: function(findThis, propWrap, propPtag, propButton) {
            var propDisabled = findThis.attr('disabled');

            propButton.click(function(e){
                var findPtag = $(this).siblings('.fNow');
                objStart._eClickEvent(findPtag, propWrap, propDisabled, e);
                e.preventDefault();
            });

            if(findThis.data('selectStatus') == "show"){
                propButton.click();
            }

            propPtag.click(function(e){
                objStart._eClickEvent($(this), propWrap, propDisabled, e);
                e.preventDefault();
            });

            propWrap.find('a').click(function(e){
                var strText = $(this).text(),
                    findTarget = $(this).parents('.fOption'),
                    figureIndex = $(this).parent().index(),
                    arrCut = settings.boxClass.split(" "),
                    strBoxSeleter = "."+arrCut[0]+"."+arrCut[1];

                if (arrCut[0] == 'error') {
                    strBoxSeleter = "."+arrCut[1]+"."+arrCut[2]; // '.fSelect.eSelect'
                }
                var strCurrentText = findTarget.parents(strBoxSeleter).find('.fNow').text();

                objStart._eChange(propWrap, strText);
                objStart._eClickEvent(findTarget, propWrap, propDisabled, e);
                $(this).parent().addClass("selected").siblings().removeClass('selected');
                findTarget.parents(strBoxSeleter).find('option:eq('+figureIndex+')').prop("selected", true);

                if (strCurrentText != strText) {
                    findTarget.parents(strBoxSeleter).find('select').trigger('change');
                }

                var findThisSeleter = findTarget.parents(strBoxSeleter),
                    propStyle = findThisSeleter.attr("style");
                if(propStyle && propStyle.indexOf("color") >= 0){
                    findThisSeleter.css({"color":""});
                }

                e.preventDefault();
            });
        },
        /*@private*/
        _eClickEvent: function(findThis, propWrap, propDisabled, e){
            if(!propDisabled){
                objStart._eToggle(propWrap);
                objStart._ePositionX(findThis, propWrap);
                objStart._ePositionY(findThis, propWrap);

                var arrCut = settings.boxClass.split(" ");
                var strBoxSeleter = "."+arrCut[0]+"."+arrCut[1];
                if (arrCut[0] == 'error') {
                    strBoxSeleter = "."+arrCut[1]+"."+arrCut[2]; // '.fSelect.eSelect'
                }
                var figureIndex = $(strBoxSeleter).index(findThis.parents(strBoxSeleter));

                $(strBoxSeleter).each(function(i){
                    var propHasClass = $(this).hasClass('show');
                    if(propHasClass){
                        if(figureIndex != i){
                            var findSelecter = $(this).find('.fButton');
                            objStart._eToggle($(this));
                            objStart._ePositionX(findSelecter, $(this));
                            objStart._ePositionY(findSelecter, $(this));
                        }
                    }
                });
            }
            e.preventDefault();
        },
        /*@private*/
        _ePositionX: function(findThis, propWrap){
            var arrCut = settings.boxClass.split(" "),
                strBoxSeleter = "."+arrCut[0]+"."+arrCut[1],
                strListSeleter = "."+settings.listClass,
                findSelected = findThis.parents(strBoxSeleter).find(strListSeleter);

            if(propWrap.hasClass('show')){
                var findLayer = findThis.parents('.mLayer'),
                    findTarget,
                    figureLeft;

                if(findLayer.length >= 1){
                    findTarget = findLayer.find('.wrap');
                    figureLeft = findTarget.offset().left;
                }else{
                    findTarget = $(window);
                    figureLeft = 0;
                }

                var figureWidth = findTarget.width(),                                //레이어 전체 넓이값
                    figureBoxLeft = findThis.offset().left-figureLeft,               //버튼 left 위치값
                    figureSelectedWidth = findSelected.width(),                      //박스 넓이값
                    figureSelecteLeft = -1,                                          //버튼 기본값 eft값
                    figureHalfLeft = figureWidth-figureBoxLeft,                    //버튼 아래 공간 넓이값
                    figureOuterWidth = findThis.parents(strBoxSeleter).outerWidth(), //버튼 넓이값
                    figureDiv = 20,                                                  //리스트 넓이 지정할때 상하 공백
                    strOverflow = "hidden";

                if(settings.settingBol){
                    strOverflow = "auto";
                }

                if(figureBoxLeft >= figureHalfLeft){
                    figureSelecteLeft = ((figureSelectedWidth-figureOuterWidth)+3)*-1;
                    if((figureSelectedWidth+2) >= figureBoxLeft){
                        figureSelecteLeft = ((figureBoxLeft-figureDiv)+3)*-1;
                        var figureWidthLeft = Math.floor((figureBoxLeft+figureOuterWidth)-figureDiv);
                        findSelected.css({ width:figureWidthLeft, "overflow-x":strOverflow });
                    }
                }else{
                    if((figureSelectedWidth+2) >= figureHalfLeft){
                        var figureWidthLeft = Math.floor((figureHalfLeft-figureDiv));
                        findSelected.css({ width:figureWidthLeft, "overflow-x":strOverflow });
                    }
                }
                findSelected.css({ left:figureSelecteLeft });
            }
        },
        /*@private*/
        _ePositionY: function(findThis, propWrap){
            var arrCut = settings.boxClass.split(" "),
                strBoxSeleter = "."+arrCut[0]+"."+arrCut[1],
                strListSeleter = "."+settings.listClass,
                findSelected = findThis.parents(strBoxSeleter).find(strListSeleter);

            var findLayer = findThis.parents('.mLayer'),
                findTarget,
                figureTop,
                propId = findLayer.attr('id'),
                flag = false;

            if(propId){
                var strIdChk = propId.indexOf('layer');
                if(strIdChk >= 0){
                    flag = true;
                }
            }

            if(findLayer.length >= 1 && flag){
                findTarget = findLayer.find('.wrap');
                figureTop = findTarget.offset().top;
            }else{
                findTarget = $(window);
                figureTop = $(window).scrollTop();
            }

            var figureHeigh = findTarget.height(),                              //레이어 전체 높이값
                figureBoxTop = findThis.offset().top-figureTop,                 //버튼 top 위치값
                figureSelectedHeight = findSelected.height(),                   //박스 높이값
                figureSelecteTop = findThis.height(),                           //버튼 높이값
                figureHalfBottom = figureHeigh-figureBoxTop,                    //버튼 아래 공간 높이값
                figureListHeight = 0,                                           //리스트 목록 높이 지정변수
                figureDiv = 10,                                                 //리스트 높이 지정할때 상하 공백
                figurePlus = figureBoxTop + figureSelectedHeight;

            if(propWrap.hasClass('show')){
                if(figureBoxTop >= figureHalfBottom && figurePlus >= findTarget.height()){
                    figureListHeight = figureBoxTop-figureDiv;
                    figureSelecteTop = (figureSelectedHeight+2)*-1;

                    if(settings.aniMode){
                        /*ani*/
                        findSelected.css({ top:-2 });
                        /* //-ani-//*/
                    }

                    if(figureSelectedHeight >= (figureListHeight+figureDiv)){
                        figureSelecteTop = (figureListHeight+2)*-1;

                        if(!settings.aniMode){
                            findSelected.css({ height:figureListHeight });
                        }else{
                            /*ani*/
                            objStart._eAnimation(findSelected, "downShow", figureListHeight);
                            /* //-ani-//*/
                        }
                    }else{
                        figureSelecteTop = (figureSelectedHeight+2)*-1;

                        if(!settings.aniMode){
                            findSelected.css({ height:"auto" });
                        }else{
                            /*ani*/
                            objStart._eAnimation(findSelected, "downShow", figureSelectedHeight);
                            /* //-ani-//*/
                        }
                        propWrap.addClass(settings.upClassName);
                    }
                }else{
                    if(findLayer.length < 1 && $('.footer').length >= 1){
                        figureDiv = $('.footer').height();
                    }
                    figureListHeight = ((figureHalfBottom-2)-findThis.height()-figureDiv);

                    if(figureSelectedHeight >= figureListHeight){
                        if(!settings.aniMode){
                            findSelected.css({ height:figureListHeight });
                        }else{
                            /*ani*/
                            objStart._eAnimation(findSelected, "downHide", figureListHeight);
                            /* //-ani-//*/
                        }
                    }else{
                        if(!settings.aniMode){
                            findSelected.css({ height:"auto" });
                        }else{
                            /*ani*/
                            objStart._eAnimation(findSelected, "downHide", figureSelectedHeight);
                            /* //-ani-//*/
                        }
                        propWrap.addClass(settings.downClassName);
                    }
                    findSelected.css({ top:figureSelecteTop });
                }
            }else{
                if(!settings.aniMode){
                    findSelected.css({ top:"", height:"" });
                }else{
                    /*ani*/
                    if(figureBoxTop >= figureHalfBottom && figurePlus >= findTarget.height()){
                        objStart._eAnimation(findSelected, "upShow", 0);
                    }else{
                        objStart._eAnimation(findSelected, "upHide", 0);
                    }
                    /* //-ani-//*/
                    if(propWrap.hasClass(settings.upClassName)){
                        propWrap.removeClass(settings.upClassName);
                    }
                    if(propWrap.hasClass(settings.downClassName)){
                        propWrap.removeClass(settings.downClassName);
                    }
                }
            }
        },
        /*@private*/
        _eToggle : function(propWrap){
            var propList = propWrap.find('ul');

            if(propWrap.hasClass('show')){
                propWrap.removeClass('show');
                $(propList).hide();
            } else {
                propWrap.addClass('show');
                $(propList).show();
            }
        },
        /*@private*/
        _eHide : function(propWrap){
            propWrap.removeClass('show');
        },
        /*@private*/
        _eChange : function(propWrap, strText){
            propWrap.find('p').text(strText);
            propWrap.find('select').val([strText]);
        },
        /*@private*/
        _eAnimation : function(findSelected, str, figureNumber){
            if(str == "downHide"){
                findSelected
                    .css({ height:0, "display":"block" })
                    .animate({height: figureNumber}, 300);
            }else if(str == "downShow"){
                //var figureTop = (findSelected.outerHeight()-figureNumber)+1;
                var figureTop = (findSelected.outerHeight()-findSelected.height())+1;
                findSelected
                    .css({ height:0, top:-figureTop, "display":"block"})
                    .animate({height: figureNumber, top:-(figureTop+figureNumber-1)}, 300);
            }else if(str == "upShow"){
                var figureTop = (findSelected.outerHeight()-findSelected.height())+1;
                findSelected
                    .css({ "display":"block" })
                    .animate({height: 0, top:-figureTop}, 300, function(){
                        $(this).css({ top:"", height:"", "display":"none" });
                    });
            }else if(str == "upHide"){
                findSelected
                    .css({ "display":"block" })
                    .animate({height: 0}, 300, function(){
                        $(this).css({ top:"", height:"", "display":"none" });
                    });
            }
        }
    }

    $.fn.selectPackUpdate = function () {
        var findThis = $(this);
        objStart.eLoadingCreate(findThis);
    };

})(jQuery);
