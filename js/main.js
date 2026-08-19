/* ===================================================================
 * Imminent 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc' // mailchimp url
                };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* pretty print
    * -------------------------------------------------- */
    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    const ssSlickSlider = function() {
        // Only initialize if slider element exists
        if ($('.intro-slider').length) {
            $('.intro-slider').slick({
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 3000,
                fade: true,
                speed: 3000
            });
        }
    };


   /* modal
    * ---------------------------------------------------- */ 
    const ssModal = function() {

        const modal = document.querySelector(".modal");
        const trigger = document.querySelector(".modal-trigger");
        const closeButton = document.querySelector(".modal__close");

        // Only initialize if modal elements exist
        if (!modal || !trigger || !closeButton) return;

        function toggleModal() {
            modal.classList.toggle("show-modal");
        }
        function windowOnClick(event) {
            if (event.target === modal) {
                toggleModal();
            }
        }
        function pressEsc(event) {
            if (event.which=='27') {
                modal.classList.remove("show-modal");
            }
        }

        trigger.addEventListener("click", toggleModal);
        closeButton.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);
        window.addEventListener("keyup", pressEsc);

    };


   /* final countdown
    * ------------------------------------------------------ */
    const ssFinalCountdown = function() {
        // Only initialize if counter element exists
        if ($('.counter').length) {
            const finalDate = '2022/04/07';

            $('.counter').countdown(finalDate)
            .on('update.countdown finish.countdown', function(event) {

                const str = '<div class=\"counter__time days\">%D&nbsp;<span>D</span></div>' +
                            '<div class=\"counter__time hours\">%H&nbsp;<span>H</span></div>' +
                            '<div class=\"counter__time minutes\">%M&nbsp;<span>M</span></div>' +
                            '<div class=\"counter__time seconds\">%S&nbsp;<span>S</span></div>';
                        
                $(this).html(event.strftime(str));

            });
        }
    };


   /* tabs
    * ---------------------------------------------------- */ 
    const ssTabs = function() {

        const $tabNavListItems = $("ul.tab-nav__list li");
        const $tabContentItem  = $(".tab-content__item");

        $tabContentItem.hide().first().show();

        $tabNavListItems.on('click', function () {

            $tabNavListItems.removeClass("active");
            $(this).addClass("active");
            $tabContentItem.hide();

            const activeTab = $(this).attr("data-id");
            $("#" + activeTab).fadeIn(1000);

        });
    }


   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* smooth scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                window.location.hash = target;
            });
        });

    };


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* intro social smooth scroll (eased slide down to info)
    * ------------------------------------------------------ */
    const ssIntroScroll = function() {

        // easing that mirrors the hero text animation (cubic-bezier(0.23, 1, 0.32, 1) == easeOutQuint)
        if (typeof $.easing.introEase !== 'function') {
            $.easing.introEase = function (x) {
                return 1 - Math.pow(1 - x, 5);
            };
        }

        $('.intro-social a[href^="#"]').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            if (!$target.length) return;

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 1400, 'introEase');
        });

    };


   /* reveal info content (top-to-bottom variant of the hero effect)
    * ------------------------------------------------------ */
    const ssInfoReveal = function() {

        const $info = $('#info');
        if (!$info.length) return;

        // only enable the pre-hide/animation when JS is running
        $('html').addClass('ss-info-anim');

        const reveal = function() {
            if (($WIN.scrollTop() + $WIN.height()) > ($info.offset().top + 120)) {
                $info.addClass('info-revealed');
                $WIN.off('scroll.inforeveal', reveal);
            }
        };

        $WIN.on('scroll.inforeveal', reveal);
        reveal();

    };


   /* ajaxchimp
    * ------------------------------------------------------ */
    const ssAjaxChimp = function() {
        // Only initialize if mailchimp form exists
        if ($('#mc-form').length && typeof $.ajaxChimp !== 'undefined') {
            $('#mc-form').ajaxChimp({
                language: 'es',
                url: cfg.mailChimpURL
            });

            // Mailchimp translation
            //
            //  Defaults:
            //   'submit': 'Submitting...',
            //  0: 'We have sent you a confirmation email',
            //  1: 'Please enter a value',
            //  2: 'An email address must contain a single @',
            //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
            //  4: 'The username portion of the email address is invalid (the portion before the @: )',
            //  5: 'This email address looks fake or invalid. Please enter a real email address'

            $.ajaxChimp.translations.es = {
                'submit': 'Submitting...',
                0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
                1: '<i class="fas fa-exclamation-triangle"></i> You must enter a valid e-mail address.',
                2: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
                3: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
                4: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
                5: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.'
            }
        }
    };


   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssSlickSlider();
        ssModal();
        ssFinalCountdown();
        ssTabs();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
        ssIntroScroll();
        ssInfoReveal();
        ssAjaxChimp();

    })();

})(jQuery);