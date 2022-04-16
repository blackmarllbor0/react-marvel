import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../../pages/MainPage";
import ComicsPage from "../../pages/ComicsPage";
import Page404 from "../../pages/404";
import SingleComicPage from "../../pages/SingleComicPage/SingleComicPage";
import SinglePage from "../../pages/SinglePage";
import SingleCharacterLayout from "../../pages/singleCharacterLayout/singleCharacterLayout";

const App = () => {
    return (
        <Router basename="/react-marvel/">
            <div className="app">
                <AppHeader/>
                <main>
                   <Routes>
                       <Route path={'/'} element={<MainPage/>}/>
                       <Route path={'/comics'} element={<ComicsPage/>}/>
                       <Route end path={'/comics/:comicId'}
                              element={<SinglePage Component={SingleComicPage} dataType={'comic'} />}
                       />
                       <Route end path={'/characters/:id'}
                              element={<SinglePage Component={SingleCharacterLayout} dataType={'character'} />}
                       />
                       <Route path={'*'} element={<Page404/>}/>
                   </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;