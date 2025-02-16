

//--------------------------------

// import * as d3 from "d3";
// import { useEffect, useState, useRef } from 'react';

// export function Chart({ data }) {
//   const marginLeft = 200;
//   const width = 1000;
//   const height = 2000;
//   const marginRight = 40;
//   const marginTop = 20;
//   const marginBottom = 20;
//   const heightBound = height - marginTop - marginBottom;
//   const widthBound = width - marginLeft - marginRight;
  
//   const svgRef = useRef(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     // Filter data for 2014-2024
//     const filteredData = data.filter(d => {
//       const year = new Date(d.date).getFullYear();
//       return year >= 2014 && year <= 2024;
//     });

//     // Create scales
//     const timeScale = d3.scaleTime()
//       .domain(d3.extent(filteredData, d => new Date(d.date)))
//       .range([marginTop, heightBound]);

//     const rankScale = d3.scaleLinear()
//       .domain([0, d3.max(filteredData, d => d.monthly_rank)])
//       .range([marginLeft, marginLeft + widthBound]);

//     const sizeScale = d3.scaleLog()
//       .domain([20, d3.max(filteredData, d => d.word_count)])
//       .range([2, 20]);

//     // Clear previous content
//     d3.select(svgRef.current).selectAll("*").remove();

//     // Create SVG and append elements
//     const svg = d3.select(svgRef.current);

//     // Add axes
//     const yAxis = d3.axisLeft(timeScale)
//       .ticks(d3.timeMonth.every(3))
//       .tickFormat(d3.timeFormat("%b %Y"));

//     svg.append("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(${marginLeft}, 0)`)
//       .call(yAxis);

//     const xAxis = d3.axisBottom(rankScale);
    
//     svg.append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${heightBound})`)
//       .call(xAxis);

//     // Add tooltip
//     const tooltip = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("visibility", "hidden")
//       .style("background-color", "white")
//       .style("padding", "10px")
//       .style("border", "1px solid #ddd")
//       .style("border-radius", "4px")
//       .style("pointer-events", "none");

//     // Add rectangles
//     const rectangles = svg.selectAll("rect")
//       .data(filteredData)
//       .enter()
//       .append("rect")
//       .attr("x", d => rankScale(d.monthly_rank))
//       .attr("y", d => timeScale(new Date(d.date)))
//       .attr("width", d => sizeScale(d.word_count))
//       .attr("height", d => sizeScale(d.word_count))
//       .attr("fill", "#00008B")
//       .attr("opacity", 0.7)
//       .attr("transform", d => `translate(${-sizeScale(d.word_count)/2}, ${-sizeScale(d.word_count)/2})`)
//       .style("cursor", "pointer");

//     // Add hover effects
//     rectangles
//       .on("mouseover", (event, d) => {
//         const dateStr = new Date(d.date).toLocaleDateString('en-US', { 
//           month: 'numeric', 
//           day: 'numeric', 
//           year: 'numeric' 
//         });
        
//         tooltip
//           .style("visibility", "visible")
//           .html(`${d.topic_label}<br>${d.title} <b>${dateStr}</b>`);
//       })
//       .on("mousemove", (event) => {
//         tooltip
//           .style("top", (event.pageY - 10) + "px")
//           .style("left", (event.pageX + 10) + "px");
//       })
//       .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//       })
//       .on("click", (event, d) => {
//         const newTopic = selectedTopic === d.topic_label ? null : d.topic_label;
//         setSelectedTopic(newTopic);
        
//         rectangles
//           .transition()
//           .duration(300)
//           .attr("opacity", item => {
//             if (!newTopic) return 0.7;
//             return item.topic_label === newTopic ? 0.7 : 0.1;
//           });
//       });

//     // Cleanup
//     return () => {
//       d3.select("body").selectAll(".tooltip").remove();
//     };
//   }, [data, selectedTopic]);

