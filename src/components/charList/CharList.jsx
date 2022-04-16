import {useState, useEffect, useRef, useMemo} from 'react';
import propTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import setContents from "../../utils/setContents";

import './charList.scss';

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => onRequest(offset, true), []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharListLoaded = newCharList => {
        let ended = false;
        if (newCharList.length < 9) ended = true;

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = id => {
        itemRefs.current.forEach(item => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    const renderItems = arr => {
        const items = arr.map((item, index) => {
            const { name, thumbnail, id } = item;
            const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" ? {'objectFit': 'contain'} : {'objectFit': 'cover'};
            
            return (
                <CSSTransition key={id} timeout={500} classNames='char__item'>
                    <li className='char__item'
                        ref={element => itemRefs.current[index] = element}
                        onKeyPress={event =>  {
                            if (event.key === "" || event.key === "Enter") {
                                this.props.onCharSelected(id);
                                focusOnItem(index);
                            }
                        }}
                        onClick={() => {
                            onCharSelected(id);
                            focusOnItem(index);
                        }}>
                        <img src={thumbnail} alt={name} style={imgStyle} />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className='char__grid'>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    };

    const elements = useMemo(() => (
        setContents(process, () => renderItems(charList), newItemLoading)
    ), [process])

    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => onRequest(offset)}
            >
                <div className="inner">
                    load more
                </div>
            </button>
        </div>
    );
}

CharList.protoTypes = {
    onCharSelected: propTypes.func.isRequired
};

export default CharList;