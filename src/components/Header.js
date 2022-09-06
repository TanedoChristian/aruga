
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
                        <li><a href=''>Home </a></li>
                        <li><a href=''>About Us </a></li>
                        <li><a href=''>Contact Us  </a></li>
                        <li><a href=''> {props.email} </a></li>
                    </ul>
                </div>
            </header>
        </div>
    )

}

export default Header;