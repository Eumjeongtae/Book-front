export default function Image(props) {
    return (
        <>
            <img src={`http://localhost:8000/imgupload/${props.img}`} alt="" className={props.class && props.class}/>

        </>
    );
}