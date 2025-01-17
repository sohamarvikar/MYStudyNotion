import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    signupData:null,
    token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
          setToken(state, value) {
            state.token = value.payload;
          }
    }
})

export const {setSignupData,setLoading,setToken} = authSlice.actions;

export default authSlice.reducer;