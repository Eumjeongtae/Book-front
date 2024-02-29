export default function Image(props) {
    console.log(props.img);
    return (
        <img
            src={`http://localhost:8000/${props.img ? props.img : 'imgupload/noimage.jpg'}`}
            alt=""
            className={props.class && props.class}
        />
    );
}
