import axios from "axios";
import { useState } from "react";
import Image from "../image/image";
import { imgkitUpload } from "../../utils/imgUpload";


const UserImgUpload = ({ userid }) => {
    const [file, setFile] = useState(null)
    const [isUpload, setIsUpload] = useState(false)
    const previewImgURL = file ? URL.createObjectURL(file) : null
    
    const hanleSubmit = async () => {
  
        const formData = new FormData()
        const imgUrl = await imgkitUpload(formData, file)
        console.log(imgUrl);
        if (imgUrl) { setIsUpload(true) }
        formData.set("img", imgUrl);
        const data = Object.fromEntries(formData)

        try {
            const res = await axios.patch(`https://nestjs-peach.vercel.app/users/${userid}`, data)
            console.log(res.data);

        } catch {
            (err) => { console.log(err) }
        }
    }
    return (<div>
        (<form className="userimgupload">
            <label htmlFor='file' className="uploa">
                <div className="uploadTitle" >
                    <Image path='/general/general/upload.svg' alt='' />
                    {previewImgURL && (
                        <div className="preview" >
                            <img src={previewImgURL} alt="" onClick={hanleSubmit} />
                        </div>
                    )}
                    {isUpload && (<div className="">Uploaded</div>)}
                    <span>Choose a file</span>
                </div>
            </label>
            <input type="file" id='file' hidden
                onChange={(e) => setFile(e.target.files[0])} />
        </form>
        )
    </div>
    )
}

export default UserImgUpload;