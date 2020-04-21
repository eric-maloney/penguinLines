var studentPromise= d3.json("classData.json");
studentPromise.then (function(penguins){
    console.log(penguins);

    
   initGraph(penguins);
    
},function(err)
{
 console.log("failed", err);   
})



var drawLines = function(penguins)
{
    
    var xScale = d3.scaleLinear()
        .domain([0,penguins[0].quizes.length-1])
        .range([0,graph.width])
    
    
    var lowGrade = d3.min(penguins,function(penguin)
    {
        return d3.min(penguin.quizes,
                      function(quiz,index)
                     {
                        return quiz[0];
                     });
    })
    
    var highGrade = d3.max(penguins,function(penguin)
    {   
        return d3.max(penguin.quizes,
                      function(quiz,index)
                     {
                        return quiz[0];
                     });
    })
    
    var yScale = d3.scaleLinear()
        .domain([lowGrade,highGrade])
        .range([graph.height,0])
    
    
    
    var lineGenerator = d3.line()
        .x(function(quiz,i) 
        { 
           
            return xScale(quiz.day);
        })
        .y(function(quiz)   
        { 
            
            return yScale(quiz.grade);
        })
        .curve(d3.curveCardinal)
    
        
    var svg = d3.select("body")                .append("svg")              
    .attr("width", 550)                
    .attr("height", 300);
    
    
    console.log(penguins[0].quizes)
    svg.append("path")       
        .datum(penguins)       
        .attr("class", "line")       
        .attr("d",lineGenerator); 
    
    
    
    var lines = d3.select("#graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .attr("class",function(penguin)
        {
            return penguin.quizes.grade;
        })
        .classed("line",true)
        .attr("fill","black")
        .attr("stroke","black")
        .attr("stroke-width",3)
        .on("mouseover",function(penguin)
        {   
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise();
            }
        })
        .on("mouseout",function(penguin)
           {
            if(! d3.select(this).classed("off"))
            {
            
            d3.selectAll(".line")
                .classed("fade",false);
            }
            
        })
    
    lines.append("path")
        .datum(function(penguin) 
            { 
        return penguin.quizes;
            })
        .attr("d",lineGenerator)
    
    
    
    
}




var createLabels = function(screen,margins,graph)
{
        var labels = d3.select("#graph")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Quiz Grades over Time")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Day")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Quiz Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
}


var createAxes = function(screen,margins,graph,xScale,yScale)
{
     
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
}


var initGraph = function(penguins)
{
    
    var screen = {width:550, height:300};
    
    
    var margins = {top:15,bottom:40,left:70,right:40};
    
    
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    
    
    d3.select("#graph")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var g = d3.select("graph")
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
        
    

   
var tooltip = d3.select("#graph svg")
.append("img")
.style("opacity", 0)
.attr("class","tooltip")

var mouseover = function(penguin)
{
    tooltip
    .style("opacity",0)
    .append("img")
    .attr("src",function(penguin)
      {
    return "imgs/" + penguin.picture;
});
}

var mouseleave= function(penguin)
{
 tooltip
 .style("opacity",0)
    
}
    
    
    var xScale = d3.scaleLinear()
        .domain([0,penguins[0].quizes.day-1])
        .range([0,graph.width])
    
    
    var lowGrade = d3.min(penguins,function(penguin)
    {
        return d3.min(penguin.quizes,
                      function(quiz,index)
                     {
                        return quiz[0];
                     });
    })
    
    var highGrade = d3.max(penguins,function(penguin)
    {   
        return d3.max(penguin.quizes,
                      function(quiz,index)
                     {
                        return quiz[0];
                     });
    })
    
    var yScale = d3.scaleLinear()
        .domain([lowGrade,highGrade])
        .range([graph.height,0])
    
    createLabels(screen,margins,graph);
    createAxes(screen,margins,graph,xScale,yScale);
    console.log(penguins);
    drawLines(penguins)
    
    
    
}




