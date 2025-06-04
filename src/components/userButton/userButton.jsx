import { useState } from 'react'
import './userButton.css'
import { Link } from 'react-router'
import useAuthStore from '../../utils/authStore'
import Image from '../image/image'
import UserImgUpload from './userImgUpload'

const UserButton = () => {
    const [open, setOpen] = useState(false)
    const [openLoader, setOpenLoader] = useState(false)
    const { currentUser, setCurrentUser, removeCurrentUser } = useAuthStore()
    //removeCurrentUser()//the same

    const handleClick = () => {
        setOpenLoader((prev) => !prev)
    }
    return currentUser ? (
        <div className="userButton">
            <div className="image">
                <Image path={currentUser.img ? currentUser.img : "/general/noAvatar.png"} w={32} h={32} className='image1' />
            </div>
            <img src="/general/arrow.svg" alt="" className='arrow'
                onClick={() => setOpen((prev) => !prev)} />
            {open &&
                <div className="userOptions">
                    <Link to={`/profilepage/${currentUser.username}`} className="userOption">Profile</Link>
                    <div className="userOption" onClick={handleClick}>Image</div>
                    <div className="userOption" >Setting</div>
                    <div onClick={() => setCurrentUser(null)} className="userOption">Logout</div>
                    {openLoader && <UserImgUpload userid={currentUser._id} />}
                </div>
            }
        </div>
    ) : (<div className="authButtons">
        <Link to='/auth' className='loginLink'>Login</Link>
        <Link to='/auth' className='loginLink'>SignUp</Link>
    </div>
    )
}

export default UserButton;