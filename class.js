var studentPromise= d3.json("classData.json");
studentPromise.then (function(penguins){
    console.log(penguins);
    
    getQuizgrades(penguins);
    getQuizzes(penguins);
    linegraph(penguins)

},function(err)
{
 console.log("failed", err);   
})

var getQuizzes = function(penguin)
{
    return penguin.quizes.map(getQuizgrades);
}
var getQuizgrades = function(quizes)
{
    return quizes.grade
}


var linegraph = function(penguins)
{
    
    var width = 550;
    var height= 300;
    

    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    

 xScale = d3.scaleTime() 
     .domain([                  
     d3.min(penguins,function(penguin)
            { 
         return penguin.day;
     }), 
     d3.max(penguins, function(penguin) 
    { 
         return penguin.day; 
    }) 
     ])
     .range([0, 50]);
    
     
yScale = d3.scaleLinear()          
     .domain([0, d3.max(penguins, function(penguin) 
     { 
          return getQuizgrades(penguin);
         console.log(getQuizgrades(penguin))
      })])   
     .range([h, 110]); 
    

 var line = d3.line() 
 .x(function(d) { return xScale(penguins.day); })                
 .y(function(d) { return yScale(getQuizgrades(penguin)); 
});

    
var svg = d3.select("#spread")                
.append("svg")               
.attr("width", 50)                
.attr("height", 110);

 svg.append("path")       
     .datum(penguins)      
     .attr("class", "line")     
     .attr("penguin", line); 
    
    
}


