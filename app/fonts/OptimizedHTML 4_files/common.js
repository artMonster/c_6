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