
import Image from './Image';

export default function Product(props) {
    return (
        <div >
            <Image img={props.data.image} class={props.class} />
            <div className='info'>
                <p className='title'>{props.data.book_name}</p>
                <p className='author'>{props.data.author}</p>
                {props.type === 'myPageHistory' &&
                    <>
                        <p className='rentDate'>대여일자  <span>2020-02-01</span>   </p>
                        <p className='returnDate'>반납일자  <span>2020-02-01</span>   </p>
                    </>
                }
                {props.type === 'myPageRentBook' &&
                    <>
                        <p className='rentDate'>반납 예정일  <span>2020-02-01</span> </p>
                        <p><button>반납하기</button></p>
                    </>
                }
                {
                    props.type === 'myPageDecision' &&
                    <>
                        <p className='rentDate'>재고 있음 </p>
                        {/* <p className='rentDate'>반납 예정일  <span>2020-02-01</span> </p> */}
                        <p><button>대여하기</button></p>
                    </>
                }
            </div>

        </div>
    );
}