
const config = require('./../config.json')

const Header = (props) => {

    return (
        <div>
            <header>
                <div className='header-logo-container'>  
                    <h1><a href='http://192.168.1.50:3000/dashboard'> ARUGA </a></h1>
                </div>
                <div className='header-category-container'>
                    <ul>
                        <li><a href=''>{props.home} </a></li>
                        <li><a href=''>{props.contact} </a></li>
                        <li><a href='/postjob'>{props.second}  </a></li>
                        <li><a href=''> {props.email} </a></li>
                        <li><a href='/logout'>{props.logout}</a></li>
                    </ul>
                </div>
            </header>
        </div>
    )

}

export default Header;