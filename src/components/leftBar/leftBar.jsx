import "./leftBar.css"
import { Link } from "react-router";
import Image from "../image/image";
import useAuthStore from '../../utils/authStore'

const LeftBar = () => {
    const { currentUser } = useAuthStore()
    return (<>
        {currentUser  && <div className="leftBar">
          <div className="menuIcons">
                <Link to='/' className='menuIcon'>
                    <img src="/general/logo.png" alt="" className='logo' />
                </Link>
                <Link to='/' className='menuIcon'>
                    <img src="/general/home.svg" alt="" />
                </Link>
                <Link to='/createpage' className='menuIcon'>
                    <img src="/general/create.svg" alt="" />
                </Link>
                <Link to='/' className='menuIcon'>
                    <img src="/general/updates.svg" alt="" />
                </Link>
                <Link to='/' className='menuIcon'>
                    <img src="/general/messages.svg" alt="" />
                </Link>
            </div>
            <Link to='/' className='menuIcon'>
                <img src="/general/messages.svg" alt="" />
            </Link>
        </div>}
  </>  )
}

export default LeftBar;