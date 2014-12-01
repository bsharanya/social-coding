/**
 * Created by madhushrees on 11/29/14.
 */
var data = d3.json("/api/language/details", function(error, data) {
    var svgContainer = d3.select("#language-svg");

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var root = data.years;
    var keys = Object.keys(data.years)
    console.log(keys);
    console.log("Madhu");
    console.log(data.keys());
    var language = data.language;
    for(var i=1;i<root.length;i++){
        console.log(root[i]);
    }
    //console.log(root.keys());
    var inter_width = 89


    var text1 = svgContainer.append("text")
                .attr("x", 60)
                .attr("y", 50)
                .text(function(){
                    return language;
                })
                .attr("fill", "gray")
                .attr("font-size", "18")
                .attr("text-anchor", "left")
                .attr("font-family", "PT Sans");


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

    var line3 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 60)
        .attr("y1", 395)
        .attr("x2", 670)
        .attr("y2", 395);

    //var line4 = svgContainer.append("line")
    //    .attr("stroke-width", 2)
    //    .attr("stroke", "gray")
    //    .attr("x1", 3)
    //    .attr("y1", 350)
    //    .attr("x2", 950)
    //    .attr("y2", 350);


    for (var i=1;i<9;i++) {
         //year_tag = root[i-1].year;

            //var project_name = root[i-1].projects[j].name;
            //console.log(project_name);

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
                    return 80;
                })
                .attr("y", 133 )
                .attr("dy", ".45em")
                .text(function(d) {return "project_name";})
                .attr("fill", "black")
                .attr("font-size", "13")
                .attr("text-anchor", "left")
                .attr("font-family", "PT Sans");
        //}



        //console.log(data.years[i].year);
        //Dashed line
        svgContainer.append("line")
            .style("stroke-dasharray", ("8, 3"))
            .attr("stroke-width", 2)
            .attr("stroke", "gray")
            .attr("opacity", 0.3)
            .attr("x1", function(){
                return 60+ (i)*inter_width;
            })
            .attr("y1", 90)
            .attr("x2", function(){
                return 60+ (i)*inter_width;
            })
            .attr("y2", 395);


        //Year sbg element
        svgContainer.append("text")
            .attr("x", function(){
                return 70 + (i-1)*inter_width;
            })
            .attr("y", 115)
            .text(function(){
                return root[i];
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
                return 75;
            })
            .attr("x1", function() {
                return 67+(i-1)*inter_width;
            })
            .attr("y2", function(){
                return 75;
            })
            .attr("x2", function() {
                return 133 +(i-1)*inter_width;
            });

        // No of repositories

        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "blue")
            .attr("y1", function(){
                return 75;
            })
            //.attr("x1", 363)
            .attr("x1", function() {
                return 67+(i-1)*inter_width;
            })
            .attr("y2", function(){
                return 75;
            })
            .attr("x2", function() {
                return 110+(i-1)*inter_width;
            });
    }


})