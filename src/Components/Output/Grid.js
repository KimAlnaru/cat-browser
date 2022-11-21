import React, { useContext } from "react";
import Cards from "./Cards";
import { CatContext } from "../../Contexts/CatContext";

function Grid() {

    const { cats } = useContext(CatContext);

    return(
        <div className="row mt-2">
            { cats.length > 0 
            ?
                cats.map(cat =>
                    <div key={cat.id} className="col-md-3 col-sm-6 col-12">
                        <Cards url={cat.url} id={cat.id} breeds={cat.breeds} />                
                    </div>
                )
            : <div className="col-md-3 col-sm-6 col-12 text-left"> No cats available </div>
            }
        </div>
    )
}

export default Grid;