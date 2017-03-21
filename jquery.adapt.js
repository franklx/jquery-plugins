// jQuery Field Adapter
// for using in form get and set modules
//
// Version 1.0+lc1
//
// Created By Franco Lucchini
// 16 Aug 2012
//
(function($) {
    function lc_dateString(s) {
        if (_dtre_.test(s.toString())) {
            var dt = _dtre_.exec(s.toString());
            return new Date(dt[1] * 1, dt[2] - 1, dt[3] * 1, dt[4] * 1, dt[5] * 1, dt[6] * 1);
        }
        return s;
    }
    const _dtre_ = /#([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)#/;
    $.adapt = {
        get: function(element) {
            if (element.data("redactor")) {
                return element.getCode(value);
            } else if (element.data("lcButtonSet")) {
                var bS = element.data("lcButtonSet");
                var out = "";
                $("input", bS).each(function(i, o) {
                    o = $(o);
                    var _id = o.val();
                    if (o.attr("checked")) out += _id;
                });
                return out;
            } else if (element.data("datepicker")) {
                try {
                    if (element.val() == "") throw true;
                    return element.data("datepicker").date.toISOString();
                } catch (e) {
                    return null;
                }
            } else if (element.hasClass("hasDateEntry")) {
                var _dt = element.dateEntry("getDate");
                try {
                    return _dt.toISOString();
                } catch (e) {
                    return null;
                }
            }
            return element.val() || null;
        },
        set: function(element, value) {
            if (element.data("cleditor")) {
                var cleditor = element.data("cleditor");
                element.val(value);
                cleditor.updateFrame();
            } else if (element.data("lcButtonSet")) {
                var bS = element.data("lcButtonSet");
                $("input", bS).each(function(i, o) {
                    o = $(o);
                    var _id = o.val();
                    o.attr("checked", value.indexOf(_id) > -1);
                });
                return true;
            } else if (element.data("redactor")) {
                element.setCode(value);
                return true;
            } else if (element.data("toggle-group")) {
                element.val(value).blur();
                return true;
            } else if (element.data("datepicker")) {
                element.data("datepicker").setDate(new Date(value + "T00:00"));
                return true;
            } else if (element.hasClass("hasDateEntry")) {
                element.dateEntry("setDate", new Date(value + "T00:00"));
                return true;
            }
            return false;
        }
    };
})(jQuery);