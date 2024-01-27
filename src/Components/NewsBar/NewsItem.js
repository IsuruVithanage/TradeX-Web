import image from '../../Assets/Images/image.jpg'
import './NewsItem.css'


const NewsItem = ({title,description,src,url}) => {
  return (
    <a href={url}>
        <div className='newsbar-container'>
            <div className='img-container'>  <img src={src?src:image}  alt="..."/></div>
            <div className='desc-container'>
                <h1>{title}</h1>
                <p>{description?description.slice(0,90):"In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
            </div>
            <div className='foter-bar'></div>
        </div>
        </a>
  
  )
}
export default NewsItem