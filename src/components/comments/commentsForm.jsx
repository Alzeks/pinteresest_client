import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import useAuthStore from "../../utils/authStore";

const addComment = async (comment) => {
    const res = await axios.post(`https://nestjs-peach.vercel.app/comments`, comment,
        { headers: {'Access-Control-Allow-Origin': '*'}}
    )
    return res.data
}

const CommentForm = ({ pinId }) => {
    const { currentUser } = useAuthStore()
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')

    const saveMessage = async () => {
        if (desc === '') return null
        mutation.mutate({pinId, desc, username: currentUser.username })
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', pinId] })
            setDesc('');
            setOpen(false)
        }
    })

    const handleEmojiClick = (emoji) => {
        setDesc((prev) => prev + '' + emoji.emoji + '');
        setOpen(false)
    }
  
    return (
        <div className="">
            <form className='commentForm' >
                <input onChange={(e) => setDesc(e.target.value)}
                    type="text" placeholder='add a comment' value={desc} />

                <div className="emoji">
                    <div className="" onClick={() => setOpen((prev) => !prev)}>😊</div>
                    {open && <div className="emojiPicker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>}
                </div>
            </form>
            <button onClick={saveMessage}
            disabled={mutation.isPending}>sand message</button>
        </div>
    )
}

export default CommentForm;