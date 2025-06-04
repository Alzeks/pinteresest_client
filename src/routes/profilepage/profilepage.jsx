import { useState } from "react";
import Image from "../../components/image/image";
import './profilepage.css';
import Boards from "../../components/boards/boards";
import Gallery from "../../components/galery/galery";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from '../../utils/authStore';

const Profilepage = () => {
    const [type, setType] = useState('created')

    let { username } = useParams()
    const { currentUser } = useAuthStore()

    const { isPending, error, data } = useQuery({
        queryKey: ['profile', username],
        queryFn: () => axios.get(`https://nestjs-peach.vercel.app/users/${username}`).then((res) => res.data)
    })

    if (isPending) return 'loading ...'
    if (error) return "error occurred" + ' ' + error.message
    if (!data) return 'user not found '

    return (
        <div className="profilePage">
            <div className="userBlock">
                <div className="userInform">
                    <h1 className="profileName">{data.displayName}</h1>
                    <h1 className="profileName">{data.username}</h1>
                    <span className="profileUserName">{data.email}</span>
                    <div className="follow">20 fallovers</div>
                    <div className="profileInterActions">
                        <Image path='general/share.svg' />
                        <div className="profileButtons">
                            <button>Message</button>
                            <button>Follow</button>
                        </div>
                        <Image path='general/more.svg' />
                        
                    </div>
                </div>

                <div className="">
                    <Image path={data.img || 'general/noAvatar.png'} w={600} h={400} />
                </div>
            </div>

            <div className="profileOptions">
                <span className={type === 'created' ? 'active' : ''}
                    onClick={() => setType('created')}>Created</span>
                <span className={type === 'saved' ? 'active' : ''}
                    onClick={() => setType('saved')}>Saved</span>
            </div>
            {type === 'created' //& username === currentUser?.username 
                ?
                <Gallery username={data.username} /> 
                :
                <Boards username={data.username} />
            }
        </div>
    )
}

export default Profilepage;