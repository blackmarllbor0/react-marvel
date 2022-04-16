import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import useMarvelService from "../services/MarvelService";
import AppBanner from "../components/appBanner/AppBanner";
import setContent from "../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
    const id = useParams();
    const [data, setData] = useState(null);
    const { getComics, getCharacter, clearError, process, setProcess } = useMarvelService();

    const navigate = useNavigate();

    useEffect(() => updateData(), [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id.comicId).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id.id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
        }
    }

    const onDataLoaded = (data) => setData(data);

    return (
        <>
            <AppBanner/>
            { setContent(process, Component, data) }
        </>
    )
};

export default SinglePage;