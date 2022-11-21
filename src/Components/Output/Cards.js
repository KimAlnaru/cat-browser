import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { CatContext } from "../../Contexts/CatContext";
import { useContext } from 'react';
// import {useHistory} from 'react-router-dom';

function Cards({ id, url, breeds }) {

  const { setCatDetails, setCatBreed } = useContext(CatContext);
  // const history = useHistory();

  const saveCatDetails = (url, breeds) => {
    setCatDetails(url);
    setCatBreed(breeds);  

    
    // history.push(`/cat-browser/cat?q=${breeds}`);
    console.log(breeds);
  }
  
  return (
    <Card key={id} className="mb-5">
      <Card.Img variant="top" src={url} alt={id}/>
      <Card.Body>
        <Link to='/cat-browser/cat'>
          <Button className='w-100' variant="primary" onClick={() => saveCatDetails(url, breeds)}>View Details </Button>
        </Link>       
      </Card.Body>
    </Card>
  );
}

export default Cards;