//   return (
//     <div>
//       <p className="mb-4 text-lg">Svalbard Articles Scatter Plot (2014-2024)</p>
//       <svg 
//         ref={svgRef}
//         width={width} 
//         height={height}
//         className="bg-white"
//       />
//     </div>
//   );
// }

// export default Chart;

//--------------------------------

// import * as d3 from "d3";
// import { useEffect, useState, useRef } from 'react';

// export function Chart({ data }) {
//   const marginLeft = 200;
//   const width = 1000;
//   const height = 2600;
//   const marginRight = 40;
//   const marginTop = 20;
//   const marginBottom = 20;
//   const heightBound = height - marginTop - marginBottom;
//   const widthBound = width - marginLeft - marginRight;
  
//   const svgRef = useRef(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     // Filter data for 2014-2024
//     const filteredData = data.filter(d => {
//       const date = new Date(d.date);
//       return date.getFullYear() >= 2014 && date.getFullYear() <= 2024;
//     });

//     // Get array of unique month-years for the y-axis
//     const uniqueMonthYears = Array.from(new Set(
//       filteredData.map(d => {
//         const date = new Date(d.date);
//         return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//       })
//     )).sort();

//     // Create scales
//     const timeScale = d3.scalePoint()
//       .domain(uniqueMonthYears)
//       .range([marginTop, heightBound])
//       .padding(0.5);

//     const rankScale = d3.scaleLinear()
//       .domain([0, d3.max(filteredData, d => d.monthly_rank)])
//       .range([marginLeft, marginLeft + widthBound]);

//     const sizeScale = d3.scaleLog()
//       .domain([50, d3.max(filteredData, d => d.word_count)])
//       .range([2, 16]);
    
//     const heightScale = d3.scaleLog()
//       .domain([50, d3.max(filteredData, d => d.word_count)])
//       .range([2, 18]);

//     const widthScale = d3.scaleSqrt()
//       .domain([50, d3.max(filteredData, d => d.word_count)])
//       .range([2, 10]);
 
      
//     // Clear previous content
//     d3.select(svgRef.current).selectAll("*").remove();

//     // Create SVG and append elements
//     const svg = d3.select(svgRef.current);

//     // Add axes
//     const yAxis = d3.axisLeft()
//       .scale(timeScale)
//       .tickFormat(d => {
//         const [year, month] = d.split('-');
//         const date = new Date(year, month - 1);
//         return d3.timeFormat("%b %Y")(date);
//       });

//     svg.append("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(${marginLeft}, 0)`)
//       .call(yAxis);

//     const xAxis = d3.axisBottom(rankScale);
    
//     svg.append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${heightBound})`)
//       .call(xAxis);

//     // Add tooltip
//     const tooltip = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("visibility", "hidden")
//       .style("background-color", "white")
//       .style("padding", "10px")
//       .style("border", "1px solid #ddd")
//       .style("border-radius", "4px")
//       .style("pointer-events", "none");

//     // Add rectangles
//     const rectangles = svg.selectAll("rect")
//       .data(filteredData)
//       .enter()
//       .append("rect")
//       .attr("x", d => rankScale(d.monthly_rank))
//       .attr("y", d => {
//         const date = new Date(d.date);
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         return timeScale(monthYear);
//       })
//       .attr("width", d => widthScale(d.word_count))
//       .attr("height", d => heightScale(d.word_count*50))
//       .attr("fill", "#00008B")
//       .attr("opacity", 0.7)
//       .attr("rx", 5)
//       .attr("ry", 5)
//       .attr("transform", d => `translate(${-sizeScale(d.word_count)/2}, ${-sizeScale(d.word_count)/2})`)
//       .style("cursor", "pointer");

//     // Add hover effects
//     rectangles
//       .on("mouseover", (event, d) => {
//         const dateStr = new Date(d.date).toLocaleDateString('en-US', { 
//           month: 'numeric', 
//           day: 'numeric', 
//           year: 'numeric' 
//         });
        
