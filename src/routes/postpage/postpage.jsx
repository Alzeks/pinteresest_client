import { Link, useLocation, useParams } from "react-router";
import Image from "../../components/image/image";
import PostInterAct from "../../components/postinteract/postinteract";
import Comments from "../../components/comments/comments";
import './postpage.css'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Postpage = () => {
    const { id } = useParams()//pinId

    const { isPending, error, data } = useQuery({
        queryKey: ['pin', id],
        queryFn: () => axios.get(`https://nestjs-peach.vercel.app/pins/${id}`).then((res) => res.data)
    })
    const username = data?.username
    const { isUserPending, errorUser, dataUser } = useQuery({
        queryKey: ['user', username],
        queryFn: () => axios.get(`https://nestjs-peach.vercel.app/users/${username}`).then((res) => res.data)
    })

    if (isPending) return 'loading ...'
    if (error) return "error occurred" + '' + error.message
    if (!data) return 'pin not found'

    return (
        <div className="postpage">
            <svg hanging={20} width={20} viewBox="0 0 24 24" style={{ cursor: 'pointer' }}>
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.661258 2.59a2 2 0 1 1-2.82 2.02L1 12z"></path>
            </svg>
            <div className="postcontainar" >
                <div className="postimg">
                    <Image path={data && data.media} alt='' w={736} h={500} />
                </div>
                <div className="postditails">
                    <PostInterAct pinId={id} data={data} />
                    <a href="https://www.instagram.com" target="blank">{data.link}</a>
                    <div >
                        <h3 className="title">{data.title}</h3>
                        <div className="description">{data.description}</div>
                    </div>
                    <Link to={`/profilepage/${data.username}`} className="postuser">
                        <Image path={dataUser ? dataUser.img : 'general/noAvatar.png'} />
                        <span>{data.username}</span>
                    </Link>
                    <Comments pinId={id} />
                </div>
            </div>
        </div>
    )
}

export default Postpage;