/*
 strftime for Javascript
 Copyright (c) 2008, Philip S Tellis <philip@bluesmoon.info>
 All rights reserved.
 
 This code is distributed under the terms of the BSD licence
 
 Redistribution and use of this software in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

   * Redistributions of source code must retain the above copyright notice, this list of conditions
     and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other materials provided
     with the distribution.
   * The names of the contributors to this file may not be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * \file strftime.js
 * \author Philip S Tellis \<philip@bluesmoon.info\>
 * \version 1.3
 * \date 2008/06
 * \brief Javascript implementation of strftime
 * 
 * Implements strftime for the Date object in javascript based on the PHP implementation described at
 * http://www.php.net/strftime  This is in turn based on the Open Group specification defined
 * at http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html This implementation does not
 * include modified conversion specifiers (i.e., Ex and Ox)
 *
 * The following format specifiers are supported:
 *
 * \copydoc formats
 *
 * \%a, \%A, \%b and \%B should be localised for non-English locales.
 *
 * \par Usage:
 * This library may be used as follows:
 * \code
 *     var d = new Date();
 *
 *     var ymd = d.strftime('%Y/%m/%d');
 *     var iso = d.strftime('%Y-%m-%dT%H:%M:%S%z');
 *
 * \endcode
 *
 * \sa \link Date.prototype.strftime Date.strftime \endlink for a description of each of the supported format specifiers
 * \sa Date.ext.locales for localisation information
 * \sa http://www.php.net/strftime for the PHP implementation which is the basis for this
 * \sa http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html for feedback
 */
//! Date extension object - all supporting objects go in here.
// http://hacks.bluesmoon.info/strftime/strftime.js
Date.ext = {};

Date.ext.util = {};

Date.ext.util.xPad = function(x, pad, r) {
    if (typeof r == "undefined") {
        r = 10;
    }
    for (;parseInt(x, 10) < r && r > 1; r /= 10) x = pad.toString() + x;
    return x.toString();
};

Date.prototype.locale = "en-GB";

if (document.getElementsByTagName("html") && document.getElementsByTagName("html")[0].lang) {
    Date.prototype.locale = document.getElementsByTagName("html")[0].lang;
}

Date.ext.locales = {};

Date.ext.locales.en = {
    a: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    A: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
    b: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    B: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    c: "%a %d %b %Y %T %Z",
    p: [ "AM", "PM" ],
    P: [ "am", "pm" ],
    x: "%d/%m/%y",
    X: "%T"
};

Date.ext.locales["en-US"] = Date.ext.locales.en;

Date.ext.locales["en-US"].c = "%a %d %b %Y %r %Z";

Date.ext.locales["en-US"].x = "%D";

Date.ext.locales["en-US"].X = "%r";

Date.ext.locales["en-GB"] = Date.ext.locales.en;

Date.ext.locales["en-AU"] = Date.ext.locales["en-GB"];

Date.ext.formats = {
    a: function(d) {
        return Date.ext.locales[d.locale].a[d.getDay()];
    },
    A: function(d) {
        return Date.ext.locales[d.locale].A[d.getDay()];
    },
    b: function(d) {
        return Date.ext.locales[d.locale].b[d.getMonth()];
    },
    B: function(d) {
        return Date.ext.locales[d.locale].B[d.getMonth()];
    },
    c: "toLocaleString",
    C: function(d) {
        return Date.ext.util.xPad(parseInt(d.getFullYear() / 100, 10), 0);
    },
    d: [ "getDate", "0" ],
    e: [ "getDate", " " ],
    g: function(d) {
        return Date.ext.util.xPad(parseInt(Date.ext.util.G(d) / 100, 10), 0);
    },
    G: function(d) {
        var y = d.getFullYear();
        var V = parseInt(Date.ext.formats.V(d), 10);
        var W = parseInt(Date.ext.formats.W(d), 10);
        if (W > V) {
            y++;
        } else if (W === 0 && V >= 52) {
            y--;
        }
        return y;
    },
    H: [ "getHours", "0" ],
    I: function(d) {
        var I = d.getHours() % 12;
        return Date.ext.util.xPad(I === 0 ? 12 : I, 0);
    },
    j: function(d) {
        var ms = d - new Date("" + d.getFullYear() + "/1/1 GMT");
        ms += d.getTimezoneOffset() * 6e4;
        var doy = parseInt(ms / 6e4 / 60 / 24, 10) + 1;
        return Date.ext.util.xPad(doy, 0, 100);
    },
    m: function(d) {
        return Date.ext.util.xPad(d.getMonth() + 1, 0);
    },
    M: [ "getMinutes", "0" ],
    p: function(d) {
        return Date.ext.locales[d.locale].p[d.getHours() >= 12 ? 1 : 0];
    },
    P: function(d) {
        return Date.ext.locales[d.locale].P[d.getHours() >= 12 ? 1 : 0];
    },
    S: [ "getSeconds", "0" ],
    u: function(d) {
        var dow = d.getDay();
        return dow === 0 ? 7 : dow;
    },
    U: function(d) {
        var doy = parseInt(Date.ext.formats.j(d), 10);
        var rdow = 6 - d.getDay();
        var woy = parseInt((doy + rdow) / 7, 10);
        return Date.ext.util.xPad(woy, 0);
    },
    V: function(d) {
        var woy = parseInt(Date.ext.formats.W(d), 10);
        var dow1_1 = new Date("" + d.getFullYear() + "/1/1").getDay();
        var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
        if (idow == 53 && new Date("" + d.getFullYear() + "/12/31").getDay() < 4) {
            idow = 1;
        } else if (idow === 0) {
            idow = Date.ext.formats.V(new Date("" + (d.getFullYear() - 1) + "/12/31"));
        }
        return Date.ext.util.xPad(idow, 0);
    },
    w: "getDay",
    W: function(d) {
        var doy = parseInt(Date.ext.formats.j(d), 10);
        var rdow = 7 - Date.ext.formats.u(d);
        var woy = parseInt((doy + rdow) / 7, 10);
        return Date.ext.util.xPad(woy, 0, 10);
    },
    y: function(d) {
        return Date.ext.util.xPad(d.getFullYear() % 100, 0);
    },
    Y: "getFullYear",
    z: function(d) {
        var o = d.getTimezoneOffset();
        var H = Date.ext.util.xPad(parseInt(Math.abs(o / 60), 10), 0);
        var M = Date.ext.util.xPad(o % 60, 0);
        return (o > 0 ? "-" : "+") + H + M;
    },
    Z: function(d) {
        return d.toString().replace(/^.*\(([^)]+)\)$/, "$1");
    },
    "%": function(d) {
        return "%";
    }
};

