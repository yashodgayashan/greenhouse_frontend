import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Box from '@material-ui/core/Box'; 

 


class Green extends Component {
    state = {};
    render() {
      const appStyle = {
       BoxStyles:{
          border : " #6B8E23 ",
          width : "90%",
          height : 300,
          marginLeft : 80,
          marginRight : 80,
          marginTop : 50,
          borderRadius: 20,
          boxShadow: "5px 7px 7px 5px #6B8E23",
          backgroundImage: 'url(${require("./componentsm/images/fan.jpg")})'
          
        },
        LittleBoxStyles: {
          border : " #6B8E23 ",
          width : 300,
          height : 250,
          marginLeft : 20,
          marginRight : 60,
          marginTop : 50,
          borderRadius: 20,
          boxShadow: "5px 7px 7px 5px #6B8E23"
        },
        article: {
          marginLeft : 60,
        }
      };
      
      return (
        <div>
          
            <Box  style = {appStyle.BoxStyles}>
            {/* <img src="/components/images/fan.jpg"/> */}
            
            </Box>
  
            <article className="row" style = {appStyle.article}>
            <Box  style = {appStyle.LittleBoxStyles}>
            </Box>
  
            <Box style = {appStyle.LittleBoxStyles}>
           </Box>
  
            <Box style = {appStyle.LittleBoxStyles}>
            </Box>
  
            <Box style = {appStyle.LittleBoxStyles}>
            </Box>

            </article>
  
   </div>
      );
    }
  }
  
  export default Green;