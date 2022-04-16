import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import setContents from "../../utils/setContents";

import './comicsList.scss';

const ComicsList = () => {

    const [ comicsList, setComicsList ] = useState([]);
    const [ newItemLoading, setNewItemLoading ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const [ comicsEnded, setComicsEnded ] = useState(false);

    useEffect(() => onRequest( offset, true ), []);

    const { getAllComics, process, setProcess } = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onComicsListLoaded = comics => {
        let ended = false;
        if (comics.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...comics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    };

    const renderComics = arr => {
        const comics = arr.map((item, i) => {
            const {id, thumbnail, title, price} = item;
            return <li className="comics__item" key={i}>
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail}
                                 alt={title}
                                 className="comics__item-img"
                            />
                            <div className="comics__item-name">
                                {title}
                            </div>
                            <div className="comics__item-price">
                                {`${price}$`}
                            </div>
                        </Link>
                    </li>
        });
        return <ul className="comics__grid">
            {comics}
        </ul>
    };
    return (
        <div className="comics__list">
            { setContents(process, () => renderComics(comicsList), newItemLoading) }
            <button className="button button__main button__long"
                    style={{'display' : comicsEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;