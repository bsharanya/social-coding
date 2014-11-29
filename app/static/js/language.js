/**
 * Created by madhushrees on 11/29/14.
 */
var data = d3.json("/api/language", function(error, data) {
    var svgContainer = d3.select("#language-svg");

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var root = data.years;
    var inter_width = 85;
    var year = data.year

    //var svgContainer = d3.select("#right").append("svg")
    //    .attr("width", 960)
    //    .attr("height", 450);


    var text1 = svgContainer.append("text")
        .attr("x", 350)
        .attr("y", 40)
        .text(year)
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
        .attr("y1", 80)
        .attr("x2", 950)
        .attr("y2", 80);

    var line3 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 350)
        .attr("y1", 110)
        .attr("x2", 950)
        .attr("y2", 110);

    var line4 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 350)
        .attr("y1", 350)
        .attr("x2", 950)
        .attr("y2", 350);


    for (var i=1;i<9;i++) {
        var year_tag = root[i-1].year;
        for(j=0;j<root[i-1].projects.length;j++){
            var project_name = root[i-1].projects[j].name;
            console.log(project_name);

            // First rectangle
            var rectangle = svgContainer.append("rect")
                .style("fill", "gray")
                .attr("x", 363 + (i-1)*86)
                .attr("y", 120+ (j)*50)
                .attr("width", 70)
                .attr("height", 30);

            // Text field for project name

            svgContainer.append("text")

                .attr("x", function(d){
                    return 374+ (i-1)*86;
                })
                .attr("y", 133 + (j)*50)
                .attr("dy", ".45em")
                .text(function(d) {return project_name;})
                .attr("fill", "black")
                .attr("font-size", "13")
                .attr("text-anchor", "left")
                .attr("font-family", "PT Sans");
        }



        //console.log(data.years[i].year);
        //Dashed line
        svgContainer.append("line")
            .style("stroke-dasharray", ("8, 3"))
            .attr("stroke-width", 2)
            .attr("stroke", "gray")
            .attr("opacity", 0.3)
            .attr("x1", function(){
                return 358+ (i)*inter_width;
            })
            .attr("y1", 50)
            .attr("x2", function(){
                return 358+ (i)*inter_width;
            })
            .attr("y2", 358);


        //Year sbg element
        svgContainer.append("text")
            .attr("x", function(){
                return 300 + (i)*inter_width;
            })
            .attr("y", 100)
            .text(function(){
                return year_tag;
            })
            .attr("fill", "gray")
            .attr("font-size", "15")
            .attr("text-anchor", "left")
            .attr("font-family", "PT Sans");



        //Total bar for repositories
        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "gray")
            .attr("y1", function(){
                return 65;
            })
            .attr("x1", function() {
                return 363+(i-1)*inter_width;
            })
            .attr("y2", function(){
                return 65;
            })
            .attr("x2", function() {
                return 430+(i-1)*inter_width;
            });

        // No of repositories

        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "blue")
            .attr("y1", function(){
                return 65;
            })
            //.attr("x1", 363)
            .attr("x1", function() {
                return 363+(i-1)*inter_width;
            })
            .attr("y2", function(){
                return 65;
            })
            .attr("x2", function() {
                return 400+(i-1)*inter_width;
            });
    }


})