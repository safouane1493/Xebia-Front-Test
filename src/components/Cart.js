import React, { useState, useEffect } from 'react';

const Cart = props => {

    const [commercialOffers, setCommercialOffers] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    var isbnValues = []

    useEffect(() => {
        var total = 0
        props.Cart.map(book => total += book.price)
        setTotalPrice(total)
        isbnValues = props.Cart.map(book => book.isbn)
        let StringIsbn = isbnValues.join(',')

        fetch(`http://henri-potier.xebia.fr/books/${StringIsbn}/commercialOffers`)
            .then(response => response.json())
            .then(response => setCommercialOffers(response))
            .catch(response => console.log("erreur fetching IsbnValues"))

    }, [props.Cart])

    if (commercialOffers !== null) {
        var percentage = totalPrice * commercialOffers.offers[0].value / 100
        if (isbnValues.length > 1) {
            let minus = commercialOffers.offers[1].value
            let slice = (totalPrice / commercialOffers.offers[2].sliceValue) + ''
            let sliceNum = parseInt(slice.split('.')[0]) * commercialOffers.offers[2].value
            var bestDiscount = Math.max(percentage, minus, sliceNum)
        } else {
            bestDiscount = percentage
        }

    }


    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <p>Panier:</p><br />
                <p>Prix total : <strike>$ {totalPrice}</strike> <b>$ {totalPrice - bestDiscount}</b></p>
            </div>
            <div className="row" style={{ width: '100%' }}>
                {(props.Cart != []) ? props.Cart.map(book => {
                    const { title, cover } = book;

                    return (< div className="col-md-3 col-sm-6 col-lg-3 col-xl-2" >
                        <img className="card-img-top" src={cover} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: '0.8rem' }}>{title}</h5>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger" style={{ width: '100%' }}
                                onClick={() => props.removeBook(book)}>
                                X
                        </button>
                        </div>
                    </div >);

                }) : 'Paner vide'}
            </div>
        </>



    );
}

export default Cart;