//         tooltip
//           .style("visibility", "visible")
//           .html(`${d.topic_label}<br>${d.title} <b>${dateStr}</b>`);
//       })
//       .on("mousemove", (event) => {
//         tooltip
//           .style("top", (event.pageY - 10) + "px")
//           .style("left", (event.pageX + 10) + "px");
//       })
//       .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//       })
//       .on("click", (event, d) => {
//         const newTopic = selectedTopic === d.topic_label ? null : d.topic_label;
//         setSelectedTopic(newTopic);
        
//         rectangles
//           .transition()
//           .duration(300)
//           .attr("opacity", item => {
//             if (!newTopic) return 0.7;
//             return item.topic_label === newTopic ? 0.7 : 0.1;
//           });
//       });

//     // Cleanup
//     return () => {
//       d3.select("body").selectAll(".tooltip").remove();
//     };
//   }, [data, selectedTopic]);

//   return (
//     <div>
//       <p className="mb-4 text-lg">Svalbard Articles Scatter Plot (2014-2024)</p>
//       <svg 
//         ref={svgRef}
//         width={width} 
//         height={height}
//         className="bg-white"
//       />
//     </div>
//   );
// }

// export default Chart;


//--------------------------------HERE-------------
// import * as d3 from "d3";
// import { useEffect, useState, useRef } from 'react';

// export function Chart({ data }) {
//   const marginLeft = 200;
//   const width = 1600;
//   const height = 1800;
//   const marginRight = 40;
//   const marginTop = 20;
//   const marginBottom = 20;
//   const heightBound = height - marginTop - marginBottom;
//   const widthBound = width - marginLeft - marginRight;
  
//   const svgRef = useRef(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     // Filter and process data
//     const processedData = data
//     .filter(d => {
//       const date = new Date(d.date);
//       return date.getFullYear() >= 2014 && 
//              date.getFullYear() <= 2020 && 
//              d.word_count > 0;  // Add this condition
//     })
//     .map(d => ({
//       ...d,
//       dateObj: new Date(d.date)
//     }));

//     // Group by month-year and sort within groups ('monthly')
//     const groupedData = d3.group(processedData, 
//       d => `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`
//     );

//     // Process each group and assign sequential ranks
//     const sortedData = Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
//       // Sort articles by word count (ascending only)
//       const sortedArticles = articles.sort((a, b) => {
//         // Sort by word count (ascending)
//         return a.word_count - b.word_count;
//       });

//       // Assign sequential ranks
//       return sortedArticles.map((article, index) => ({
//         ...article,
//         sequentialRank: index + 4
//       }));
//     });


// //     // Process each group and assign sequential ranks ('weekly')
// //     const sortedData = Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
// //       // Sort articles by week and word count
// //       const sortedArticles = articles.sort((a, b) => {
// //         // Get week numbers
// //         const weekA = d3.timeWeek.count(d3.timeYear(a.dateObj), a.dateObj);
// //         const weekB = d3.timeWeek.count(d3.timeYear(b.dateObj), b.dateObj);
        
// //         // First sort by week
// //         const weekDiff = weekA - weekB;
// //         if (weekDiff !== 0) return weekDiff;
        
// //         // Then by word count (ascending)
// //         return a.word_count - b.word_count;
// //       });

// //   // Assign sequential ranks
// //   return sortedArticles.map((article, index) => ({
// //     ...article,
// //     sequentialRank: index + 4,
// //     weekNumber: d3.timeWeek.count(d3.timeYear(article.dateObj), article.dateObj)
// //   }));
// // });

//     // // Process each group and assign sequential ranks ('daily')
//     // const sortedData = Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
//     //   // Sort articles by day and word count
//     //   const sortedArticles = articles.sort((a, b) => {
//     //     // First sort by day
//     //     const dayDiff = a.dateObj.getDate() - b.dateObj.getDate();
//     //     if (dayDiff !== 0) return dayDiff;
//     //     // Then by word count (ascending)
//     //     return a.word_count - b.word_count;
//     //   });

//     //   // Assign sequential ranks
//     //   return sortedArticles.map((article, index) => ({
//     //     ...article,
//     //     sequentialRank: index + 4
//     //   }));
//     // });





