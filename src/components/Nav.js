import React, { useState } from 'react';


const Nav = props => {
    const [searchValue, setSearchValue] = useState(null)


    return (


        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                onChange={(event) => setSearchValue(event.target.value)} />
            <button className="btn btn-outline-success my-2 my-sm-0"
                onClick={(event) => {
                    event.preventDefault();
                    return props.searchBook(searchValue)
                }}>
                Search
                    </button>
        </form>


    );
}

export default Nav;
