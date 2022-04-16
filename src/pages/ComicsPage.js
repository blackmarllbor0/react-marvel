import {Helmet} from "react-helmet";

import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
  return (
      <>
          <Helmet>
              <meta name={'Comics Page'}
                    content={'Page with list of our comics'}
              />
              <title> Comics Page  </title>
          </Helmet>
          <AppBanner/>
          <ComicsList/>
      </>
  );
};

export default ComicsPage;