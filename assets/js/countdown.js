(function ($) {
    "use strict";

    $.fn.countdown = function (options, complete) {
        var settings = $.extend({ date: null, format: "on" }, options);

        return this.each(function () {
            var element = $(this);
            var interval;

            function update() {
                var eventDate = Date.parse(settings.date) / 1000;
                var currentDate = Math.floor(Date.now() / 1000);
                var seconds = Math.max(0, eventDate - currentDate);
                var days = Math.floor(seconds / 86400);
                seconds -= days * 86400;
                var hours = Math.floor(seconds / 3600);
                seconds -= hours * 3600;
                var minutes = Math.floor(seconds / 60);
                seconds -= minutes * 60;

                if (settings.format === "on") {
                    days = String(days).padStart(2, "0");
                    hours = String(hours).padStart(2, "0");
                    minutes = String(minutes).padStart(2, "0");
                    seconds = String(seconds).padStart(2, "0");
                }

                element.find(".days").text(days);
                element.find(".hours").text(hours);
                element.find(".minutes").text(minutes);
                element.find(".seconds").text(seconds);
                element.find(".timeRefDays").text("ថ្ងៃ");
                element.find(".timeRefHours").text("ម៉ោង");
                element.find(".timeRefMinutes").text("នាទី");
                element.find(".timeRefSeconds").text("វិនាទី");

                if (eventDate <= currentDate) {
                    clearInterval(interval);
                    if (typeof complete === "function") complete.call(element[0]);
                }
            }

            update();
            interval = setInterval(update, 1000);
        });
    };

    $(function () {
        var countdown = $("#countdown");
        if (!countdown.length) return;
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        countdown.countdown({ date: endDate, format: "on" });
    });
}(jQuery));
