var tag = document.createElement('script');
              tag.src = 'https://www.youtube.com/player_api';
          firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    var playerDefaults = {autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3, loop: 1};
    var tv;
    var vid = [{'videoId': 'C4WOXQgj0E0', 'startSeconds': 0, 'suggestedQuality': 'hd720'}],
    randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady}, playerVars: playerDefaults});
}

$('.hi em:last-of-type').html(vid.length);


$('body').css('opacity', '1');

            onPlayerPlay();
            onloadVideo();
            onPlayerPause();


function onPlayerReady(){
  tv.mute();
  vidRescale();
}
function onPlayerPause(){
  tv.pauseVideo();
}
function onloadVideo() {
 tv.loadVideoById(vid[currVid]);
}

function onPlayerPlay(){
  tv.playVideo();
//tv.seekTo(vid[currVid].startSeconds);
}

function onPlayerStateChange(e) {
  //console.log(e.data);

  /*if (e.data === 1){
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
  }*/
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

/*

$('.hi span:first-of-type').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
  if($('#tv').hasClass('pause')){
    tv.pauseVideo();
  } else {
   tv.seekTo(vid[currVid].startSeconds);
  }

});

$('.hi span:last-of-type').on('click', function(){
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});
*/

//$(window).on('load resize', function(){
  
//});











  

  $('.callb-popup').magnificPopup({
    items: {
        src: '#callb-form',
        type: 'inline'
    },
    tClose: 'Закрыть [Esc]',
    closeMarkup: '<button title="%title%" type="button" class="mfp-close bt">×</button><span class="closeInfo">Как только вы закроете это окно, <br>с вероятностью 99% данная информация станет вам недоступной.</span>',
    fixedContentPos: false,
    fixedBgPos: false,
    removalDelay: 300, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
        
      }
    },
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }


  $( document ).ready(function() {

    $('[type=tel]').intlTelInput({
        allowExtensions: false,
        autoFormat: true,
        autoHideDialCode: false,
        autoPlaceholder: false,
        defaultCountry: "auto",
         geoIpLookup: function(callback) {
           $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
             var countryCode = (resp && resp.country) ? resp.country : "";
             callback(countryCode);
           });
         },
        nationalMode: false,
        numberType: 'MOBILE',
        preferredCountries: ['ua', 'ru', 'by','us'],
        utilsScript: 'js/utils.js'
      });

    //


    


    var $count = $('#count');
    var countNumb = 1;

    $('#count').countdown("2018/10/10", function(event) {
      $(this).html(event.strftime('<h3>%H:%M:%S</h3>'));
      if (event.type == 'finish') {
        $('#cena').text('51 000 руб.');
        countNumb = 2;
      }
    });


    if (localStorage.un && localStorage.ue) {
      $('input[name=name]').val(localStorage.un);
      $('input[name=email]').val(localStorage.ue);
    }

    if (localStorage.up) {
      $('input[name=phone]').val(localStorage.up);
    }

  });
  
   $('.anchor').click(function() {
      var btn = +$(this).data('href');

    var dataBtn = $(this).data('btn');
    $('input[name=l_btn]').val(dataBtn);


    //if (vievport_w < 992) {
      /*
      var btn = $(this).data('href');
      var target = $('#'+btn);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1500);
      }
      return false;
   // }*/
  });






