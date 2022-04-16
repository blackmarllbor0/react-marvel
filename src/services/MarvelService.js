import useHttp from "../hooks/http.hook";
import { API_KEY, API_URL } from "../config/config";

export default function useMarvelService() {

    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = API_URL;
    const _apiKey = API_KEY;
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(__transformComics);
    }

    const getComics = async id => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return __transformComics(res.data.results[0]);
    }

    const getCharacterByName = async name => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const _transformCharacter = char => ({
        id: char.id,
        name: char.name,
        description: char.description ? `${char.description.slice(0, 210)}...` : char.description ?
                     char.description = "" : 'There is no description for this character',
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    });

    const __transformComics = comics => ({
        id: comics.id,
        title: comics.title,
        description: comics.description,
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        language: comics.textObjects.language || 'en-us',
        price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
    });

    return {
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComics,
        getCharacterByName,
        process,
        setProcess
    };
}