//     // Get unique month-years for y-axis
//     const uniqueMonthYears = Array.from(groupedData.keys()).sort();

//     // Create scales
//     const timeScale = d3.scaleBand()
//       .domain(uniqueMonthYears)
//       .range([marginTop, heightBound])
//       .padding(0.5);

//     const rankScale = d3.scaleLinear()
//       //.domain([1, 200])
//       .domain([1, d3.max(sortedData, d => d.sequentialRank)])
//       .range([marginLeft, marginLeft + widthBound]);

//     // const sizeScale = d3.scaleLog()
//     //   .domain([d3.min(processedData, d => d.word_count), d3.max(processedData, d => d.word_count)])
//     //   .range([4, 20]);
    
//     const multiHeight = 0.2  
//     const heightScale = d3.scaleLog()
//       .domain([d3.min(processedData, d => d.word_count), d3.max(processedData, d => d.word_count)])
//       .range([3, 26]);

//     const multiWidth = 0.05
//     const widthScale = d3.scaleSqrt()
//       .domain([d3.min(processedData, d => d.word_count), d3.max(processedData, d => d.word_count)])
//       .range([3, 26]);

//     // Clear previous content
//     d3.select(svgRef.current).selectAll("*").remove();

//     // Create SVG and append elements
//     const svg = d3.select(svgRef.current);

//     // Add axes
//     const yAxis = d3.axisLeft()
//       .scale(timeScale)
//       .tickFormat(d => {
//         const [year, month] = d.split('-');
//         const date = new Date(year, month - 1);
//         return d3.timeFormat("%b %Y")(date);
//       });

//     svg.append("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(${marginLeft}, 0)`)
//       .call(yAxis);

//     const xAxis = d3.axisBottom(rankScale)
//       .tickFormat(d => `Article ${d}`);
    
//     svg.append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${heightBound})`)
//       .call(xAxis);

//     // Add tooltip
//     const tooltip = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("visibility", "hidden")
//       .style("background-color", "white")
//       .style("padding", "10px")
//       .style("border", "1px solid #ddd")
//       .style("border-radius", "4px")
//       .style("pointer-events", "none");

//     // Add rectangles
//     const rectangles = svg.selectAll("rect")
//       .data(sortedData)
//       .enter()
//       .append("rect")
//       .attr("class", d => `topic-${d.topic_label.replace(/\s+/g, '-')}`)
//       .attr("x", d => rankScale(d.sequentialRank))
//       .attr("y", d => {
//         const monthYear = `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`;
//         return timeScale(monthYear);
//       })
//       // .attr("width", 5)
//       // .attr("height",15)
//        .attr("width", d => widthScale(d.word_count*multiWidth))
//        .attr("height", d => heightScale(d.word_count*multiHeight))
//       .attr("fill", "black")  // blue #00008B #111D4A
//       .style("opacity", 1)
//       .attr("rx", 2)
//       .attr("ry", 2)
//       //.attr("transform", d => `translate(${-sizeScale(d.word_count)/2}, ${-sizeScale(d.word_count)/2})`)
//       .style("cursor", "pointer");

//     // Add hover effects
//     rectangles
//       .on("mouseover", (event, d) => {
//         const dateStr = d.dateObj.toLocaleDateString('en-US', { 
//           month: 'numeric', 
//           day: 'numeric', 
//           year: 'numeric' 
//         });
        
//         tooltip
//           .style("visibility", "visible")
//           .html(`${d.topic_label}<br>${d.title} <b>${dateStr}</b><br>Words: ${d.word_count}`);
//       })
//       .on("mousemove", (event) => {
//         tooltip
//           .style("top", (event.pageY - 10) + "px")
//           .style("left", (event.pageX + 10) + "px");
//       })
//       .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//       })
      

//     // Cleanup
//     return () => {
//       d3.select("body").selectAll(".tooltip").remove();
//     };
//   }, [data, selectedTopic]);

