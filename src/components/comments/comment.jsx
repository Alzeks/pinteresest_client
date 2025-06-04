
import axios from 'axios';
import Image from '../image/image'
import './comments.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Comment = ({ comment, deletefn}) => {


    return (
        <div className="comment">
            <Image path='/general/noAvatar.png' alt='img' />
            <div className="commentContent">
                <div className="userAndDelete">
                <span className='commentUsername'>{comment.username}</span>
                <button onClick={()=>deletefn(comment._id)}>delete</button>
                </div>
                <p className='commentText'>{comment.desc}</p>
                <span className='commentTime'>{comment.createdAt}</span>
            </div>
        </div>
    )
}

export default Comment