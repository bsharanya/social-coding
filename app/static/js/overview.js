d3.json('api/overview', function(error, data) {
    var svg = d3.select("#main-svg");

    svg.attr("width", '672px')
        .attr("height", '504px');

    var years = data.years;
    var languages = data.languages;
    var details = data.details;

    var widthForEach = (595/years.length);
    var heightForEach = (450/languages.length);

    svg.append('path')
        .attr('d', "M77, 50 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "Grey")
        .attr("stroke-width", "2px");

    svg.append('path')
        .attr('d', "M77, 500 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "Grey")
        .attr("stroke-width", "2px");

    for(var i = 0; i < years.length; i++) {
        svg.append('path')
            .attr('d', function(){
                return "M" + (162+ ((i)*widthForEach)) + ", 50 V 500";
            })
            .attr("class", "vertical-splits")
            .attr("fill", "transparent")
            .attr("stroke", "Grey")
            .attr("stroke-width", function() {
                if(i == 6) {
                    return "0px";
                } else {
                    return "4px";
                }
            })
            .attr("stroke-dasharray", "10, 10")
            .attr("opacity", "0.8");

        svg.append('text')
            .attr("font-size", "15px")
            .attr("id", function() {
                var c = years[i];
                return "text-" + c;
            })
            .attr("font-weight", "bold")
            .attr("font-family", "'Open Sans', sans-serif")
            .attr("fill", "#000000")
            .attr("x", function() {
                return (77 + ((i)*widthForEach));
            })
            .attr("y", "40")
            .text(function() {
                return years[i];
            }).on("click", function () {
                var year = $(this)[0].innerHTML;
                $.post("api/year", {"year": year}).done(function() {
                    $(location).attr('href', '/year')
                });
            });
      }

    for(var i = 0; i < languages.length; i++) {
        svg.append('path')
            .attr('d', function(){
                return "M77, " + (50 + ((i) * heightForEach)) + " H 672";
            })
            .attr("class", "horizontal-splits")
            .attr("fill", "transparent")
            .attr("stroke", "grey")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", "10, 10")
            .attr("opacity", "0.8");

        svg.append('text')
            .attr("id", function() {
                var l = languages[i].replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '-');
                return "text-" + l.toLowerCase();
            })
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .attr("font-family", "'Open Sans', sans-serif")
            .attr("fill", "#000000")
            .attr("x", "0")
            .attr("y", function() {
                return (60 + ((i)*heightForEach));
            })
            .attr("width", "77px")
            .attr("text-anchor", "start")
            .text(function() {
                return languages[i];
            }).on("click", function () {
                var language = $(this)[0].innerHTML;
                $.post("api/language", {"language": language}).done(function() {
                    $(location).attr('href', '/language')
                });
            });
    }

    var allYears = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];
    for(var j = 0; j < allYears.length; j++) {
        var year = details[allYears[j]];
        var svgPosition = $("#main-svg").position();
        var xPosition = $("#text-" + allYears[j]).position().left - svgPosition.left;
        for (language in year) {
            var languageClass = language;
            languageClass = languageClass.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '-').toLowerCase();
            var yPosition = $("#text-" + languageClass).position().top - svgPosition.top + 5;
            svg.append('rect')
                .attr("class", "language-rects")
                .attr('x', xPosition)
                .attr('y', yPosition)
                .attr("fill", "red")
                .attr("width", "0px")
                .attr("height", "4px")
                .transition()
                .duration(function () {
                    return (j + 1) * 500;
                })
                .delay(function () {
                    return (j) * 1000;
                })
                .attr("width", year[language])
                .ease("linear");
        }
    }

//    $(".language-rects").css({ boxShadow: '0.4em 0.4em 1em 0.4em olive;' })
});