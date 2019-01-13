$(document).ready(function () {
    function Terminator() {
        this.version = "0.0.0.2";
        this.home = "https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        var waitPanel = setInterval(function () {
            if ($("i.em-smiley").length) {
                clearInterval(waitPanel);
                Terminator.initSmailes();
            }
        }, 2000);
    };

    Terminator.prototype.initSmailes = function () {
        $("i.em-smiley").parent().parent().before('<div class="col text-left"><span id="tr-sm" class="toggler cursor-pointer smiles mr-3"><i class="em em-nerd_face"></i></span></div>');
        Terminator.load("js", home + "js/functions.js?r=" + Math.random(), function () {Terminator.createSmilesBox();});
        Terminator.load("css", home + "css/main.css?r=" + Math.random());
    }

    Terminator.prototype.load = function (type, url, cb) {
        var xhr = new XMLHttpRequest(),
            f = false;
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    switch (type) {
                        case "css":
                            head = document.head || document.getElementsByTagName('head')[0],
                                style = document.createElement('style');
                            style.type = 'text/css';
                            if (style.styleSheet) {
                                style.styleSheet.cssText = xhr.responseText;
                            } else {
                                style.appendChild(document.createTextNode(xhr.responseText));
                            }
                            head.appendChild(style);
                            break;
                        case "js":
                            f = document.createElement("script");
                            f.type = "text/javascript";
                            f.text = xhr.responseText;
                            document.body.appendChild(f);
                            break;
                    }
                    if (typeof cb === "function") {
                        cb();
                    }
                }
            }
        };
        xhr.send(null);
    }
    Terminator.prototype.createSmilesBox = function () {
        console.log(1111);
    }

    var Terminator = new Terminator();
    Terminator.run();
});


















/*

$(document).ready(function () {

    var home = 'https://raw.githubusercontent.com/Semanticworld/terminator/master/assets/';



    function run() {
        $("body").append($("<div/>")
            .addClass("tr-window")
            .prepend($("<div/>").addClass("tr-title")
                .prepend('<span>Смайлы</span><span class="tr-close"></span>')));
        $($("<div/>").addClass("tr-tabs")).insertAfter($(".tr-title"));
        for (var i = 8; i >= 0; i--) {
            $(".tr-window .tr-tabs")
                .prepend($("<div/>")
                    .addClass("tr-tab-content tr-sm" + i + "-block"));
        }
        $(".tr-sm0-block").addClass("active");
        $(".tr-tabs")
            .prepend('<ul class="tr-tab-caption"><li class="active"><img src="' + home + 'ico/0.png"></li><li><img src="' + home + 'ico/1.png"></li><li>2</li><li>3</li><li><img src="' + home + 'ico/4.png"></li><li>5</li><li>6</li><li>7</li><li>8</li></ul>');

        $('.tr-window').tr_drags({
            handle: ".tr-title"
        });
        $(".tr-close").on("click", function (e) {
            e.preventDefault();
            $(".tr-window").css("visibility", "hidden");
        });

        $('ul.tr-tab-caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tr-tabs').find('div.tr-tab-content').removeClass('active').eq($(this).index()).addClass('active');
        });
        var smilespack = [];
        smilespack["1"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ea", "eb", "ec", "ed", "ef"
        ];
        smilespack["4"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb"
        ];
        smilespack["2"] = ["aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "at", "au", "av", "aw", "ax", "ay", "az"];

        smilespack.forEach(function (a, b) {
            var s = '';
            a.forEach(function (a) {
                s += '<img src="' + home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + b + a + '" data-src="' + home + 'smiles/' + 's' + b + '/' + a + '.gif">';
            });
            $(".tr-sm" + b + "-block").append(s);
        });
        $(document).on("click", ".tr-smile", function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            var index = lovesmiles.indexOf(sm);
            if (index > -1) {
                lovesmiles.splice(index, 1);
            } else {
                $(".tr-tab-content.tr-sm0-block")
                    .prepend('<img src="' + home + 'smiles/' + 's' + sm[0] + '/' + sm[1] + sm[2] + '.gif" class="tr-smile" data-face="' + sm + '">');

            }
            lovesmiles.push(sm);
            localStorage.setItem('tr-love-smiles', JSON.stringify(lovesmiles));
            if (lovesmiles.length > 50) {
                lovesmiles.shift();
                $('.tr-tab-content.tr-sm0-block img').last().remove();
            };
        });



        var lovesmiles = JSON.parse(localStorage.getItem("tr-love-smiles"));
        var s = '';
        lovesmiles.forEach(function (a) {
            s += '<img src="' + home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + a + '" data-src="' + home + 'smiles/' + 's' + a[0] + '/' + a[1] + a[2] + '.gif">';
        });
        $(".tr-sm0-block").append(s);
        lazyload();


        $(".start").on("click", function (e) {
            $(".tr-window").css("visibility", "visible");
        })

    }

});
*/