import './comments.css'
import axios from 'axios'
import Comment from './comment'
import CommentForm from './commentsForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const deleteComment = async (commentId) => {
    const res = await axios.delete(`https://nestjs-peach.vercel.app/comments/${commentId}`).then((res) => res.data)
}

const Comments = ({ pinId }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['comments', pinId],
        queryFn: () => axios.get(`https://nestjs-peach.vercel.app/comments?pinId=${pinId}`).then((res) => res.data)
    })

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (commentId) => deleteComment(commentId),
        onSuccess: ( commentId) => {
            queryClient.invalidateQueries({ queryKey: ['comments', pinId] })
        }
    })

    const deletefn = (commentId) => { mutation.mutate(commentId) }

    return (
        <div className="comments">
            <div className="commentList">
                <span className="commentCount">{data?.length === 0 ? 'no comments' : data?.length + " " + "comments"}</span>
                {/* cCOMMENT */}
                {data?.map((comment) => (<Comment key={comment._id} deletefn={deletefn} comment={comment} />))}
            </div>
            <CommentForm pinId={pinId} />
        </div>
    )
}

export default Comments;