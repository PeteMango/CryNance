const client_secret = process.env.client_secret
const AUTH_URL = "https://id.worldcoin.org/authorize?client_id=app_staging_0af5473e8e0e5c8eae581173d8a04603&client_secret=${client_secret}&response_type=code&redirect_uri=http://localhost:3000/#/"

const Navbar = () => {
    return (
        <>
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                
                <div class="navbar-end">
                    <button onClick={() => signIn()}>sign in to the fucking thing tht doesnt work </button>
                    <a href = {AUTH_URL} class="btn">Login</a>
                </div>
            </div>      
        </>
    )
}
export default Navbar;