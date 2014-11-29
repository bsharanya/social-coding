/**
 * Created by tejalathippeswamy on 11/28/14.
 */
d3.json('api/year', function(error, data) {
    var svg = d3.select("#year-svg");

    svg.attr("width", '672px')
        .attr("height", '504px');

    var root = data.repositories;
    var length = root.length;
    var inter_width = 24;

    var text1 = svgContainer.append("text")
        .attr("x", 350)
        .attr("y", 40)
        .text("2010") //need to get the year
        .attr("fill", "gray")
        .attr("font-size", "18")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var line1 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 350)
        .attr("y1", 50)
        .attr("x2", 950)
        .attr("y2", 50);

    var line2 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 350)
        .attr("y1", 300)
        .attr("x2", 950)
        .attr("y2", 300);

    var line3 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 350)
        .attr("y1", 325)
        .attr("x2", 950)
        .attr("y2", 325);


    for (var i=0;i<data.repositories.length;i++) {
        var y1 = 0;
        var y2 = 50;
        var repo_name = data.repositories[i].name;
        console.log(repo_name);
        var no_foll = data.repositories[i].followers;
        // console.log(no_foll);
        for(var j=0;j<data.repositories[i].languages.length;j++) {
            var y1 = y2 + (2);
            // console.log(y1);
            var y2 = y1 + data.repositories[i].languages[j].lines - 2;
            // console.log(y2);
            var lang = data.repositories[i].languages[j].name;
            console.log(lang);
            svgContainer.append("line")
                // .data(root.languages)
                .attr("stroke-width", 5)
                .attr("stroke", function(){
                    if(lang == "Java") {
                        return "#E31933";
                    } else if (lang == "Scala") {
                        return "#6F7C36";
                    } else if (lang == "Shell") {
                        return "#05BAB5";
                    } else if (lang == "Ruby") {
                        return "#EE5746";
                    } else if (lang == "Python") {
                        return "#692562";
                    } else if (lang == "CSS") {
                        return "#C6F281";
                    } else if (lang == "JavaScript") {
                        return "#A71C45";
                    }
                })
                .attr("x1", function(){
                    return 370 + i*inter_width;
                })
                .attr("y1", function(){
                    return y1;
                })
                .attr("x2", function(){
                    return 370 + i*inter_width;
                })
                .attr("y2", function(){
                    return y2;
                });
        }
        svgContainer.append("line")
            .style("stroke-dasharray", ("8, 3"))
            .attr("stroke-width", 2)
            .attr("stroke", "gray")
            .attr("opacity", 0.3)
            .attr("x1", function(){
                return 382 + i*inter_width;
            })
            .attr("y1", 50)
            .attr("x2", function(){
                return 382 + i*inter_width;
            })
            .attr("y2", 300);

        svgContainer.append("text")
            .attr("x", function(){
                return 365 + i*inter_width;
            })
            .attr("y", 316)
            .text(function(){
                return repo_name;
            })
            .attr("fill", "gray")
            .attr("font-size", "13")
            .attr("text-anchor", "left")
            .attr("font-family", "PT Sans");

        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "red")
            .attr("x1", function(){
                return 370 + i*inter_width;
            })
            .attr("y1", 328)
            .attr("x2", function(){
                return 370 + i*inter_width;
            })
            .attr("y2", function() {
                return 328 + no_foll;
            });
    }

});