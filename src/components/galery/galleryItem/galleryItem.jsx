import './galleryItem.css'
import { Link } from 'react-router'
import Image from '../../image/image';

const GalleryItem = ({ pin }) => {

  const optimizedHeight = (225 * pin.height) / pin.width
  return (
  <div className="" style={{ gridRowEnd: `span ${Math.ceil(pin.height / 100)}` }}>
    <div className="galleryItem" >
      <Image path={pin.media} w={225} h={optimizedHeight} />

      <Link to={`/pin/${pin._id}`} className='overlay' />

      <button className='savebutton'>save</button>
      <div className="ovarlayicons" >
        <button>
          <img src="/general/share.svg" alt="" />
        </button>
        <button>
          <img src="/general/more.svg" alt="" />
        </button>

      </div>

    </div >
    <div className="inform">
      <div className="tags">{pin.tags && pin.tags.map((tag, i)=><div key={tag[i]}className="tags">{tag}</div>)}</div>  
      <div className="pinTitle">{pin.title}</div>
      <div className="pinDesc">{pin.description}</div>
    </div>
  </div>
  )
}

export default GalleryItem;
// style={{gridRowEnd: `span ${Math.ceil(item.height/100)}`}}
