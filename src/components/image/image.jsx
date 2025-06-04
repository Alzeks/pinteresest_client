import { IKImage } from "imagekitio-react";

const Image = ({path, alt, className, w, h}) => {
    
    return (
        <IKImage
        urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
        path={path}
        transformation={[{
          h,
          w
        }]}
        alt=''
        loading='lazy'
        lqip={{active: true, quality: 20}}
      />  
    )
}
export default Image;