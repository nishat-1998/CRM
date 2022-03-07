import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import countries from "i18n-iso-countries"; 
import axios from 'axios';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Country = () => {
    const cht = useRef(null);
    const [val, setVal] = useState([]);

    useEffect(() => {
  
      async function fetchData() {
  
        const response = await axios.get(`http://161.97.79.224:3001/dashboard/country`);
  
        try {
          console.log(response.data);
          if (response.data.length) {
            const ar = response.data.map((elem) => {
              let container = {
                'id': countries.getAlpha2Code(elem.country, "en"),
                'name': elem.country,
                'Leads': elem.LeadCount,
                'Customer': elem.CustomerCount,
                'fill': am4core.color("#ea0127")
              }
              return container;
            })
            setVal(ar);
          }
        }
        catch (error) {
          alert(error);
        }
      }
      fetchData();
    }, []);
    
    
    useLayoutEffect(() => {
      let chart = am4core.create("chartdiv", am4maps.MapChart);
  
      // Set map definition
      // Check if proper geodata is loaded
      try {
        chart.geodata = am4geodata_worldLow;
      }
      catch (e) {
        chart.raiseCriticalError({
          "message": "Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."
        });
      }
  
      // Set projection
      chart.projection = new am4maps.projections.Projection(); // am4maps.projections.Miller
  
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      var tooltipHTML = `<center><strong>{name}</strong></center>
      <hr />
      <table>
      <tr>
        <th align="left">Leads</th>
        <td>{Leads}</td>
      </tr>
      <tr>
        <th align="left">Customer</th>
        <td>{Customer}</td>
      </tr>
      </table>
      <hr />`;
  
      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;
  
      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;

      // polygonTemplate.tooltipText = `[bold font-size: 20px]{name}[/]
      // Leads: {Leads}
      // Customer: {Customer}`;
      polygonTemplate.tooltipHTML = tooltipHTML;
      polygonTemplate.fill = am4core.color("#74B266"); // #fa5b3d 
  
      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("grey");
  
      // Add some data
      polygonSeries.data = val;
  
      // Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = "fill";
      chart.seriesContainer.draggable = false;
      chart.maxZoomLevel = 1;
  
      cht.current=chart;
      return () => {
          chart.dispose();
        };
    }, [val]);

    return (
            <div id="chartdiv" style={{height: 500, width: '100%', alignContent: 'center'}}/>

    );
}

export default Country;