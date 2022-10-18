import React from 'react';
import table from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
const Table = (probs) => {
    
    return (
        <table class="table">
        <thead class="thead-light">
            <tr>
                {
                    probs.columns.map((item)=>{
                        return(<th scope="col">{item}</th>)
                    })
                }
            
            </tr>
        </thead>
        <tbody>
            
            {
                    probs.data.map((item)=>{
                        return(
                            <tr>
                                {
                                    Object.values(item).map((value,i)=>(<td>{value}</td>)

                                    )
                                }

                                
                                
                            </tr>
                        )
                            
                        
                    })
            }

            
        </tbody>
        </table>
    );
};

export default Table;
