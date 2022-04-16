import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMesage/ErrorMessage";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting' : return <Spinner/>;
        case 'loading' : return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed': return <Component/>;
        case 'error' : return <ErrorMessage/>;
        default : throw new Error('Unexpected process state');
    }
}

export default setContent;