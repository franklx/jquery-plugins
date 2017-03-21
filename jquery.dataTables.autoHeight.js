/**
 * @summary     autoHeight
 * @description Automatic height adapt via CSS
 * @file        autoHeight.js
 * @version     1.0+lc1
 * @author      Franco Lucchini
 * @license     GPL v2 or BSD 3 point style
 *
 * @copyright Copyright 2012 Franco Lucchini, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
(function($, window, document) {
    var autoHeight = function(oDTSettings) {
        var dt = oDTSettings;
        var tm = null;
        if (dt.oInit.sScrollY == "auto") {
            function _fnResize(a, b, c) {
                var $wr = $(dt.nTableWrapper);
                var $par = $wr.parent();
                var h_bdy = $par[0].tagName == "BODY" ? $wr.innerHeight() : $par.innerHeight();
                var $bd = $(dt.nTable).parent();
                var th = -$bd.innerHeight();
                $wr.children().each(function(_, o) {
                    th += $(o).outerHeight() || 0;
                });
                dt.oScroll.sY = h_bdy - th;
                $bd.height(h_bdy - th);
                if (dt.oScroller) dt.oScroller.fnMeasure(true);
            }
            dt.aoInitComplete.push({
                fn: function() {
                    setTimeout(_fnResize, 0);
                },
                sName: "autoHeight"
            });
            $(window).resize(function() {
                if (tm) clearTimeout(tm);
                tm = setTimeout(_fnResize, 100);
            });
        }
    };
    autoHeight.prototype.CLASS = "autoHeight";
    autoHeight.VERSION = "1.0+lc1";
    autoHeight.prototype.VERSION = autoHeight.VERSION;
    if (typeof $.fn.dataTable == "function" && typeof $.fn.dataTableExt.fnVersionCheck == "function" && $.fn.dataTableExt.fnVersionCheck("1.9.0")) {
        $.fn.dataTableExt.aoFeatures.push({
            fnInit: function(oDTSettings) {
                new autoHeight(oDTSettings);
                return null;
            },
            cFeature: "a",
            sFeature: "autoHeight"
        });
    } else {
        alert("Warning: autoHeight requires DataTables 1.9.0 or greater - www.datatables.net/download");
    }
    $.fn.dataTable.autoHeight = autoHeight;
})(jQuery, window, document);