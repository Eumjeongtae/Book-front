import { useEffect, useState } from 'react';
import Image from './Image';
import { useDispatch, useSelector } from 'react-redux';
import { onChange } from '../modules/reducer';
export default function TextInput({ message, choicePokemon, type }) {
    const [inputTxt, setInputTxt] = useState('');
    const [date, setDate] = useState();
    const dispatch = useDispatch();
    let state = useSelector((state) => { return state.data })
    useEffect(() => {
        setInputTxt('')
    }, [state.name])

    const handleChoice = () => {
        if (type !== 'todo') {
            localStorage.setItem('myPokemon', JSON.stringify(state));
            choicePokemon(false)
        } else if (type == 'todo' && date && inputTxt) {

            var targetDate = new Date(date);
            var currentDate = new Date();

            // 날짜만 비교하기 위해 시, 분, 초, 밀리초를 모두 0으로 설정
            targetDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            // 타겟 날짜가 오늘보다 전날이면 true를 반환, 그렇지 않으면 false를 반환
            if (targetDate < currentDate) {
                alert('설정한 날짜가 오늘보다 전날입니다.');
            } else {
                // dispatch()
                setInputTxt('')

            }

        } else {
            alert('날짜와 할일을 모두 적어주세요!')
        }
    }

    const handleChange = (e) => {
        setInputTxt(e.target.value);
        //return dispatch({ type: 'onChange', myName: e.target.value })
        return dispatch(onChange(e.target.value))
    }
    return (
        <div className="txtBox">
            <Image url='./img/textBox.png' text='text' />
            <p>
                {message} : <input type="text" value={inputTxt} onChange={(e) => {
                    handleChange(e)
                }} placeholder='텍스트를 입력해주세요!' />
                {type && <input type="date" onChange={(e) => setDate(e.target.value)} />}
            </p>
            <button type='button' onClick={() => handleChoice()}>결정</button>
        </div>
    )
}