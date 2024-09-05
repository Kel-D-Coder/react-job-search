import { AppBar, Toolbar } from "@mui/material"
import logo from '../img/Jobber_20240728_204447_0000-removebg-preview.png'

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar className="bg-white">
                <img src={logo} alt="" className="h-20 w-auto" />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar