
import {ReactSession} from 'react-client-session';

const Logout = () => {


    ReactSession.remove("email");
    window.location.href="http://localhost:3000"

}

export default Logout;