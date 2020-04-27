import React from 'react';

let StarRatings = (props) => {
    console.log(props);

    return (
        <React.Fragment>
            <div className={"ui star rating"} data-max-rating="1" data-rating="1">
                {[...Array(+props.max)].map((e, i) => {
                    return <i key={i} className={"icon" + (+props.rating > i ? " active" : "")} onClick={e => props.onStarClick && props.onStarClick(i)}></i>
                })}
            </div>
        </React.Fragment >
    )

}

export default StarRatings;