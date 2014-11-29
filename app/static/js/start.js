var searchFor = function () {
    var searchKey = $("#search-bar").val();
    if (searchKey === "") {
        alert("Please enter an organization or user name to search for on GitHub");
    } else {
        $.post("api/search", {"search_key": searchKey}).done(function() {
            $(location).attr('href', '/overview')
        });
    }
};

var svg = d3.select("#main-svg");

svg.attr("width", '960px')
    .attr("height", '400px');

d3.json("static/json/default_organizations.json", function (error, data) {
    var organizations = data["Organizations"];
    var nodes = svg.append("g")
        .attr("id", "popular-organizations")
        .selectAll(".organizations")
        .data(organizations)
        .enter()
        .append("g")
        .attr("class", "organizations")
        .attr("id", function (d) {
            return "organization-" + d.name;
        })
        .attr("transform", function (d, i) {
            if (i < 4) {
                yCoordinate = 50;
                xCoordinate = 170 + (i * 150) + (i * 10)
            } else {
                yCoordinate = 210;
                xCoordinate = 170 + ((i - 4) * 150) + ((i - 4) * 10)
            }

            return "translate(" + xCoordinate + "," + yCoordinate + ")";
        });

    nodes.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "organizations-rects")
        .attr("id", function (d) {
            return "organizations-rect-" + d.search_key;
        })
        .attr("width", "150px")
        .attr("height", "150px")
        .attr("fill", function (d) {
            return d.color;
        }).on("click", function (d) {
            var searchKey = d.search_key;

            $.post("api/search", {"search_key": searchKey}).done(function() {
                $(location).attr('href', '/overview')
            });

        }).on("mouseover", function (d) {
            d3.select(this)
                .attr("width", "155px")
                .attr("height", "155px");

        }).on("mouseout", function (d) {
            d3.select(this)
                .attr("width", "150px")
                .attr("height", "150px");
        });

    nodes.append("text")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .attr("font-family", "'Open Sans', sans-serif")
        .attr("fill", "#ffffff")
        .attr("x", "5")
        .attr("y", "30")
        .text(function (d) {
            return d.name.toLowerCase();
        });
});