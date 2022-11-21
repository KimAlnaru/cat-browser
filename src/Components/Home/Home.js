import 'bootstrap/dist/css/bootstrap.min.css';
import Title from '../Header/Title';
import Grid from '../Output/Grid';
import Input from '../Select/Input';
import Paginate from '../Pagination/Paginate';
import Danger from '../Message/Danger';

function Home({ changeBreed, loadMore }) {    
    return(
       <div className='container mt-3 mb-3'>                
        <Danger/>
        <Title/>
        <Input changeBreed={ changeBreed } />
        <Grid />
        <Paginate loadMore={ loadMore }/>                                                                                 
       </div>    
    )
}

export default Home;