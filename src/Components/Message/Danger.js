import React, {useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { CatContext } from "../../Contexts/CatContext";

function Danger() {

  const { errorMesage, showErrorMessage, setShowErrorMessage } = useContext(CatContext);
  
  if(showErrorMessage) {
    return (
      <div className='mt-4 col-sm-12 col-md-6 p-0'>
        <Alert variant="danger" onClose={() => setShowErrorMessage(false)} dismissible className=''>        
          <p className='mb-0'>{errorMesage}</p>
        </Alert>
      </div>
    )
  }
}

export default Danger;