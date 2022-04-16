import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ data }) => {
    const navigate = useNavigate();
    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name={'Comics Page'}
                      content={`${name} comics book`}
                />
                <title>{ name }</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <a style={{cursor: 'pointer'}} onClick={() => navigate(-1)} className="single-comic__back"> Back to all </a>
        </div>
    )
}

export default SingleCharacterLayout;