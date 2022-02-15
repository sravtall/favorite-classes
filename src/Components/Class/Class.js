import "./Class.css"
import React from 'react';

function Class(props) {
    return (
        <div className="class">
            <p>{props.name}</p>
        </div>
    )
}

export default Class;