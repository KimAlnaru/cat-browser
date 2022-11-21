import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { CatContext } from "../../Contexts/CatContext";


function Paginate({ loadMore }) {

  // Destructure the variable from the CatContext that we pass from Home.js
  const { cats, lastCat } = useContext(CatContext);
  
  if (!lastCat) {
    return (
      <div className='row mx-1 mt-5 mb-5'>
          <Button variant="success col-md-2" onClick={loadMore}  
            disabled={cats.length === 0 || cats.length < 10 || lastCat 
            ? true
            : false
            }>{cats.length > 0 ? 'Load more' : 'Loading cats..' }</Button>
      </div> 
    )
  }
}

export default Paginate