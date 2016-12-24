var m,
MAIN = {
    settings: {
        menuBtn: $('.menu-btn'),
        topBar: $('.top-bar'),
        middleBar: $('.middle-bar'),
        bottomBar: $('.bottom-bar'),
        menu: $('.dl-menu-container'),
        menuCategory: $('.dl-menu .category-link'),
        subMenuCategory: $('.dl-menu .subcategory-link'),
        submenu: $('.dl-submenu'),
        searchIconBtn: $('nav .search .svg-btn'),
        search: $('nav .search'),
        dimness: $('.dimness'),
        searchIconNotBtn: $('nav .search .svg-not-btn'),
        valueBtn: $('.value button'),
        valueInput: $('.value input'),
        isCloseBtn: 0,
        isArrowBtn: 0,
    },

    init: function() {
        m = this.settings;
        this.openMenu();
        this.openSubMenu();
        this.closeSubMenu();
        //this.applyNowBtnScroll();
    },

    setMenuBtn: function(topBarClass, middleBarClass, bottomBarClass) {
        m.topBar.addClass(topBarClass);
        m.middleBar.addClass(middleBarClass);
        m.bottomBar.addClass(bottomBarClass);
        m.isCloseBtn = 1;
    },
    unsetMenuBtn: function(topBarClass, middleBarClass, bottomBarClass) {
        m.topBar.removeClass(topBarClass);
        m.middleBar.removeClass(middleBarClass);
        m.bottomBar.removeClass(bottomBarClass);
        m.isCloseBtn = 0;
    },
    openMenu: function() {
        m.menuBtn.click(function(){
            if(!m.isArrowBtn) {
                if(!m.isCloseBtn) {
                    m.menu.animate({
                        left: 0
                    }, 300);
                    $('.bar').addClass('bar-open');
                    setTimeout(function() { MAIN.setMenuBtn('top-bar-close', 'middle-bar-close', 'bottom-bar-close');}, 400);
                    setTimeout(function() {
                        m.menuBtn.addClass('menu-btn-open')
                    }, 300);
                    setTimeout(function() {
                        $('.dl-menu-header h3').show();
                    }, 300);
                    
                }
                else {
                    $('.bar').removeClass('bar-open');
                    setTimeout(function() {
                        $('.dl-menu-header h3').hide();
                    }, 0);
                    setTimeout(function() { MAIN.unsetMenuBtn('top-bar-close', 'middle-bar-close', 'bottom-bar-close'); }, 100);
                    if ($(window).width() > 768) {
                        m.menu.animate({
                            left: '-50%'
                        }, 300);
                    }
                    else {
                        m.menu.animate({
                            left: '-100%'
                        }, 300);
                    }
                    m.menuBtn.removeClass('menu-btn-open');
                }
                if( $(window).width() < 425) {
                    m.search.removeClass('search-clicked');
                    $('nav .search form').removeClass('form-active');
                    m.searchIconBtn.hide();
                    m.searchIconNotBtn.show();
                }
            }
        });
    },

    openSubMenu: function() {
        m.menuCategory.click(function(){
            if($(this).parent().find(m.submenu).is(':visible')) {
                $(this).parent().find(m.submenu).slideUp();
                MAIN.unsetMenuBtn('top-bar-arrow', 'middle-bar-arrow', 'bottom-bar-arrow')
                setTimeout(function(){
                    $('.dl-menu-container .line').removeClass('open');
                }, 200);
                if ($(window).width() > 768) {
                    setTimeout(function(){
                        $('.dl-menu-container').animate({
                            width: '50%'
                        });
                    }, 600);
                }
                else {
                    setTimeout(function(){
                        $('.dl-menu-container').animate({
                            width: '100%'
                        });
                    }, 600);
                }
            }
            else {
                $('.dl-menu-container').animate({
                    width: '100%'
                });
                let thatSubmenu = $(this).parent().find(m.submenu);
                m.submenu.not(thatSubmenu).fadeOut();
                if ($(window).width() >= 768) {
                    setTimeout(function(){
                        thatSubmenu.fadeIn(500);
                    }, 850);
                    setTimeout(function(){
                        $('.dl-menu-container .line').addClass('open');
                    }, 500);
                }
                else {
                    setTimeout(function(){
                        thatSubmenu.fadeIn(500);
                    }, 500);
                    m.menuCategory.fadeOut(300);
                    $('.calc-link').fadeOut(300);
                }
                MAIN.setMenuBtn('top-bar-arrow', 'middle-bar-arrow', 'bottom-bar-arrow');
            }
        });
    },

    closeSubMenu: function() {
        m.menuBtn.click(function(){
            if(m.topBar.hasClass('top-bar-arrow')) {
                m.submenu.slideUp();
                m.topBar.removeClass('top-bar-arrow');
                m.middleBar.removeClass('middle-bar-arrow');
                m.bottomBar.removeClass('bottom-bar-arrow');
                if ($(window).width() >= 768) {
                    setTimeout(function(){
                        $('.dl-menu-container .line').removeClass('open');
                    }, 200);
                    setTimeout(function(){
                        $('.dl-menu-container').animate({
                            width: '50%'
                        });
                    }, 600);
                }
                else {
                    setTimeout(function(){
                        m.menuCategory.fadeIn(500);
                        $('.calc-link').fadeIn(500);
                    }, 500);
                }
            }
        });
    }
    /*applyNowBtnScroll: function() {
        $(window).scroll(function(){
            let scroll_top = $(this).scrollTop(); // get scroll position top
            let height_element_parent =  $('.whole-product .apply-now').parent().outerHeight(); //get high parent element
            let height_element = $('.whole-product .apply-now').height(); //get high of elemeneto
            let position_fixed_max = height_element_parent - height_element; // get the maximum position of the elemen
            let position_fixed = scroll_top < 250 ? 250 - scroll_top : position_fixed_max > scroll_top ? 0 : position_fixed_max - scroll_top ;
            $('.whole-product .apply-now').css('top',position_fixed);
        });
    }*/

    /*clickSearch: function() {
        m.searchIconNotBtn.click(function() {
            $(window).attr('location','http://www.example.com')
            m.search.addClass('search-clicked');
            m.dimness.addClass('dimness-visible');
            $('nav .search form').addClass('form-active');
            $('input[name="search"]').focus();
            m.menu.hide();
            m.topBar.addClass('top-bar-close');
            m.middleBar.addClass('middle-bar-close');
            m.bottomBar.addClass('bottom-bar-close');
            m.topBar.removeClass('top-bar-arrow');
            m.middleBar.removeClass('middle-bar-arrow');
            m.bottomBar.removeClass('bottom-bar-arrow');
            m.searchIconNotBtn.hide();
            m.searchIconBtn.show();
        });
        $('nav form').click(function(){
            m.dimness.addClass('dimness-visible');
        });
    }*/
};
$(function(){
     MAIN.init();
});

/*function stopButtonScroll() {
     $(window).scroll(function() {   
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 30) {
            //alert("bottom!");
            $('.whole-product .apply-now').css('position', 'absolute');
        }
        else {
            $('.whole-product .apply-now').css('position', 'fixed');
        }
    });
}*/