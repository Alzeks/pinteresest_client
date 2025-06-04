import { useNavigate } from 'react-router';
import UserButton from '../userButton/userButton';
import './topBar.css'
import { useRef } from 'react'

const TopBar = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    let search = ''
    let step = 3
    const handleSubmit = (e) => { //  const formData = new FormData(formRef.current)
        e.preventDefault()
        search = e.target.value
        if (search.length > step) {
            step = step + 2
            navigate(`?search=${search}`)
        }
    }

    return (
        <div className="topbar">
            <img src="/general/pinterest.png" alt="" className='logos' />
            {/* SEARCH */}
            <form onSubmit={handleSubmit} className="search" ref={formRef}>
                <img src="/general/search.svg" alt="" />
                <input type="text" placeholder='search' onChange={handleSubmit} />
            </form>
            {/* USEER */}
            <UserButton />
        </div>
    )
}

export default TopBar;