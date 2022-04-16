import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";

import './singleComic.scss';

const SingleComicPage = ({ data }) => {
    const navigate = useNavigate();
    const { title, description, pageCount, thumbnail, language, price } = data;

    const prices = price === 'not available' ? 'There is no price' : `${price}$`;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name={'Comics Page'}
                      content={`${title} comics book`}
                />
                <title>{ title }</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name"> {title} </h2>
                <p className="single-comic__descr"> {description} </p>
                <p className="single-comic__descr"> {pageCount} </p>
                <p className="single-comic__descr"> {language} </p>
                <div className="single-comic__price"> {prices} </div>
            </div>
            <a style={{cursor: 'pointer'}} onClick={() => navigate(-1)} className="single-comic__back"> Back to all </a>
        </div>
    );
};
export default SingleComicPage;