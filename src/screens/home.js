import React from "react";
import {Link} from 'react-router-dom';
function HomeScreen(){

    return(
        <div>
            <h1 className="home-title">Welcome!, Please Take A Survey With Us!</h1>
            <div className ="survey-container">
                <Link to="/survey" className="SurveyBtn">Fill Out Survey</Link><br/>
            </div>
            <div className="results-container">
                <Link to="/results" className="resultsBtn">View Results</Link>
            </div>
            
        </div> 
    )
}
export default HomeScreen;