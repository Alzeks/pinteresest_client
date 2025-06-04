import { useQuery } from '@tanstack/react-query';
import Image from '../image/image';
import './boards.css'
import axios from 'axios';

//COLLECTION//
const Boards = ({username}) => {
    const {isPending, error, data} = useQuery({
        queryKey: ['boards', username],
        //`https://back-one-tau.vercel.app/pins?username=${username}`
        queryFn: () => axios.get(`https://nestjs-peach.vercel.app/pins?username=yu`).then((res)=>res.data)
        
    })

    if(isPending) return 'loading ...'
    if (error) return "error occurred" + error.message//useQuery
    if(data.length === 0) return 'you have no boards '
console.log(data);

    return (
        <div className="collections">
            <div className="collection">
                <Image path='/pins/pin1.jpeg' />
                <div className="collectiomInform" />
                <h1>Mini Bedrooms</h1>
                <span>12 Pins-img</span>
            </div>
        </div>
    )
}

export default Boards;