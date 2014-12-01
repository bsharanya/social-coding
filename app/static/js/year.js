/**
 * Created by tejalathippeswamy on 11/28/14.
 */
d3.json('/api/year/details', function (error, data) {
    var svgContainer = d3.select("#year-svg");

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var root = data.repositories;
    var length = root.length;
    var inter_width = 600/length;
    var year = data.year;


    var text1 = svgContainer.append("text")
        .attr("x", 70)
        .attr("y", 70)
        .text(function () {
            return year;
        }) //need to get the year
        .attr("fill", "gray")
        .attr("font-size", "18")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var line1 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 80)
        .attr("x2", 670)
        .attr("y2", 80);

    var line2 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 330)
        .attr("x2", 670)
        .attr("y2", 330);

    var line3 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 355)
        .attr("x2", 670)
        .attr("y2", 355);


    for (var i = 0; i < data.repositories.length; i++) {
        var y1 = 85;
        var y2 = 78;

        var repo_act_name = data.repositories[i].repository_name;
        var repo_url_link = data.repositories[i].repository_url;
        var repo_name = data.repositories[i].name;
        var no_foll = data.repositories[i].followers;
        for (var j = 0; j < data.repositories[i].languages.length; j++) {
            var y2 = y1 + data.repositories[i].languages[j].lines;
            var lang = data.repositories[i].languages[j].name;
            var lang_color = data.repositories[i].languages[j].color;

            svgContainer.append("line")
                .attr("stroke-width", 5)
                .attr("stroke", function () {
                    if (lang_color) {
                        return lang_color;
                    }
                })
                .attr("class", function () {
                    return "language-" + i;
                })
                .attr("x1", function () {
                    return 90 + i * inter_width;
                })
                .attr("y1", function () {
                    return y1;
                })
                .attr("x2", function () {
                    return 90 + i * inter_width;
                })
                .attr("y2", function () {
                    return y1;
                })
                .transition()
                .duration(function () {
                    return (j + 1) * 500;
                })
                .delay(function () {
                    return (j + 1) * 100;
                })
                .attr("x2", function () {
                    return 90 + i * inter_width;
                })
                .attr("y2", function () {
                    return y2;
                });

            var y1 = y2 + 5;
        }
        svgContainer.append("line")
            .style("stroke-dasharray", ("8, 3"))
            .attr("stroke-width", 2)
            .attr("stroke", "gray")
            .attr("opacity", 0.3)
            .attr("x1", function () {
                return (90 + inter_width/2) + i * inter_width;
            })
            .attr("y1", 80)
            .attr("x2", function () {
                return (90 + inter_width/2) + i * inter_width;
            })
            .attr("y2", 330);

        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "red")
            .attr("class", function () {
                return "language-" + i;
            })
            .attr("x1", function () {
                return 90 + i * inter_width;
            })
            .attr("y1", 357)
            .attr("x2", function () {
                return 90 + i * inter_width;
            })
            .attr("y2", 357)
            .transition()
            .duration(function () {
                return (j + 1) * 500;
            })
            .delay(function () {
                return (j + 1) * 100;
            })
            .attr("x2", function () {
                return 90 + i * inter_width;
            })
            .attr("y2", function () {
                return 357 + no_foll;
            });
    }
    var nodes = svgContainer
        .selectAll(".repository-num")
        .data(data.repositories)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 86 + i * inter_width;
        })
        .attr("y", 347)
        .text(function (d) {
            return d.name;
        })
        .attr("fill", "gray")
        .attr("font-size", "13")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans")
        .attr("class", "repository-num")
        .on("click", function (d, i) {
            var hov=d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                hov
                    .select("#repository_name")
                    .text(d.repository_name);
                hov
                    .select("#repository_url")
                    .text(d.repository_url);

                d3.select("#tooltip").attr("class", "visible");
        })
        .on("mouseout", function (d) {
            d3.select("#tooltip").attr("class", "hidden");
        })
});