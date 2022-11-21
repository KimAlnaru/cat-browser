
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { CatContext } from '../../Contexts/CatContext';

function Input({ changeBreed }) {

    // Destructure the variable from the CatContext that we pass from Home.js
    const { getCats, catID } = useContext(CatContext); 

    return(
        <div className='row' style={{ padding: "10px 0px" }}  >
            <Form>
                <Form.Group className="col-md-3 col-sm-6 col-12 text-left pl-0" controlId="cat-breed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Select aria-label="Cat Breed" value={catID} onChange={(e) => changeBreed(e.target.value)}>
                        <option>Select Breed</option>
                        {getCats.length > 0 ? 
                        getCats.map((cat) => (
                            <option value={cat.id} key={cat.id}>{cat.name}</option>
                        )) 
                        : <option disabled>No cats available</option>  }                  
                        
                    </Form.Select>
                </Form.Group>
            </Form>
        </div>        
    )
}

export default Input;