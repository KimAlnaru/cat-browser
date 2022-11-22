import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cat from './Components/Cat/Cat';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { CatContext } from './Contexts/CatContext';

function App() {

  const [ catID, setCatID ] = useState('');
    const [ cats, setCats ] = useState([]);
    const [ limit, setLimit ] = useState(10); 
    const [ errorMesage, setErrorMessage ] = useState('');
    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ lastCat, setLastCat ] = useState(false);
    const [ catDetails, setCatDetails ] = useState(null);
    // For Cat.js
    const [ catBreed, setCatBreed] = useState([]);
    
    // For Input.js
    const [ getCats, setGetCats ] = useState([]);    

    useEffect(() => {      
      try {
          // Get the cats data on page load for the Input.js select option         
          axios.get('/v1/breeds').then((res) => {
              setGetCats(res.data);              
          })   
      } catch (error) {
          setShowErrorMessage(true);
          setErrorMessage('Apologies but we could not load new cats for you at this time! Miau!');
          window.scrollTo({
              top: 0,                
              behavior: 'smooth'
          });
      }     
    },[]);
  
    const changeBreed = useCallback( async(id) => {   
      
        setShowErrorMessage(false);  // this is responsible of showing the alert error message if error occurs.

        // Pagination Code block
        let pageLimit;

        // This code block ensure that the limit is accurate and is saved for later use.
        if (localStorage.getItem("counter") === null) {  
           setLimit(10)         
           localStorage.setItem("counter", limit);
           pageLimit = limit;        
        } else {
           setLimit(10)
           pageLimit = 10
           localStorage.setItem("counter", pageLimit);           
        }
        
        // Save the cat id to catID state for later use.
        setCatID(id);
        localStorage.setItem('CatID', id);

        // Reset the state for the Load more button if it is disabled.
        setLastCat(false);      

        try {
            await axios.get('/v1/images/search?limit='+pageLimit+'&breed_ids='+ id +'&api_key=live_hRdd9bMzP1BVOPsnxTT59jx3XTAD9DIaCcaY9WUCqcmkeVqQ1G63JEtX15gOFTlK').then((res) => {            
                setCats(res.data);                                
                // Persist the cats data 
                localStorage.setItem('saveCatBreed', JSON.stringify(res.data));                
            })   
        } catch (error) {                        
            setShowErrorMessage(true);
            setErrorMessage('Apologies but we could not load new cats for you at this time! Miau!');
            window.scrollTo({
                top: 0,                
                behavior: 'smooth'
            });
        }        

    },[cats]);

    const loadMore = async() => {        
        let counter;      
        let pageLimit;

        if (localStorage.getItem("counter") === null) {
           counter = limit + 3;           
           localStorage.setItem("counter", counter);
           pageLimit = counter;
        } else {
           pageLimit = Number(localStorage.getItem("counter")) + 3;
           localStorage.setItem("counter", pageLimit);           
        }
                  
        // Save the cat id to catID state for later use.
        setCatID(window.localStorage.getItem('CatID'));        

        try {            
            await axios.get('/v1/images/search?limit='+pageLimit+'&breed_ids='+ catID +'&api_key=live_hRdd9bMzP1BVOPsnxTT59jx3XTAD9DIaCcaY9WUCqcmkeVqQ1G63JEtX15gOFTlK').then((res) => {                     
                setCats(res.data); 
                
                // Persist the cats data 
                localStorage.setItem('saveCatBreed', JSON.stringify(res.data));                
                
                localStorage.setItem("catLength", res.data.length);
                let catLength = Number(localStorage.getItem('catLength'));
                let counter = Number(localStorage.getItem('counter'));

                // Hides the Load more button if the set of cat data returned is less than 10.
                if(catLength < counter ) {
                    setLastCat(true);                    
                }                
            })   
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage('Apologies but we could not load new cats for you at this time! Miau!');
            window.scrollTo({
                top: 0,                
                behavior: 'smooth'
            });
        }     
    }  
   
    // This is used to persist the CatID upon page refresh
    // If any page is refreshed this will retain the CatID state allowing users to click the Load more and Select Breed input fields and load new API response

    useEffect(() => {
      if(localStorage.getItem('CatID') === null){
        console.log('No catID yet');
      } else if(localStorage.getItem('CatID') !== null) {
        setCatID(localStorage.getItem('CatID'));        
      }     
    }, []);

    // This is used to persist the CatID upon page refresh
    // If any page is refreshed this will retain the CatBreed state allowing to load images and details in the homepage upon clicking the Back button from
    // the cat page.

    useEffect(() => {
      if(localStorage.getItem('saveCatBreed') === null ) {
        console.log('No save catbreeds yet');
      } else if (localStorage.getItem('saveCatBreed') !== null) {
        setCats(JSON.parse(localStorage.getItem('saveCatBreed')));        
      }
    }, []);

  return (
    <div className="App">
      <CatContext.Provider 
        value={{ getCats, cats, setCats, errorMesage, showErrorMessage, setShowErrorMessage, lastCat, catDetails, setCatDetails, catBreed, setCatBreed, catID }} >            
        <Router basename='/cat-browser'>
          <Routes>
            <Route exact path='/' element={<Home changeBreed={ changeBreed } loadMore={ loadMore } />} />            
            <Route path={`/${catID}`} element={<Cat />} />
          </Routes>
        </Router>  
      </CatContext.Provider>    
    </div>
  );
}

export default App;
