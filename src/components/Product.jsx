
import Image from './Image';

export default function Product({ data }) {
    return (
        <div>
            <Image img={data.image} class='listSlide'/>
            <p>{data.title}</p>
            <p>{data.Author}</p>
        </div>
    );
}