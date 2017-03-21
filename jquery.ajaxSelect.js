// jQuery ajax select field
//
// Version 1.0+lc1
//
// Created By Franco Lucchini
// 21 Aug 2012
//
(function($) {
    $.fn.ajaxSelect = function(options) {
        function _load(sel) {
            var a = sel.attr("ajax_kv").split(",");
            var k = a[0];
            var v = a[1];
            if (!sel.attr("ajax_load")) return;
            sel.html("");
            $.ajax({
                type: "GET",
                url: sel.attr("ajax_load"),
                dataType: "json",
                success: function(o) {
                    if (sel.attr("empty")) sel.append("<option value=''>" + (sel.attr("empty_label") || "") + "</option>");
                    $(o.objects).each(function() {
                        sel.append($("<option class='" + this["class"] + "'>" + this[v] + "</option>").val(this[k]));
                    });
                    if (o.groups) {
                        $(o.groups).each(function() {
                            var grp = $("<optgroup></optgroup>").attr("label", this[v]);
                            $(this.objects).each(function() {
                                grp.append($("<option class='" + this["class"] + "'>" + this[v] + "</option>").val(this[k]));
                            });
                            sel.append(grp);
                        });
                    }
                    if (o.value) sel.val(o.value);
                },
                async: false
            });
        }
        var arg = arguments;
        $(this).each(function() {
            var sel = $(this);
            if (sel.hasClass("ajs_initialized")) {
                if (typeof options == "string") {
                    switch (options) {
                      case "load":
                        if (arg[1]) sel.attr("ajax_load", arg[1]);
                        _load(sel);
                        break;
                    }
                }
            } else {
                sel.addClass("ajs_initialized");
                if (!sel.attr("ajax_kv")) sel.attr("ajax_kv", "id,description");
                _load(sel);
            }
        });
        return this;
    };
})(jQuery);