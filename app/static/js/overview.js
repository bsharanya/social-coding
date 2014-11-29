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
                var l = languages[i].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
                return "text-" + l.toLowerCase();
            })
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .attr("font-family", "'Open Sans', sans-serif")
            .attr("fill", "#000000")
            .attr("x", "0")
            .attr("y", function() {
                return (65 + ((i)*heightForEach));
            })
            .attr("width", "77px")
            .attr("text-anchor", "start")
            .text(function() {
                return languages[i];
            });
    }

    for(year in details) {
        if(year == "2014") {
            console.log("came in here");
            var xPosition = $("#text-" + year).position().left;
            for(language in details[year]) {
                var languageClass = language;
                languageClass = languageClass.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-').toLowerCase();
                var yPosition = $("#text-" + languageClass).position().top;
                svg.append('path')
                    .attr('d', function(){
                        return "M"+ xPosition +", " + yPosition + " H " + (xPosition+20);
                    })
                    .attr("class", "horizontal-splits")
                    .attr("fill", "transparent")
                    .attr("stroke", "grey")
                    .attr("stroke-width", "1px")
                    .attr("opacity", "1");

            }
        }

    }

});