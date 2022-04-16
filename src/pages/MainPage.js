import {useState} from "react";
import {Helmet} from "react-helmet";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import CharSearchForm from "../components/CharSearchForm/CharSearchForm";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = id => setSelectedChar(id);

    return (
        <>
            <Helmet>
                <meta name="description"
                      content="Marvel information portal"
                />
                <title> Marvel information portal </title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>

            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;