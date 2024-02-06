import { createSlice } from "@reduxjs/toolkit"

let items = createSlice({
  name: 'data',

  initialState: {
    img: '',
    imgBack: '',
    name: '',
    myName: '',
    list: []
  },


  reducers: {
    select(state, action) {
      state.img = action.payload.img;
      state.imgBack = action.payload.imgBack;
      state.name = action.payload.name;
      state.myName = "";
    },
    onChange(state, action) {
      state.myName = action.payload;
    },
    addList(state, action) {

    }
  }
})

export const { select, onChange ,addList} = items.actions

export default items.reducer;

//const items =  {img : '',imgBack : '',name :'',myName : ''}
/*
export default function reducer(state = items, action) {
  if (action.type === 'select') {
    return {img : action.img,imgBack : action.imgBack,name :action.name,myName :''}
  }
  else if (action.type === 'onChange') {
    return {...state,myName:action.myName}
  } 

  return state
}
 */


