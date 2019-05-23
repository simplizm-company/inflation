/*
 * Eclipse for jQuery
 * Version: 1.0.1
 * Author: shinyongjun
 * Website: http://www.simplizm.com/
 */

 // issue connected event error

;(function($){
    'use strict';

    var Inflation = window.Inflation || {};

    Inflation = (function(){
        var fnidx = 0;

        function inflation(element, settings){
            var _ = this;

            _.defaults = {
                start: 0,
                division: 50,
                duration: 3000,
                comma: false,
                delay: 0
            }

            _.options = $.extend(true, _.defaults, settings);

            _.initials = {
                computedNumber: 0
            }

            _.$inflation = $(element);

            _.init(true);
        }

        return inflation;
    }());

    Inflation.prototype.getOriginNumber = function () {
        var _ = this;

        _.initials.originNumber = parseInt(_.$inflation.text());
        _.$inflation = _.$inflation.text(_.options.start);
        _.initials.step = (_.initials.originNumber - _.options.start) / _.options.division;
    }

    Inflation.prototype.playInflation = function (i) {
        var _ = this;

        _.initials.computedNumber = _.options.start + Math.round(_.initials.step * i) > _.initials.originNumber ? _.initials.originNumber : _.options.start + Math.round(_.initials.step * i);
        if (_.options.comma) {
            _.initials.computedNumber = _.initials.computedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        _.$inflation.text(_.initials.computedNumber);

        if (i < _.options.division) {
            setTimeout(function () {
                _.playInflation(i + 1);
            }, _.options.duration / _.options.division);
        }
    }

    Inflation.prototype.init = function () {
        var _ = this;

        _.getOriginNumber();
        setTimeout(function () {
            _.playInflation(1);
        }, _.options.delay);
    }

    $.fn.inflation = function(){
        var _ = this,
            o = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            r;
        for (var i = 0; i < l; i++) {
            if (typeof o == 'object' || typeof o == 'undefined') {
                _[i].Inflation = new Inflation(_[i], o);
            } else {
                r = _[i].Inflation[o].apply(_[i].Inflation, s);
                if (typeof r != 'undefined') {
                    return r;
                }
            }
        }
        return _;
    }
}(jQuery));