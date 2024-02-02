import image from '../../Assets/Images/image.jpg'
import './NewsItem.css'
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";



const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className='newsbar-container'>

      <div className='img-container'>  <img src={src ? src : image} alt="..." /></div>
      <div className='desc-container'>
        <div style={{display:"flex"}}>
            <div className='news-header-container'>
              <a href={url}>
                <h1>{title}</h1>
              </a>
              <p>{description ? description.slice(0, 90) : "In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
            </div>
            <div className='favorite-icon-container'><FaRegHeart /></div>
        </div>

        <div className='like-icon-container'><AiOutlineDislike /><AiOutlineLike />

</div>

        <div className='foter-bar'>
          <p>1 day</p>
        </div>
      </div>

    </div>


  )
}
export default NewsItem