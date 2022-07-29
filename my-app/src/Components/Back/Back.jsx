import BackContext from './BackContext';
import ProductsCrud from './Products/Crud';
import CatsCrud from './Categories/Crud';
import Nav from './Nav';



function Back({show}) {
    
    return (
        <BackContext.Provider value={{
   
           
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    
                   
            
                    </>
                    : show === 'products' ? <ProductsCrud/>: 
                        show === 'cats' ? <CatsCrud/> : null
            }
        </BackContext.Provider>
    )
}
export default Back;