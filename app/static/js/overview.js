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
        .attr('d', "M77, 30 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "Grey")
        .attr("stroke-width", "2px");

    svg.append('path')
        .attr('d', "M77, 480 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "Grey")
        .attr("stroke-width", "2px");

    for (var i = 0; i < years.length; i++) {
        svg.append('path')
            .attr('d', function () {
                return "M" + (162 + ((i) * widthForEach)) + ", 30 V 480";
            })
            .attr("class", "vertical-splits")
            .attr("fill", "transparent")
            .attr("stroke", "Grey")
            .attr("stroke-width", function () {
                if (i == 6) {
                    return "0px";
                } else {
                    return "2px";
                }
            })
            .attr("stroke-dasharray", "2, 2")
            .attr("opacity", "0.8");
    }


    for(var i = 0; i < languages.length; i++) {
        svg.append('path')
            .attr('d', function(){
                return "M77, " + (30 + ((i) * heightForEach)) + " H 672";
            })
            .attr("class", "horizontal-splits")
            .attr("fill", "transparent")
            .attr("stroke", "grey")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", "8, 5")
            .attr("opacity", "0.6");
    }

    var year_nodes = svg.append("g")
                   .selectAll(".year-group")
                   .data(years)
                   .enter()
                   .append("g")
                   .attr("class", "year-group")
                   .attr("transform", function (d, i) {
                        var xCoordinate = (77 + ((i)*widthForEach));
                        var yCoordinate = 25;
                        return "translate(" + xCoordinate + "," + yCoordinate + ")";
                    });

    year_nodes.append('text')
        .attr("font-size", "15px")
        .attr("id", function(d) {
            return "text-" + d;
        })
        .attr("font-weight", "bold")
        .attr("font-family", "PT Sans")
        .attr("fill", "#000000")
        .attr("text-align", "center")
        .text(function(d) {
            return d;
        }).on("click", function (d) {
            $.post("api/year", {"year": d}).done(function() {
                $(location).attr('href', '/year')
            });
        }).on("mouseover", function() {
            d3.select(this).attr("font-size", "25px").attr("fill", "red")
        }).on("mouseout", function() {
            d3.select(this).attr("font-size", "15px").attr("fill", "#000000")
        });

    var languages_nodes = svg.append("g")
        .selectAll(".languages-group")
        .data(languages)
        .enter()
        .append("g")
        .attr("class", "languages-group")
        .attr("transform", function (d, i) {
            var xCoordinate = 0;
            var yCoordinate = (40 + ((i)*heightForEach));
            return "translate(" + xCoordinate + "," + yCoordinate + ")";
        });

    languages_nodes.append('text')
        .attr("id", function(d) {
            var l = d.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '-');
            return "text-" + l.toLowerCase();
        })
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("font-family", "PT Sans")
        .attr("fill", "#000000")
        .attr("width", "77px")
        .attr("text-anchor", "start")
        .text(function(d) {
            return d;
        }).on("click", function (d) {
            $.post("api/language", {"language": d}).done(function() {
                $(location).attr('href', '/language')
            });
        }).on("mouseover", function() {
            d3.select(this).attr("font-size", "20px").attr("fill", "red")
        }).on("mouseout", function() {
            d3.select(this).attr("font-size", "10px").attr("fill", "#000000")
        });;

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
});