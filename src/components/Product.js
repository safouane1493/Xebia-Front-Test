import React from 'react';


const Product = props => {
    const { title, cover, synopsis, price } = props.Product;


    return (

        < div className="col-md-3 col-sm-6 col-lg-3 col-xl-2" >
            <img className="card-img-top" src={cover} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '0.8rem' }}>{title}</h5>
                <p className="card-text" style={{ fontSize: '0.4rem' }}>{synopsis}</p>
            </div>
            <div className="card-footer">

                <button className="btn btn-success" style={{ fontSize: '0.8rem' }}
                    onClick={() => props.addBook(props.Product)}>
                    + Price : $ {price}
                </button>
            </div>
        </div >


    );
}

export default Product;
