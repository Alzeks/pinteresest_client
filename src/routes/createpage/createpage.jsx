import axios from 'axios';
import Image from '../../components/image/image';
import './createpage.css'
import useAuthStore from '../../utils/authStore'
import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react';
import Editor from '../../components/editor/editor'
import { imgkitUpload } from '../../utils/imgUpload';

const Createpage = () => {
    const [file, setFile] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')

    const { currentUser } = useAuthStore()
    const navigate = useNavigate()
    const formRef = useRef()

    useEffect(() => {
        if (!currentUser) { navigate('/auth') }
    }, [navigate, currentUser])

    const previewImgURL = file ? URL.createObjectURL(file) : null

    const hanleSubmit = async () => {
        if (isEdit) {
            setIsEdit(false)
        } else {

            const formData = new FormData(formRef.current)
             const imgUrl = await imgkitUpload(formData, file)
            console.log(imgUrl);

            let tagsString = formData.get('tags');

            const data = Object.fromEntries(formData);
            data.username = currentUser.username;
            data.media = imgUrl;
            data.width = 1200;
            data.height = 1400;
            data.tags = tagsString.split(',').map((tag) => tag.trim())

            try {
                const res = await axios.post('https://nestjs-peach.vercel.app/pins', data,
                   { headers: {'Access-Control-Allow-Origin': '*'}}
                    //{ headers: { 'Content-Type': 'multipart/form-data' } },//for file-formdata 
                )
            } catch {
                (err) => { console.log(err) }
            }
        }
    }
    return (
        <div className="createPage">
            <div className="createTop">
                <h1 className=''>{isEdit ? 'Design your  pin' : 'Create Pin'}</h1>
                <button className='' onClick={hanleSubmit}>
                    {isEdit ? 'Done' : 'Publish'}</button>
            </div>
            {isEdit ? <Editor /> : (
                <div className="createBottom">
                    {previewImgURL ? (
                        <div className="preview">
                            <img src={previewImgURL} alt="" />
                            <div className="editIcon" onClick={() => setIsEdit(true)}>
                                <Image path='/general/edit.svg' />
                            </div>
                            <div className="deleteIcon" onClick={() => setFile(null)}>
                                <Image path='/general/delete.svg' />
                            </div>
                        </div>
                    ) :
                        (<> <label htmlFor='file' className="upload">
                            <div className="uploadTitle">
                                <Image path='/general/general/upload.svg' alt='' />
                                <span>Choose a file</span>
                            </div>
                            <div className="uploadInfo">
                                to 20mmb .jpg or to 200mb .mp4
                            </div>
                        </label>
                            <input type="file" id='file' hidden
                                onChange={(e) => setFile(e.target.files[0])} /></>
                        )
                    }
                    {/* <form className='createForm' onSubmit={hanleSubmit}> */}
                    <form className='createForm' ref={formRef}>
                        <div className="createFormItem" />
                        <label htmlFor=''>Title</label>
                        <input type="text" placeholder='Add a titlle' name='title' id='title' />
                        <div />

                        <div className="createFormItem" />
                        <label htmlFor=''>Description</label>
                        <textarea rows={6} type="text" placeholder='Add a description' name='description' id='description' />
                        <div />

                        <div className="createFormItem" />
                        <label htmlFor=''>Link</label>
                        <input type="text" placeholder='Add a link' name='link' id='link' />
                        <div />

                        <div className="createFormItem" />
                        <label htmlFor=''>Board</label>
                        <select name="board" id="board">
                            <option >Choose a board</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <div />

                        <div className="createFormItem" />
                        <label htmlFor=''>Tagged</label>
                        <input type="text" placeholder='Write tags from body text using "," ' name='tags' id='tags' />
                        <small>dont worr&apos;y about</small>
                        <div />
                    </form>

                </div>
            )}
        </div>
    )
}

export default Createpage;