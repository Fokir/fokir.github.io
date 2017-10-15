(function ($) {
    var unique = 0;
    jQuery.fn.calculate = function (options) {
        return this.each(function () {
            var data = $.extend({
                cities: {},
                types: {},
                height: 2.7,
                long: null,
                width: null,
                type: null,
                city: null,
            }, options);

            var $container = $(this);
            $container.addClass('cp-container');

            $e = $('<div/>').addClass('cp-container-inner');
            $container.append($e);
            $e.append('<h1>Калькулятор подбора радиатора отопления</h1>');
            
            var titles = {
                type: 'Тип дома',
                height: 'Высота',
                long: 'Длинна',
                width: 'Ширина',
                city: 'Ближайший город'
            };

            ['type', 'height', 'long', 'width', 'city'].forEach(function (key) {
                var $input;
                switch (key) {
                    case 'type':
                        $input = $('<select/>');
                        $.each(data.types, function (key, value) {
                            $input.append($('<option/>').text(key).attr('value', value));
                        });
                        if (data.type) $input.val(data.type);
                        else setTimeout(function () { $input.trigger('change') });
                        break;
                    case 'city':
                        $input = $('<input type="text"/>');
                        $input.autocomplete({
                            source: Object.keys(data.cities),
                            minLength: 0
                        }).on('focus', function () {
                            console.log('1');
                            $(this).autocomplete('search', '');
                        });
                        if (data.city) $input.val(data.city);
                        break;
                    default:
                        $input = $('<input type="text"/>');
                        if (data[key]) $input.val(data[key]);
                        break;
                }
                var id = 'cp-input__' + (unique++);
                $input.attr('id', id);
                var $block = $('<div/>').addClass('cp-input');
                $block.append($('<label/>').attr('for', id).text(titles[key]));
                $block.append($input);
                if (['height', 'long', 'width'].indexOf(key) > -1) {
                    $block.append($('<span/>').text('м'));

                    $input.on('keypress', function (event) {
                        console.log(event.key);
                        if (event.key === ',' && $input.val().indexOf('.') === -1) {
                            $input.val($input.val() + '.');
                        }
                        if (!$.isNumeric(event.key) && !(event.key === '.' && $input.val().indexOf('.') === -1)) {
                            event.preventDefault();
                        }
                    })
                }
                $e.append($block);

                $input.on('change input autocompleteselect', function () {
                    var $this = $(this);
                    setTimeout(function () {
                        var val = $this.val() || 0;
                        if (key === 'city') {
                            val = data.cities[val] || 1;
                        }
                        data[key] = parseFloat(val);
                        updateInputs();
                    });
                })
            });

            var $result = $('<div/>').addClass('cp-result');

            $e.append($result);

            function updateInputs() {
                let result = ['type', 'height', 'long', 'width', 'city'].reduce(function (result, key) {
                    return result * data[key];
                }, 1);

                $result.text('Требуемая мощность: ' + result.toFixed(2) + 'вт');
            }

        });
    };
})(jQuery);