
const config = require('./../config.json')

const Header = () => {

    return (
        <div>
            <header>
                <div className='header-logo-container'>  
                    <h1> Aruga </h1>
                </div>
                <div className='header-category-container'>
                    <ul>
                        <li><a href=''>Home </a></li>
                        <li><a href=''>About Us </a></li>
                        <li><a href=''>Contact Us  </a></li>
                    </ul>
                </div>
            </header>
        </div>
    )

}

export default Header;