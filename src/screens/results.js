import React, {useEffect, useState} from 'react';
import {Chart} from 'react-google-charts';
import {database} from '../components/fire'
import { child, get, ref} from '@firebase/database';
import {useNavigate} from 'react-router-dom'
function Statistics(){
    //value to navigate.
    const navigate = useNavigate();
    //create reference for database.
    const reference = ref(database);
    // create denominator
    var denominator = 0;
    //create average age value
    const [averageAge, setAverageage] = useState('');
    //create max age value
    const [maxAge,SetMaxAge] = useState(0);
    //create min age value
    const [minAge, setMinAge] = useState('');
    //create total surveys value
    const [tSurvey, setTSurvey] = useState();
    var sum = 0;
    var AgeextensionArray = [];
    //value to store pasta count
    const [pastaCount, setPastaCount] = useState('');
    //value to store beef count
    const [beefCount, setBeefCount] = useState('');
    //value to store chicken count
    const [chickenCount, setChickenCount] = useState('');
    //value to store pizza count
    const [pizzaCount, setPizzaCount] = useState('');
    //value to store pap count
    const [papCount, setPapCount] = useState('');
    //value to store other count
    const [otherCount, setOtherCount] = useState('');
    //create an array to store pasta value of each user
    var PastaExtensionArray = [];
    //create an array to store beef value of each user
    var BeefExtensionArray = [];
    //create an array to store chicken value of each user
    var ChickenExtensionArray = [];
    //create an array to store pizza value of each user
    var pizzaExtensionArray = [];
    //create an array to store pap value of each user
    var papExtensionArray = [];
    //create an array to store other value of each user
    var otherExtensionArray = [];
    //create an array to store eat out values
    var eatOutExtensionArray = [];
    //create value to store eat out average
    const [eatAverage, setEatAverage] = useState('');
    //create an array to store TV values
    var TVExtensionArray = [];
    //create value to store TV average
    const [TVAverage, setTVAverage] = useState('');
    //create an array to store Movies values
    var moviesExtensionArray = [];
    //create value to store movies average
    const [moviesAverage, setMoviesAverage] = useState('');
    //create an array to store Radio values
    var radioExtensionArray = [];
    //create value to store Radio average
    const [radioAverage, setRadioAverage] = useState('');

    
    useEffect(()=>{

        //get data from database
        get(child(reference, 'users')).then((snapshot)=>{
            if(snapshot.exists()){
                const snap = snapshot.val();
                //retrieves keys of data and stores it in an array
                const keys = Object.keys(snap);
                
                //stores length of array as denominator
                var Arraylength = keys.length;
                denominator = Arraylength;
                console.log('denominator ', denominator);
                
                var Avge = 0;
                //create for loop to loop through data in the database
                for(let x = 0; x < denominator;x++){
                    var key = keys[x];
                    get(child(reference, `users/${key}`)).then((snappy)=>{
                        if(snappy.exists()){
                            const data = snappy.val();
                            /*Numbers section*/
                            
                            
                            AgeextensionArray[x] = data.age;
                            //converts string of arrays into number of arrays
                            AgeextensionArray = AgeextensionArray.map(Number);                                                                               
                            //sorts array in ascending order
                            AgeextensionArray.sort(function(a,b){return a-b});
                            
                            //get max and min age from database
                            //the first index of the array contains the minimum age
                            
                            setMinAge(AgeextensionArray[0]);
                            //the length of the array -1 is equal to the last index of the array which contains the maximum age
                            SetMaxAge(AgeextensionArray[denominator - 1]);
                            //Total number of Surveys taken is equal to the amount of keys stored
                            setTSurvey(denominator);   
                            //sum of ages

                            //concatenates all values together across an array
                            sum = AgeextensionArray.reduce(function(results,item){
                                return results + item;
                            },0);

                            
                            Avge = sum/denominator;
                            var Avround = Math.round(Avge * 10)/10;
                            setAverageage(Avround);

                            /*percentage section*/
                            if(data.pasta !==""){
                                PastaExtensionArray[x] = data.pasta;
                                PastaExtensionArray.sort();
                                PastaExtensionArray = PastaExtensionArray.filter(String);
                                setPastaCount(PastaExtensionArray.length);
                                console.log('pasta count ',pastaCount);

                            }
                            if(data.BeefSF !==""){
                                BeefExtensionArray[x] = data.beefSF;
                                BeefExtensionArray.sort();
                                BeefExtensionArray = BeefExtensionArray.filter(String);
                                setBeefCount(BeefExtensionArray.length);
                                console.log('beef count ',beefCount);
                            }
                            if(data.chickenSF !==""){
                                ChickenExtensionArray[x] = data.chickenSF;
                                ChickenExtensionArray.sort();
                                ChickenExtensionArray = ChickenExtensionArray.filter(String);
                                setChickenCount(ChickenExtensionArray.length);
                                console.log('chicken count ',chickenCount);
                            }
                            if(data.pizza !==""){
                                pizzaExtensionArray[x] = data.pizza;
                                pizzaExtensionArray.sort();
                                pizzaExtensionArray = pizzaExtensionArray.filter(String);
                                setPizzaCount(pizzaExtensionArray.length);
                                console.log( 'pizza count ',pizzaCount);
                            }
                            if(data.pap_wors !==""){
                                papExtensionArray[x] = data.pap_wors;
                                papExtensionArray.sort();
                                papExtensionArray = papExtensionArray.filter(String);
                                setPapCount(papExtensionArray.length);
                                console.log( 'pap count ',papCount);
                            }
                            if(data.other !==""){
                                otherExtensionArray[x] = data.other;
                                otherExtensionArray.sort();
                                otherExtensionArray = otherExtensionArray.filter(String);
                                setOtherCount(otherExtensionArray.length);
                                console.log( 'other count ',otherCount);
                            }
                            
                            /*Statements section*/

                            eatOutExtensionArray[x] = data.eat_out;
                            // get the sum of eat out responses
                            var sumE = eatOutExtensionArray.reduce(function(results,item){
                                return results + item;
                            },0);
                            console.log('Eat Out Average ', sumE/eatOutExtensionArray.length);
                            var Eav = sumE/eatOutExtensionArray.length;
                            var eRound = Math.round(Eav * 10)/10;
                            setEatAverage(eRound)
                            
                            TVExtensionArray[x] = data.watchTv;
                            //get the sum of watch TV Responses
                            var sumTV = TVExtensionArray.reduce(function(results,item){
                                return results + item;
                            },0);
                            console.log('TV ', TVExtensionArray)
                            console.log('sum TV ', sumTV);
                            var Tav = sumTV/TVExtensionArray.length;
                            var tRound = Math.round(Tav * 10)/10;
                            setTVAverage(tRound);

                            radioExtensionArray[x] = data.radio;
                            //get the sum of watch TV Responses
                            var sumRadio = radioExtensionArray.reduce(function(results,item){
                                return results + item;
                            },0);
                            console.log('Radio ', radioExtensionArray)
                            console.log('sum Radio ', sumRadio);
                            var Rav = sumRadio/radioExtensionArray.length;
                            var rRound = Math.round(Rav * 10)/10;
                            setRadioAverage(rRound);

                            moviesExtensionArray[x] = data.watchMovies;
                            //get the sum of watch TV Responses
                            var sumMovies = moviesExtensionArray.reduce(function(results,item){
                                return results + item;
                            },0);
                            console.log('Movies ', moviesExtensionArray)
                            console.log('sum Movies ', sumMovies);
                            var Mav = sumMovies/moviesExtensionArray.length;
                            var mRound = Math.round(Mav * 10)/10;
                            setMoviesAverage(mRound);
                            
                        }
                        
                           
                        
                    })
                    
                }
            
            }
            
        })
    },[])
    
    const dataPie = [
        ["Food", "Percentage"],
        ['Pizza',pizzaCount],
        ['Chicken Stir Fry',chickenCount],
        ['Beef Stir Fry',beefCount],
        ['Pasta',pastaCount],
        ['Pap and Wors',papCount],
        ['Other',otherCount],

    ];

    const optionsPie = {
        title:'Title Comes here',
        pieHole: 0.5,
        is3D: false,
        chartArea:{width: 600, height: 600}
    }

    const dataBar = [
        ["Statements", "Average", {role:"style"}],
        ["People Like To Eat Out", eatAverage, "color: gray"],
        ["People Like To Watch Movies", moviesAverage, "color: darkorange"],
        ["People Like To Watch TV", TVAverage, "color: #0b9dd6"],
        ["People Like To Listen To Radio", radioAverage, "color: red"],
    ]
    const optionsBar ={
        title:"Average of Responses on All Statements",
        chartArea:{width:'50%'},
        hAxis:{title:'Average', minValue:0, maxValue: 5},
        vAxis:{
            title:'statements'
        }
    }

    return(
        <div style={{marginTop:'0px',backgroundColor:'white', height:'1500px'}}> 
            <h1 style={{margin:0, textAlign:'center'}}> Results!</h1>
            <div className="numbers-category">
                <div className="outer-circle">
                    <div className="inner-circle">
                        <h1 className="age-value">{averageAge}</h1>
                        <h2 className="age-label">Average Age</h2>
                    </div>
                </div>

                <div className="outer-circle2">
                    <div className="inner-circle2">
                        <h1 className="age-value">{tSurvey}</h1>
                        <h2 className="age-label">Total Number of Surveys</h2>
                    </div>
                </div>
                <div className="outer-circle4">
                    <div className="inner-circle2">
                        <h1 className="age-value">{minAge}</h1>
                        <h2 className="age-label">Minimum Age</h2>
                    </div>
                </div>
                <div className="outer-circle3">
                    <div className="inner-circle2">
                        <h1 className="age-value">{maxAge}</h1>
                        <h2 className="age-label">Maximum Age</h2>
                    </div>
                </div>
            </div>
            
            <div className="percentage-category">
                <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={dataPie}
                options={optionsPie}
                />
            </div>
            <div className="average-category">
                
                <Chart
               
                chartType="BarChart"
                width='100%'
                height='500px'
                data={dataBar}
                options={{optionsBar}}
                />
                
            </div>

            <input 
            
            className="submitBtnR" 
            onClick={()=>navigate('/')}
            type="submit" 
            value="OK"/>
        </div>
    )
}
export default Statistics;