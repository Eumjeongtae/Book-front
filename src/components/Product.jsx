
import Image from './Image';

export default function Product({ data }) {
    return (
        <div>
            <Image img={data.image} class='listSlide'/>
            <p className='title'>{data.title}</p>
            <p className='author'>{data.Author}</p>
        </div>
    );
}