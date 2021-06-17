import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Box from '@material-ui/core/Box';
// import Background from "./img/agra.jpg";
// import Background from "./img/green.jpg";
import Background from "./img/leaf2.jpg";
import Greenhouse from "./img/greenhouse.jpg";
import Harvest from "./img/harvest.jpg";
import Plant from "./img/plant.jpg";
import Defect from "./img/defect.jpg";


 


class Green extends Component {
    state = {};
    render() {
      const appStyle = {
         Screen : {
          backgroundImage: 'url('+Background+')',
          backgroundSize: "cover",
          // height: "100%",
          // background: "rgba(0,0,0,0.7)",
          
          
         },

        BoxStyles:{
          width : "30%",
          height : "92.5vh",
          boxShadow: "5px 7px 7px 5px #0E171B",
          backgroundColor: '#0E171B',
          opacity: 0.9,
           
        },
        Greenhouse: {
          backgroundColor: '#ffff',
          width : "100%", 
          height : 145,
          marginTop:45,
          backgroundImage: 'url('+Greenhouse+')',
          backgroundSize: "cover",
          
        },
        DefectDetection: {
          backgroundColor: '#ffff',
          width : "100%", 
          height : 145,
          marginTop:30,
          backgroundSize: "cover",
          backgroundImage: 'url('+Defect+')',
        },
        PlantInformation: {
          backgroundColor: '#ffff',
          width : "100%", 
          height : 145,
          marginTop:45, 
          backgroundImage: 'url('+Plant+')',
          backgroundSize: "cover",
          
        },
        HarvestIdentification: {
          backgroundColor: '#ffff',
          width : "100%", 
          height : 145,
          marginTop:30, 
          backgroundSize: "cover",
          backgroundImage: 'url('+Harvest+')',
        },
        Boxset : {
          marginLeft : "20vh",  
        },
        Article: {
          marginTop : "5vh"  
        },
        Text : {
          fontfamily: "Arial",
          textalign: "center",
          fontWeight: 'bold',
          fontSize : "25px",
          marginLeft: "10px",
          opacity : "100%"
        },
        Introduction : {
          marginLeft: "50px",
          color : "#ffff",
          textalign: "center",
        },
        RightTextboxstyle : {
          width : 300,
          height : 300,
          marginTop : 20,
          borderRadius: 20,
          boxShadow: "5px 7px 7px 5px #0E171B",
          backgroundSize: "cover",
          backgroundColor: '	#ffe6e6',
        },
        LeftTextboxstyle : {
          width : 300,
          height : 300,
          marginTop : 20,
          marginLeft : 150,
          borderRadius: 20,
          boxShadow: "5px 7px 7px 5px #0E171B",
          backgroundSize: "cover",
          backgroundColor: '	#ffe6e6',
        }
          
       
      };
      
      return (
        <div class="bg_image"  style = {appStyle.Screen} >

          <article className="row">
                <Box style = {appStyle.BoxStyles}>
                  <span style = {appStyle.Introduction}>Introduction</span>
                </Box>

                <article className = "column" style = {appStyle. Boxset}>
                  <article className="row">
                    <Box  style = {appStyle.RightTextboxstyle}>
                      <span style = {appStyle.Text}>View Greenhouse </span>
                      <Box style = {appStyle.Greenhouse}></Box>
                   </Box>
        
                    <Box style = {appStyle.LeftTextboxstyle}>
                      <span style = {appStyle.Text}>Plant Information </span>
                      <Box style = {appStyle.PlantInformation}></Box>
                    </Box>
                  </article >

                  <article className = "row" style = {appStyle.Article}>
                    <Box style = {appStyle.RightTextboxstyle}>
                      <span style = {appStyle.Text}>Defect Detection </span>
                      <Box style = {appStyle.DefectDetection}></Box>
                    </Box>
        
                    <Box style = {appStyle.LeftTextboxstyle}>
                      <span style = {appStyle.Text}>Harvest Identification </span>
                      <Box style = {appStyle.HarvestIdentification}></Box>
                    </Box>  
                  </article>
                  
                </article>
            
             </article>

   </div>
      );
    }
  }
  
  export default Green;