import error from './error.gif';

const ErrorMessage = () =>
        <img src={error}
             alt="Error"
             style={style}/>
             
const style = {
    display: 'block',
    width: '250px',
    heigth: '250px',
    objectFit: 'contain',
    margin: '0 auto'
}

export default ErrorMessage;