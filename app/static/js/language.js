/**
 * Created by madhushrees on 11/29/14.
 */
var data = d3.json("/api/language/details", function(error, data) {
    var svgContainer = d3.select("#language-svg");

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var inter_width = 89

    var root = data.years;
    var keys = Object.keys(data.years)

    var language = data.language;


    var languageText = svgContainer.append("text")
        .attr("x", 60)
        .attr("y", 50)
        .text(function(){
            return language;
        })
        .attr("fill", "gray")
        .attr("font-size", "18")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");


    var line0 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 60)
        .attr("y1", 60)
        .attr("x2", 670)
        .attr("y2", 60);

    var line1 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 60)
        .attr("y1", 90)
        .attr("x2", 670)
        .attr("y2", 90);

    var line2 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 60)
        .attr("y1", 120)
        .attr("x2", 670)
        .attr("y2", 120);


    for (var i=1;i<8;i++) {
        for (j = 0; j < data.years[keys[i-1]].repos.length; j++) {

            // First rectangle
            if(data.years[keys[i-1]].repos.length!=0) {
                var rectangle = svgContainer.append("rect")
                    .style("fill", "gray")
                    .attr("x", 71 + (i - 1) * 88)
                    .attr("y", 130 + (j) * 40)
                    .transition()
                    .duration(function () {
                        return (j) * 700;
                    })
                    .delay(function () {
                        return (j) * 200;
                    })
                    .attr("width", 70)
                    .attr("height", 30);

                // Text field for project name
                svgContainer.append("text")

                    .attr("x", function (d) {
                        return 80 + (i - 1) * 88;
                    })
                    .attr("y", 143 + (j) * 40)
                    .attr("dy", ".35em")
                    .transition()
                    .duration(function () {
                        return (j+1) * 500;
                    })
                    .delay(function () {
                        return (j+1) * 150;
                    })
                    .text(function () {
                        if (data.years[keys[i-1]].repos.length != 0) {
                            return data.years[keys[i-1]].repos[j].name.substring(0,7).concat("...");
                        } else {
                            return "";
                        }
                    })
                    .attr("fill", "black")
                    .attr("font-size", "13")
                    .attr("text-anchor", "left")
                    .attr("font-family", "PT Sans");
            }

        }

            //Dashed line
            svgContainer.append("line")
                .style("stroke-dasharray", ("8, 3"))
                .attr("stroke-width", 2)
                .attr("stroke", "gray")
                .attr("opacity", 0.3)
                .attr("x1", function () {
                    return 60 + (i) * inter_width;
                })
                .attr("y1", 60)
                .attr("x2", function () {
                    return 60 + (i) * inter_width;
                })
                .attr("y2", 400);


            //Year sbg element
            svgContainer.append("text")
                .attr("x", function () {
                    return 83 + (i - 1) * inter_width;
                })
                .attr("y", 110)
                .text(function () {
                    return keys[i - 1];
                })
                .attr("fill", "gray")
                .attr("font-size", "15")
                .attr("text-anchor", "left")
                .attr("font-family", "PT Sans");


            //Total bar for repositories
            svgContainer.append("line")
                .attr("stroke-width", 10)
                .attr("stroke", "gray")
                .attr("y1", function () {
                    return 75;
                })
                .attr("x1", function () {
                    return 67 + (i - 1) * inter_width;
                })
                .attr("y2", function () {
                    return 75;
                })
                .attr("x2", function () {
                    return 133 + (i - 1) * inter_width;
                });

            // No of repositories

            svgContainer.append("line")
                .attr("stroke-width", 10)
                .attr("stroke", "blue")
                .attr("y1", function () {
                    return 75;
                })
                //.attr("x1", 363)
                .attr("x1", function () {
                    return 67 + (i - 1) * inter_width;
                })
                .attr("y2", function () {
                    return 75;
                })
                //.attr("x1", 363)
                .attr("x2", function () {
                    return 67 + (i - 1) * inter_width;
                })
                .transition()
                .duration(function () {
                    return (i) * 300;
                })
                .delay(function () {
                    return (i) * 100;
                })
                .attr("y2", function () {
                    return 75;
                })
                .attr("x2", function () {
                    if(data.years[keys[i-1]].repos.length!=0) {
                        return 67 + data.years[keys[i - 1]].ratio + (i - 1) * inter_width;
                    }else{
                        return 67+(i-1)*inter_width;
                    }
                });
        }

})