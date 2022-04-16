import {  Fragment, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {Link} from "react-router-dom";

import './charInfo.scss';
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);
    const { getCharacter, clearError, process, setProcess } = useMarvelService();
    useEffect(() => updateChar(), [charId]);
    useEffect(() => setProcess('waiting'), []);

    const updateChar = () => {
        clearError();
        if (!charId) return;
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    };

    const onCharLoaded = char => setChar(char);

    return (
        <div className="char__info">
            { setContent(process, View, char) }
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ?
        { 'objectFit': 'contain' } : { 'objectFit': 'cover' };
    
    return (
        <Fragment>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Sorry, this character doesn't have his own comics"}
                { comics.map((item, index) => {
                    const id = item.resourceURI.slice(43);
                    // eslint-disable-next-line
                    if (index > 9) return;
                    return <li className="char__comics-item" key={index}>
                        <Link to={`/comics/${id}`}>
                            {item.name}
                        </Link>
                    </li>
                }) }
            </ul>
        </Fragment>
    );
}

CharInfo.propTypes = {
    charId: propTypes.number
}

export default CharInfo;