//   return (
//     <div>
//       <p className="mb-4 text-lg">Svalbard Articles Scatter Plot (2014-2024)</p>
//       <svg 
//         ref={svgRef}
//         width={width} 
//         height={height}
//         className="bg-white"
//       />
//     </div>
//   );
// }

// export default Chart;

//-----------------------


import * as d3 from "d3";
import { useEffect, useState, useRef } from 'react';

export function Chart({ data }) {
  const marginLeft = 200;
  const width = 1200;
  const height = 4000;
  const marginRight = 40;
  const marginTop = 40;
  const marginBottom = 20;
  const heightBound = height - marginTop - marginBottom;
  const widthBound = width - marginLeft - marginRight;
  
  const svgRef = useRef(null);
  const [sortMethod, setSortMethod] = useState('monthly');

  // Sorting functions
  const sortDataMonthly = (processedData) => {
    const groupedData = d3.group(processedData, 
      d => `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`
    );

    return Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
      // Sort articles by word count (ascending)
      const sortedArticles = articles.sort((a, b) => a.word_count - b.word_count);

      // Assign sequential ranks
      return sortedArticles.map((article, index) => ({
        ...article,
        sequentialRank: index + 4
      }));
    });
  };

  const sortDataWeekly = (processedData) => {
    const groupedData = d3.group(processedData, 
      d => `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`
    );

    return Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
      // Sort articles by week and word count
      const sortedArticles = articles.sort((a, b) => {
        // Get week numbers
        const weekA = d3.timeWeek.count(d3.timeYear(a.dateObj), a.dateObj);
        const weekB = d3.timeWeek.count(d3.timeYear(b.dateObj), b.dateObj);
        
        // First sort by week
        const weekDiff = weekA - weekB;
        if (weekDiff !== 0) return weekDiff;
        
        // Then by word count (ascending)
        return a.word_count - b.word_count;
      });

      // Assign sequential ranks
      return sortedArticles.map((article, index) => ({
        ...article,
        sequentialRank: index + 4,
        weekNumber: d3.timeWeek.count(d3.timeYear(article.dateObj), article.dateObj)
      }));
    });
  };

  const sortDataDaily = (processedData) => {
    const groupedData = d3.group(processedData, 
      d => `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`
    );

    return Array.from(groupedData.entries()).flatMap(([monthYear, articles]) => {
      // Sort articles by day and word count
      const sortedArticles = articles.sort((a, b) => {
        // First sort by day
        const dayDiff = a.dateObj.getDate() - b.dateObj.getDate();
        if (dayDiff !== 0) return dayDiff;
        // Then by word count (ascending)
        return a.word_count - b.word_count;
      });

      // Assign sequential ranks
      return sortedArticles.map((article, index) => ({
        ...article,
        sequentialRank: index + 4
      }));
    });
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Filter and process data
    const processedData = data
      .filter(d => {
        const date = new Date(d.date);
        return date.getFullYear() >= 2007 && 
               date.getFullYear() <= 2024 && 
               d.word_count > 0;
      })
      .map(d => ({
        ...d,
        dateObj: new Date(d.date)
      }));

    // Choose sorting method based on state
    let sortedData;
    switch (sortMethod) {
      case 'weekly':
        sortedData = sortDataWeekly(processedData);
        break;
      case 'daily':
        sortedData = sortDataDaily(processedData);
        break;
      default:
        sortedData = sortDataMonthly(processedData);
    }

    // Get unique month-years for y-axis
    const groupedData = d3.group(processedData, 
      d => `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`
    );
    const uniqueMonthYears = Array.from(groupedData.keys()).sort();

    // Create scales
    const timeScale = d3.scaleBand()
      .domain(uniqueMonthYears)
      .range([marginTop, heightBound])
      .padding(0.5);

    const rankScale = d3.scaleLinear()
      .domain([1, d3.max(sortedData, d => d.sequentialRank)])
      .range([marginLeft, marginLeft + widthBound]);
    
    const multiHeight = 4;
    const heightScale = d3.scaleSqrt()
      .domain([d3.min(processedData, d => d.word_count), d3.max(processedData, d => d.word_count)])
      .range([3, 16]);

    const multiWidth = 0.05;
    const widthScale = d3.scaleSqrt()
      .domain([d3.min(processedData, d => d.word_count), d3.max(processedData, d => d.word_count)])
      .range([3, 16]);

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Add sorting method selection text
    const sortMethodTexts = [
      { text: 'monthly',y : marginTop - 20, x: marginLeft + 20, color: sortMethod === 'monthly' ? 'red' : 'black' },
      { text: 'weekly', y : marginTop - 20,x: marginLeft + 100, color: sortMethod === 'weekly' ? 'red' : 'black' },
      { text: 'daily',y : marginTop - 20, x: marginLeft + 180, color: sortMethod === 'daily' ? 'red' : 'black' }
    ];

    svg.selectAll(".sort-method-text")
      .data(sortMethodTexts)
      .enter()
      .append("text")
      .attr("class", "sort-method-text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "start")
      .attr("fill", d => d.color)
      .style("cursor", "pointer")
      .style("font-size", "12px")
      .text(d => d.text)
      .on("click", (event, d) => {
        setSortMethod(d.text);
      });

    // Add axes
    const yAxis = d3.axisLeft()
      .scale(timeScale)
      .tickFormat((d, i) => {
        const [year, month] = d.split('-');
        // Only return formatted text if the month is January
        if (month === '01') {
          const date = new Date(year, month - 1);
          return d3.timeFormat("%b %Y")(date);
        }
        // Return empty string for non-January months
        return '';
      });

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(yAxis)
      .call(g => g.selectAll(".domain").remove());

    const xAxis = d3.axisTop(rankScale)
      .tickValues(d3.range(60, d3.max(sortedData, d => d.sequentialRank), 60))
      .tickFormat(d => `Article ${d}`)
      .tickSize(-(heightBound - marginTop));  // Extend ticks across the chart height
    
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${marginTop})`)
      .call(xAxis)
      .call(g => {
        g.selectAll(".domain").remove();
        g.selectAll(".tick line")
          .attr("stroke-width", 0.5);  // Set tick line thickness
      });

    // Add tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "10px")
      .style("border", "0.5px solid #ddd")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")  // Add font size
      .style("line-height", "1.4");  // Optional: improve readability

    // Add rectangles with transition
    const rectangles = svg.selectAll("rect")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("class", d => `topic-${d.topic_label.replace(/\s+/g, '-')}`)
      .attr("x", d => rankScale(d.sequentialRank))
      .attr("y", d => {
        const monthYear = `${d.dateObj.getFullYear()}-${String(d.dateObj.getMonth() + 1).padStart(2, '0')}`;
        return timeScale(monthYear);
      })
      .attr("width", d => widthScale(d.word_count * multiWidth))
      .attr("height", d => heightScale(d.word_count * multiHeight))
      .attr("fill", "black")
      .style("opacity", 1)
      .attr("rx", 2)
      .attr("ry", 2)
      .style("cursor", "pointer");

    // Add transition
    rectangles
      .transition()
      .duration(3300)
      .ease(d3.easeCubicInOut)
      .attr("x", d => rankScale(d.sequentialRank));

    // Add hover effects
    rectangles
      .on("mouseover", (event, d) => {
        const dateStr = d.dateObj.toLocaleDateString('en-US', { 
          month: 'numeric', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        tooltip
          .style("visibility", "visible")
          .html(`<b>${d.topic_label}</b> ${dateStr}<br>${d.title}<br>Words: ${d.word_count}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Cleanup
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [data, sortMethod]);

  return (
    <div>
      <p className="mb-4 text-lg">Svalbard Articles Scatter Plot (2014-2024)</p>
      <svg 
        ref={svgRef}
        width={width} 
        height={height}
        className="bg-white"
      />
    </div>
  );
}

export default Chart;