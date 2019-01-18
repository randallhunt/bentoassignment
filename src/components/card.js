import React from 'react';
import MyLoader from './loader';

export default function Card(props) {
    if (props.loading) {
        return MyLoader;
    }

    let classes = '';
    if (!props.single) {
        classes = 'star' + (props.favorite ? ' fave' : '');
    }

    return (
        <div className="card" onClick={props.onClick} id={props.id}>
            <span className={classes} onClick={props.onFavoriteClick} />
            <img src={props.url} alt="cat" width={300} />
            <p className="fact">{props.fact}</p>
        </div>
    );
}
  