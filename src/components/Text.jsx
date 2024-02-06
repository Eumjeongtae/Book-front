import Image from './Image';
export default function Text({message}) {
    return (
        <div className="txtBox">
            <Image url='./img/textBox.png' text='text' />
            <p>{message}</p>
        </div>
    )
}