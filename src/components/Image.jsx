export default function Image({ url,text }) {
    return (
        <>
            <img src={url} alt="" className={text && text}/>
        </>
    );
}