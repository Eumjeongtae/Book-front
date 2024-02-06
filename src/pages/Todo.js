import { useEffect, useState } from "react";
import Image from "../components/Image";
import '../style/main/main.css';
import TextInput from "../components/TextInput";

export default function Todo(params) {
  const [todoPokemon , setTodoPokemon] = useState({});
  useEffect(() => {
    let myPet = localStorage.getItem('myPokemon')
    setTodoPokemon(JSON.parse(myPet))
  }, []);

  return(
    <div className="status">

      <Image url={todoPokemon.img} />
      <p className="name">{todoPokemon.myName}</p>
      <TextInput message='계획이 무엇인가요?!' type = 'todo' />
    </div>
  )
}