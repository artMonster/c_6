$(function() {

  var input = $('input');
  var form = $('form');
  var patternHidden = /(\D)+[^0-9]{2,}/i;
  var patternText = /(\D)+[^0-9]{2,}/i;
  var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  var patternTel = /([+()0-9 ]){9,18}/i;
  var errorFieldsMessage = {
    text : ' Имя',
    tel : ' Телефон',
    email : ' Электронная почта',
  };

  function validationsField(field) {

    var fieldValue = field[0].value;
    var fieldType = field[0].type;

    if (fieldType == 'email') {
      var pattern = patternEmail;  
    } else if (fieldType == 'text') {
      var pattern = patternText;
    } else if (fieldType == 'tel') {
      var pattern = patternTel;
    } else if (fieldType == 'hidden') {
      return true; //var pattern = patternHidden;
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
      } else if (errorFieldType == 'tel'){
        errorMessage.push(errorFieldsMessage.tel);
      } else if (errorFieldType == 'email') {
        errorMessage.push(errorFieldsMessage.email);
      }
      field.addClass('error');
    }
    
  });

  errorMessage.length > 0 ? errorTags.html('Некорректное заполнение: <br><b>' + errorMessage + '</b>') : null;
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
    me.addClass('send');
    btnSubmit.attr('disabled', true);


    var utmm = me.find('input[name=l_u_s]').val();
    var gf = me.find('input[name=gf]').val();

    var lh = me.find('input[name=lh]').val();
    
    localStorage.ue = me.find('input[name=email]').val();
    localStorage.un = me.find('input[name=name]').val();
    localStorage.up = me.find('input[name=phone]').val();

    var fieldsData = me.serialize();

    var fieldsDataGet = {
        'l_id' : localStorage.l_id,
        'u_id' : localStorage.u_id,
        'l_st' : me.find('input[name=l_st]').val(),
        'phone' : me.find('input[name=phone]').val(),
      }

    $.ajax({
      type: 'POST',
      url: '../../mail/mail.php',
      //dataType: 'json',
      data: fieldsData,
      statusCode: {
        200: function(msg_m) {

            if (!me.find('input[name=l_info]').val() == '') {
              var qs = me.find('input[name=l_info]').val();
            }
            
          $.ajax({
            type: 'POST',
            url: '../../mail/gr_add.php',
            //dataType: 'json',
            data: fieldsData,
            statusCode: {
              200: function(msg_gr) {

                var gDataFIelds = {
                  'entry.1378648537': me.find('input[name=name]').val(),
                  'entry.906441403': me.find('input[name=phone]').val(),
                  'entry.1561585642': me.find('input[name=email]').val(),
                  'entry.1304558152': me.find('input[name=l_u_s]').val(),
                  'entry.2147320007': me.find('input[name=l_name]').val(),
                  'entry.1739428933': msg_gr + ' / ' + msg_m + ' / ' + localStorage.u_id,
                };

                $.ajax({
                  type: "POST",
                  url: 'https://docs.google.com/forms/d/e/' + gf + '/formResponse',
                  dataType: 'xml',
                  data: gDataFIelds,
                  statusCode: {
                    0: function() {
                       me.removeClass('send');
                       me[0].reset();
                       dataFields.removeClass('active').removeClass('accept');
                       window.location.href = lh;
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}

input.keyup(keyupEvent).focus(keyupEvent).focusout(keyupEventOff);
form.submit(submitForm);  
  
});
