

const FrontPage = () => {
    
    const moveToRegister = () => {
        window.location.href = "http://192.168.1.50:3000/register"
    }

    return (
        <div>
            <div className="front-page-container">
                <div className="front-page-wrapper">
                 
                <div className="front-page-logo-container">
                    <h1> ARUGA</h1>
                </div>
                <div className="front-page-option-container">
                    <div className="front-page-button-container"> 
                        <button> Sign In </button>
                        <button onClick={moveToRegister}> Sign Up </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )

}

export default FrontPage;