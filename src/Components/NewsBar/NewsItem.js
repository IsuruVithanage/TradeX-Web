import image from '../../Assets/Images/image.jpg'
import './NewsItem.css'


const NewsItem = ({title,description,src,url}) => {
  return (
        <div className='newsbar-container'>
          
            <div className='img-container'>  <img src={src?src:image}  alt="..."/></div>
            <div className='desc-container'>
              <a href={url}>
              <h1>{title}</h1>
              </a>
              <p>{description?description.slice(0,90):"In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
              <div className='foter-bar'>
                 1 day ago
              </div>
            </div>
            <div>
              
            </div>
            
        </div>
        
  
  )
}
export default NewsItem