// jQuery Pythonic Style Class
//
// Version 1.lc1
//
// Created By Franco Lucchini
// 20 May 2010
//
function $$(_this, fn) {
    return function() {
        return fn.apply(_this, [ $(this) ].concat(Array.prototype.slice.call(arguments)));
    };
}

(function($) {
    $.Class = function() {
        var parent = null, members = null;
        if ($.isFunction(arguments[0])) {
            parent = arguments[0];
            members = arguments[1];
        } else {
            members = arguments[0];
        }
        if (members.__init__) var __class__ = members.__init__; else var __class__ = function() {
            parent.prototype.__init__.apply(this, arguments);
        };
        __class__.prototype = members;
        if (parent) {
            if (__class__.prototype.__proto__) {
                __class__.prototype.__proto__ = parent.prototype;
            } else {
                for (var prop in parent.prototype) {
                    if (typeof __class__.prototype[prop] == "undefined") __class__.prototype[prop] = parent.prototype[prop];
                }
            }
        }
        return __class__;
    };
})(jQuery);