Date.ext.aggregates = {
    c: "locale",
    D: "%m/%d/%y",
    h: "%b",
    n: "\n",
    r: "%I:%M:%S %p",
    R: "%H:%M",
    t: "	",
    T: "%H:%M:%S",
    x: "locale",
    X: "locale"
};

Date.ext.aggregates.z = Date.ext.formats.z(new Date());

Date.ext.aggregates.Z = Date.ext.formats.Z(new Date());

Date.ext.unsupported = {};

Date.prototype.strftime = function(fmt) {
    if (!(this.locale in Date.ext.locales)) {
        if (this.locale.replace(/-[a-zA-Z]+$/, "") in Date.ext.locales) {
            this.locale = this.locale.replace(/-[a-zA-Z]+$/, "");
        } else {
            this.locale = "en-GB";
        }
    }
    var d = this;
    while (fmt.match(/%[cDhnrRtTxXzZ]/)) {
        fmt = fmt.replace(/%([cDhnrRtTxXzZ])/g, function(m0, m1) {
            var f = Date.ext.aggregates[m1];
            return f == "locale" ? Date.ext.locales[d.locale][m1] : f;
        });
    }
    var str = fmt.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g, function(m0, m1) {
        var f = Date.ext.formats[m1];
        if (typeof f == "string") {
            return d[f]();
        } else if (typeof f == "function") {
            return f.call(d, d);
        } else if (typeof f == "object" && typeof f[0] == "string") {
            return Date.ext.util.xPad(d[f[0]](), f[1]);
        } else {
            return m1;
        }
    });
    d = null;
    return str;
};

Date.ext.locales["fr"] = {
    a: [ "dim", "lun", "mar", "mer", "jeu", "ven", "sam" ],
    A: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
    b: [ "jan", "f\ufffdv", "mar", "avr", "mai", "jun", "jui", "ao\ufffd", "sep", "oct", "nov", "d\ufffdc" ],
    B: [ "janvier", "f\ufffdvrier", "mars", "avril", "mai", "juin", "juillet", "ao\ufffdt", "septembre", "octobre", "novembre", "d\ufffdcembre" ],
    c: "%a %d %b %Y %T %Z",
    p: [ "", "" ],
    P: [ "", "" ],
    x: "%d.%m.%Y",
    X: "%T"
};

Date.ext.locales["fr-CA"] = Date.ext.locales["fr"];

Date.ext.locales["fr-CA"].x = "%Y-%m-%d";

Date.ext.locales["de"] = {
    a: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
    A: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
    b: [ "Jan", "Feb", "M\ufffdr", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
    B: [ "Januar", "Februar", "M\ufffdrz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
    c: "%a %d %b %Y %T %Z",
    p: [ "", "" ],
    P: [ "", "" ],
    x: "%d.%m.%Y",
    X: "%T"
};

Date.ext.locales["de-CH"] = Date.ext.locales["de"];

Date.ext.locales["de-CH"].a = [ "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam" ];

Date.ext.locales["it"] = {
    a: [ "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab" ],
    A: [ "Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato" ],
    b: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
    B: [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ],
    c: "%a %d %b %Y %T %Z",
    p: [ "", "" ],
    P: [ "", "" ],
    x: "%d/%m/%Y",
    X: "%T"
};

Date.ext.locales["it-IT"] = Date.ext.locales["it"];

Date.ext.locales["it-CH"] = Date.ext.locales["it"];
