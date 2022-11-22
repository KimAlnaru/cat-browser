import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CatContext } from "../../Contexts/CatContext";

function Cat() {

  // Destructure the variable from the CatContext that we pass from Home.js
  const { catBreed, catDetails, setCatBreed, setCatDetails } = useContext(CatContext);
  
// Persist the State upon refresh
// This is used to retain the catBreed that was selected upon clicking the View Details button in the cat grids.

  useEffect(() => {
    if (catBreed.length > 0) {
        localStorage.setItem('catDetails', catDetails);
        localStorage.setItem('catBreed', JSON.stringify(catBreed));          
    } else if (catBreed.length <= 0) {
        setCatDetails(localStorage.getItem('catDetails'));
        setCatBreed(JSON.parse(localStorage.getItem('catBreed')));        
    }
  }, []);
    
  return (
    <div className='container mt-4 mb-4'> 
        {
            catBreed.length > 0 
            ?
            catBreed.map((cat) => (              
                <Card className='m-auto' key={cat.id}>
                    <Card.Header className='text-left'>
                        <Link to='/'>
                            <Button variant="primary">Back</Button>
                        </Link>
                    </Card.Header>
                    <Card.Img variant="top" src={catDetails} />           
                    <Card.Body className='text-left'>                
                        <Card.Title className='h3'>{ cat.name }</Card.Title>
                        <Card.Text className='h4'>{ cat.origin }</Card.Text>
                        <Card.Text className='h6'>{ cat.temperament }</Card.Text>
                        <Card.Text className=''>{ cat.description }</Card.Text>                                                                                                                              
                    </Card.Body>
                </Card>    
            ))
            : 'Loading'
        }        
    </div>
  )
}

export default Cat