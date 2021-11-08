import React,{ useEffect, useState} from 'react';
import background from '../assets/background.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {database} from '../components/fire'
import { set, ref, push } from '@firebase/database';
import { useNavigate } from "react-router-dom";
function Questions(){
    const navigate = useNavigate();
    //create values to store user input
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [c_number, setC_number] = useState('');
    const [date, setDate] = useState('');
    const [age,setAge] = useState('');

    
    //create values for selection
    const strongly_Agree = 1;
    const agree = 2;
    const neutral = 3;
    const disagree = 4;
    const strongly_Disagree = 5;
    
    // create const to change background color of question answers
    const [eatOut, setEatout] = useState({
        stronglyAgree_color:'',
        agree_color:'', 
        neutral_color:'',
        disagree_color:'',
        stronglyDisagree_color:'',
        response:'',


    });
    const [watchTv, setWatchTv] = useState({
        stronglyAgree_color:'',
        agree_color:'', 
        neutral_color:'',
        disagree_color:'',
        stronglyDisagree_color:'',
        response:'',


    });
    const [watchMovies, setWatchMovies] = useState({
        stronglyAgree_color:'',
        agree_color:'', 
        neutral_color:'',
        disagree_color:'',
        stronglyDisagree_color:'',
        response:'',


    });
    const [radio, setRadio] = useState({
        stronglyAgree_color:'',
        agree_color:'', 
        neutral_color:'',
        disagree_color:'',
        stronglyDisagree_color:'',
        response:'',


    });
    //food like category values
    const [pizza,setPizza] = useState({
        pizzaSelect:false,
        color:'',
        value:''
    });
    //food like category values
    const [pasta,setPasta] = useState({
        select:false,
        color:'',
        value:''
    });
    //food like category values
    const [beefSF,setBeefSF] = useState({
        select:false,
        color:'',
        value:''
    });
    //food like category values
    const [chickenSF,setChickenSF] = useState({
        select:false,
        color:'',
        value:''
    });
    //food like category values
    const [pap_wors,setPap_wors] = useState({
        select:false,
        color:'',
        value:'',
    });
     //food like category values
     const [other,setOther] = useState({
        select:false,
        color:'',
        value:'',
    });

    //create error handling values
    const [ErrorName, setErrorName] = useState('')
    const [ErrorSurname, setErrorSurname] = useState('');
    const [ErrorNumber, setErrorNumber] = useState('');
    const [ErrorDate, setErrorDate] = useState('');
    const [ErrorAge, setErrorAge] = useState('');
    const [ErrorFood, setErrorFood] = useState('');
    const [ErrorTV, setErrorTV] = useState('');
    const [ErrorEat, setErrorEat] = useState('');
    const [ErrorMovies, setErrorMovies] = useState('');
    const [ErrorRadio, setErrorRadio] = useState('');

  //handles the pizza button functionality
  function HandleselectionPizza(){

    if(pizza.pizzaSelect === false){
        setPizza(
            {color:'darkorange',
            pizzaSelect: true,
            value:'Pizza'
            }
        )
    }else if(pizza.pizzaSelect === true){
        setPizza({
            color:'',
            pizzaSelect:false,
            value:'',

        })
    }
    }
    function HandleselectionPasta(){
        if(pasta.select === false){
            setPasta(
                {color:'darkorange',
                select: true,
                value:'Pasta'
                }
            )
        }else if(pasta.select === true){
            setPasta({
                color:'',
                select:false,
                value:''
            })
        }
    }
    function HandleselectionPap(){

    
        if(pap_wors.select === false){
            setPap_wors(
                {color:'darkorange',
                select: true,
                value:'Pap and Wors'
                }
            )
        }else if(pap_wors.select === true){
            setPap_wors({
                color:'',
                select:false,
                value:''
            })
        }
    }
    function HandleselectionBeef(){
        if(beefSF.select === false){
            setBeefSF(
                {color:'darkorange',
                select: true,
                value:'Beef Chicken Stir Fry'
                }
            )
        }else if(beefSF.select === true){
            setBeefSF({
                color:'',
                select:false,
                value:''
            })
        }
    }
    function HandleselectionChicken(){
        if(chickenSF.select === false){
            setChickenSF(
                {color:'darkorange',
                select: true,
                value:'Chicken Stir Fry'
                }
            )
        }else if(chickenSF.select === true){
            setChickenSF({
                color:'',
                select:false,
                value:'',
            })
        }
    }
    function HandleselectionOther(){

    
        if(other.select === false){
            setOther(
                {color:'darkorange',
                select: true,
                value:'other'
                }
            )
        }else if(other.select === true){
            setOther({
                color:'',
                select:false,
                value:''
            })
        }
    }
    
       
        
        function HandleErrors(){
            var Nerror = '';
            var Uerror = '';
            var Serror = '';
            var Derror = '';
            var Aerror = '';
            var Ferror = '';
            var Eerror = '';
            var Merror = '';
            var Terror = '';
            var Rerror = '';
            if(username === ''|| username.length < 3){
                 Uerror = 'Invalid username'
                setErrorName(Uerror);
            }else{
                Uerror = ''
                setErrorName('');
            };

            if(surname === '' || surname.length < 3){
                 Serror = 'Invalid Surname'
                setErrorSurname('Invalid Surname')
            }else{
                Serror = ''
                setErrorSurname('');
            }

            if(c_number === '' || c_number.length != 10){
                Nerror = 'Invalid Number';
                setErrorNumber('Invalid Number');
            }else if( c_number.match("[0-9]") === false){
                Nerror = 'Invalid Number';
                setErrorNumber('Invalid Number')
            }else{
                Nerror = ''
                setErrorNumber('');
            }

            if(date === ''){
                Derror = 'Please Select'
                setErrorDate('Date cannot be blank');
            }else{
                Derror = '';
                setErrorDate('');
            }

            if(age === '' ){
                Aerror = 'Invalid Age';
                setErrorAge('Invalid Age');
             
            }else if(age < 5){
                Aerror = 'Invalid Age';
                setErrorAge('Invalid Age');
                
                
            }else if(age > 120){
                Aerror = 'Invalid Age';
                setErrorAge('Invalid Age');
               
                
            }else{
                Aerror = '';
                setErrorAge('');
                
            }

            if(pasta.value === '' && beefSF.value === '' && chickenSF.value === '' && other.value === '' && pap_wors.value === '' && pizza.value === ''){
                Ferror = 'Please Select Your Favourite Food'
                setErrorFood('Please Select Your Favorite Food');
            }else{
                Ferror = ''
                setErrorFood('');
            }

            if(eatOut.response === ''){
                Eerror = 'Please Select'
                setErrorEat('Please Select any One of the Five indicators')
            }else{
                Eerror = '';
                setErrorEat('');
            }
            if(watchMovies.response === ''){
                Merror='Please Select'
                setErrorMovies('Please Select any One of the Five indicators')
            }else{
                Merror = '';
                setErrorMovies('')
            }
            if(watchTv.response === ''){
                Terror = 'Please Select'
                setErrorTV('Please Select any One of the Five indicators')
            }else{
                Terror = '';
                setErrorTV('');
            }
            if(radio.response === ''){
                Rerror = 'Please Select'
                setErrorRadio('Please Select any One of the Five indicators')
            }else{
                Rerror = '';
                setErrorRadio('');
            }

            if(Uerror === '' && Serror === '' && Nerror === '' && Aerror === '' && Ferror ==='' && Eerror === '' && Merror === '' && Terror === '' && Rerror ===  ''){
                const reference = ref(database,'users');
                const newRef = push(reference)
                set(newRef,{
                    //stores users personal details
                    username: username,
                    surname: surname,
                    date: date,
                    age: age,
                    c_number: c_number,
                   
                    //store users food selections
                    pap_wors: pap_wors.value,
                    pasta: pasta.value,
                    pizza: pizza.value,
                    chickenSF: chickenSF.value,
                    beefSF: beefSF.value,
                    other: other.value,
        
                    //users responses from 1 to 5
                    eat_out: eatOut.response,
                    watchMovies: watchMovies.response,
                    radio: radio.response,
                    watchTv: watchTv.response,
                }).catch((err)=> console.log('error ', err)).then(()=>{
                    alert("Thank You For Taking The Survey!");
                    navigate('/');
                });
                
               }
        }
    // submits users response to the database.
    function HandleSubmission(){
       HandleErrors();

       
        
        
    }

    return(
        <div style={{backgroundColor:'white'}}>
            <img src={background}  className="background"  />
            <div style={{position:'relative'}}>
            <h2 className="questions"style={{paddingTop:'100px',marginTop:0}}>Personal Details:</h2>
            <input 
            type="text"
            name="username"
            placeholder="Name" 
            className="pText"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
            <br/>
            <p className="error">{ErrorName}</p>
            <input 
            type="text"
            name="surname"
            placeholder="Surname"
            className="pText"
            value={surname}
            onChange={(e)=>setSurname(e.target.value)}
            />
            <br/>
            <p className="error">{ErrorSurname}</p>
            <input 
            type="text" 
            name="c_number"
            placeholder="Contact Number"
            className="pText"
            value={c_number}
            onChange={(e)=>setC_number(e.target.value)}
            />
            <br/>
            <p className="error">{ErrorNumber}</p>
            <DatePicker
            className="pText"
            selected={date} 
            placeholderText="Select Date"
            onChange={(e)=> setDate(e)}
            />
            <br/>
            <p className="error">{ErrorDate}</p>
            <input 
            type="text"
            name="age"
            placeholder="Age"
            className="pText"
            value={age}
            onChange={(e)=> setAge(e.target.value)}
            />
            <br/>
            <p className="error">{ErrorAge}</p>
            <h2 className="questions">What Is Your Favourite Food? (You Can Choose More Than One Answer).</h2>
            <input 
            className="selectionBtn" 
            type='submit' 
            value="Pasta"
            style={{backgroundColor:pasta.color}}
            onClick={()=> HandleselectionPasta()}
            
            />
            <input 
            className="selectionBtn"
            type='submit' 
            value="Chicken Stir Fry"
            style={{backgroundColor:chickenSF.color,}}
            onClick={()=>HandleselectionChicken()}
            />
            <br/>
            <input 
            className="selectionBtn" 
            type='submit' 
            value="Pizza" 
            style={{backgroundColor:pizza.color,}}
            onClick={()=>HandleselectionPizza()}/>
            <input  
            className="selectionBtn" 
            type='submit' 
            value="Pap and Wors"
            style={{backgroundColor:pap_wors.color,}}
            onClick={()=>HandleselectionPap()}
            />
            <br/>
            <input 
            className="selectionBtn" 
            type='submit' 
            value="Beef Stir Fry"
            style={{backgroundColor:beefSF.color,}}
            onClick={()=>HandleselectionBeef()}
            />
            <input 
            className="selectionBtn" 
            type='submit' 
            value="Other"
            style={{backgroundColor:other.color,}}
            onClick={()=>HandleselectionOther()}
            /><br/>
            <p className="error">{ErrorFood}</p>
            <h2 className="questions">I Like To Eat Out</h2>
            <input 
            className="SAbtn" 
            type="submit" 
            value={`Strongly Agree (${strongly_Agree})`} 
            style={{backgroundColor: eatOut.stronglyAgree_color}} 
            onClick={()=>setEatout(
                {stronglyAgree_color:'darkorange',
                    agree_color:'',
                    neutral_color:'',
                    disagree_color:'',
                    stronglyDisagree_color:'',
                    response: strongly_Agree,
                })}/>
            <input 
            className="Abtn" 
            type="submit" 
            value={`Agree (${agree})`}
            style={{backgroundColor: eatOut.agree_color}} 
            onClick={()=>setEatout(
                {stronglyAgree_color:'',
                agree_color:'darkorange',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: agree,
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Neutral (${neutral})`}
            style={{backgroundColor: eatOut.neutral_color}} 
            onClick={()=>setEatout(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'darkorange',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: neutral,
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Disagree (${disagree})`}
            style={{backgroundColor: eatOut.disagree_color}} 
            onClick={()=>setEatout(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'darkorange',
                stronglyDisagree_color:'',
                response: disagree,
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Strongly Disagree (${strongly_Disagree})`}
            style={{backgroundColor: eatOut.stronglyDisagree_color}} 
            onClick={()=>setEatout(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'darkorange',
                response: strongly_Disagree,
                })}
            /><br/>
            <p className="error">{ErrorEat}</p>
            <h2 className="questions">I Like To Watch Movies</h2> 
            <input 
            className="SAbtn" 
            type="submit" 
            value={`Strongly Agree (${strongly_Agree})`} 
            style={{backgroundColor: watchMovies.stronglyAgree_color}} 
            onClick={()=>setWatchMovies(
                {stronglyAgree_color:'darkorange',
                    agree_color:'',
                    neutral_color:'',
                    disagree_color:'',
                    stronglyDisagree_color:'',
                    response: strongly_Agree
                })}/>
            <input 
            className="Abtn" 
            type="submit" 
            value={`Agree (${agree})`}
            style={{backgroundColor: watchMovies.agree_color}} 
            onClick={()=>setWatchMovies(
                {stronglyAgree_color:'',
                agree_color:'darkorange',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: agree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Neutral (${neutral})`}
            style={{backgroundColor: watchMovies.neutral_color}} 
            onClick={()=>setWatchMovies(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'darkorange',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: neutral
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Disagree (${disagree})`}
            style={{backgroundColor: watchMovies.disagree_color}} 
            onClick={()=>setWatchMovies(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'darkorange',
                stronglyDisagree_color:'',
                response: disagree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Strongly Disagree (${strongly_Disagree})`}
            style={{backgroundColor: watchMovies.stronglyDisagree_color}} 
            onClick={()=>setWatchMovies(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'darkorange',
                response: strongly_Disagree
                })}
            /><br/>
            <p className="error">{ErrorMovies}</p>
            <h2 className="questions">I Like To Watch TV</h2>
            <input 
            className="SAbtn" 
            type="submit" 
            value={`Strongly Agree (${strongly_Agree})`} 
            style={{backgroundColor: watchTv.stronglyAgree_color}} 
            onClick={()=>setWatchTv(
                {stronglyAgree_color:'darkorange',
                    agree_color:'',
                    neutral_color:'',
                    disagree_color:'',
                    stronglyDisagree_color:'',
                    response: strongly_Agree
                })}/>
            <input 
            className="Abtn" 
            type="submit" 
            value={`Agree (${agree})`}
            style={{backgroundColor: watchTv.agree_color}} 
            onClick={()=>setWatchTv(
                {stronglyAgree_color:'',
                agree_color:'darkorange',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: agree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Neutral (${neutral})`}
            style={{backgroundColor: watchTv.neutral_color}} 
            onClick={()=>setWatchTv(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'darkorange',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: neutral
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Disagree (${disagree})`}
            style={{backgroundColor: watchTv.disagree_color}} 
            onClick={()=>setWatchTv(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'darkorange',
                stronglyDisagree_color:'',
                response: disagree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Strongly Disagree (${strongly_Disagree})`}
            style={{backgroundColor: watchTv.stronglyDisagree_color}} 
            onClick={()=>setWatchTv(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'darkorange',
                response: strongly_Disagree
                })}
            /><br/>
            <p className="error">{ErrorTV}</p>
            <h2 className="questions">I Like To Listen To Radio</h2>
            <input 
            className="SAbtn" 
            type="submit" 
            value={`Strongly Agree (${strongly_Agree})`} 
            style={{backgroundColor: radio.stronglyAgree_color}} 
            onClick={()=>setRadio(
                {stronglyAgree_color:'darkorange',
                    agree_color:'',
                    neutral_color:'',
                    disagree_color:'',
                    stronglyDisagree_color:'',
                    response: strongly_Agree
                })}/>
            <input 
            className="Abtn" 
            type="submit" 
            value={`Agree (${agree})`}
            style={{backgroundColor: radio.agree_color}} 
            onClick={()=>setRadio(
                {stronglyAgree_color:'',
                agree_color:'darkorange',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: agree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Neutral (${neutral})`}
            style={{backgroundColor: radio.neutral_color}} 
            onClick={()=>setRadio(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'darkorange',
                disagree_color:'',
                stronglyDisagree_color:'',
                response: neutral
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Disagree (${disagree})`}
            style={{backgroundColor: radio.disagree_color}} 
            onClick={()=>setRadio(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'darkorange',
                stronglyDisagree_color:'',
                response: disagree
                })}
            />
            <input 
            className="Abtn" 
            type="submit" 
            value={`Strongly Disagree (${strongly_Disagree})`}
            style={{backgroundColor: radio.stronglyDisagree_color, marginBottom:'50px'}} 
            onClick={()=>setRadio(
                {stronglyAgree_color:'',
                agree_color:'',
                neutral_color:'',
                disagree_color:'',
                stronglyDisagree_color:'darkorange',
                response: strongly_Disagree
                })}
            /><br/>
            <p className="error">{ErrorRadio}</p>
            <input type="submit"
            className="submitBtn" 
            value="Submit Answers"
            onClick={()=> HandleSubmission()}/>
            
            
            </div>
            

        </div>
    )
}
export default Questions;