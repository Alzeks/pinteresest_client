//import { useQuery } from "@tanstack/react-query";
import Image from "../image/image";
import './postinteract.css'
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../utils/authStore";

const PostInterAct = ({ pinId, data }) => {
    const [open, setOpen] = useState(false)
    const [saveAllowed, setSaveAllowed] = useState(true)
    const { currentUser } = useAuthStore()


    const deletePin = async () => {
        const res = await axios.delete(`https://nestjs-970vim15a-alzeks-projects.vercel.app/pins/${pinId}`)
        console.log(res.data);
        setOpen(false)
    }

    useEffect(() => {
        if (data.username === currentUser.username) { setSaveAllowed((prev) => prev = false) }
    }, [])

    const savePin = async () => {
        const currentUserPin = { ...data }
        delete currentUserPin._id
        currentUserPin.username = currentUser.username

        try {
            const res = await axios.post('https://nestjs-970vim15a-alzeks-projects.vercel.app/pins', currentUserPin,
            )
            console.log(res.data);

        } catch {
            (err) => { console.log(err) }
        }
    }

    return (
        <div className="postInterAct">
            <div className="interActIcons">
                <Image path='/general/react.svg' alt='' />
                273
                <Image path='general/share.svg' alt='' />
                <Image path='general/more.svg' alt='' />
                <div className="option">
                    <img src='/general/delete.svg' alt='' onClick={() => setOpen(!open)} id="delete"/>
                    {open && (<div className="deletePin" onClick={deletePin}>Are you shure to delete the Pin</div>)}
                </div>
            </div>
            {saveAllowed && <button onClick={savePin} >Save</button>}
        </div>
    )
}

export default PostInterAct;