$(function() {

    $(document).ready(function() {









  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    midClick: true,
  });

  $('.popup-terms').magnificPopup({
          type: 'inline',

          fixedContentPos: true,
          fixedBgPos: true,

          overflowY: 'auto',

          closeBtnInside: true,
          preloader: true,
          
          midClick: true,
          removalDelay: 300,
          mainClass: 'mfp-zoom-in',
          callbacks: {
      beforeOpen: function() {
              this.st.mainClass = this.st.el.attr('data-effect');
              $('#info_inp').val(this.st.el.attr('data-info'));
              $('#price_inp').val(this.st.el.attr('data-price'));
            }
          }
    });

        $('[type=tel]').intlTelInput({
            allowExtensions: false,
            autoFormat: true,
            autoHideDialCode: false,
            autoPlaceholder: false,
            defaultCountry: "auto",
            geoIpLookup: function(callback) {
                $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            nationalMode: false,
            numberType: 'MOBILE',
            preferredCountries: ['ua', 'ru', 'by', 'us'],
        });

        var $slick2 = $('.oo-slider');

        $slick2.slick({
            slidesToShow: 1,
            arrows: false,
            infinite: true,
            adaptiveHeight: true,
            dots: false,
        });

        $('.nn-prev').click(function() {
            if (!$(this).hasClass('hid')) {
                $slick2.slick('slickPrev');
            }
        });

        $('.nn-next').click(function() {
            if (!$(this).hasClass('hid')) {
                $slick2.slick('slickNext');
            }
        });
    });
});
$(function() {

    var input = $('input');
    var form = $('form');
    var patternHidden = /(\D)+[^0-9]{2,}/i;
    var patternText = /(\D)+[^0-9]{2,}/i;
    var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    var patternTel = /([+()0-9 ]){9,18}/i;
    var errorFieldsMessage = {
        text: ' Name (text fields)',
        tel: ' Phone',
        email: ' Email',
    };

    function validationsField(field) {

        var fieldValue = field[0].value;
        var fieldType = field[0].type;

        if (fieldType === 'email') {
            var pattern = patternEmail;
        } else if (fieldType === 'text') {
            var pattern = patternText;
        } else if (fieldType === 'tel') {

            if (fieldValue.match(/[^0-9]/g)) {
                console.log(fieldValue.match(/[^0-9]/g));
                fieldValue = fieldValue.replace(/[^0-9]/g, ' d');
            }
            var pattern = patternTel;
        } else if (fieldType == 'hidden') {
            return true;
        }
        return pattern.test(fieldValue);
    }

    function validationsForm(form) {

        var fields = form.find('input:not([type=radio])');
        var errorTags = form.find('.error-message');
        var numberIsValid = 0;
        var errorMessage = [];

        fields.each(function() {
            var field = $(this);
            var errorFieldType = field[0].type;
            if (validationsField(field)) {
                field.removeClass('error').addClass('accept');
                numberIsValid++;
            } else {
                if (errorFieldType == 'text') {
                    errorMessage.push(errorFieldsMessage.text);
                } else if (errorFieldType == 'tel') {
                    errorMessage.push(errorFieldsMessage.tel);
                } else if (errorFieldType == 'email') {
                    errorMessage.push(errorFieldsMessage.email);
                }
                field.addClass('error');
            }

        });

        errorMessage.length > 0 ? errorTags.html('Err: <br><b>' + errorMessage + '</b>') : null;
        return fields.length == numberIsValid;

    }

    function keyupEventOff(e) {
        if (e.target.value === '') {
            $(this).removeClass('active');
        }
    }

    function keyupEvent(e) {
        var field = $(this);

        field.addClass('active');

        var errorTags = field.closest('form').find('.error-message');
        errorTags.html('');

        field.hasClass('error') ? field.removeClass('error') : false;
        validationsField(field) ? field.addClass('accept') : field.removeClass('accept');

    }

    function submitForm() {

        var me = $(this);
        var dataFields = me.find('input');
        var btnSubmit = form.find('[type=submit]');

        if (validationsForm(me)) {

            var l_v = me.find('input[name=l_v]');
            l_v.val(AMOPIXEL_IDENTIFIER.getVisitorUid());

            me.addClass('send');

            btnSubmit.attr('disabled', true);

            localStorage.ue = me.find('input[name=email]').val();
            localStorage.un = me.find('input[name=name]').val();
            localStorage.up = me.find('input[name=phone]').val();

            var fieldsData = me.serialize();
            me.removeClass('send');
            me[0].reset();
            dataFields.removeClass('active').removeClass('accept');
            window.location.href = 'http://localhost:3000/go.ddd';

        }
    }

    input.keyup(keyupEvent).focus(keyupEvent).focusout(keyupEventOff);
    form.submit(submitForm);

});