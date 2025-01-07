import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProps {
    username: string;
    password: string;
    email : string;
}

interface User {
    User: UserProps[];
    AllRegisterUser: UserProps[];
}

// Safely retrieve user data from localStorage
let userLogged: UserProps[] = [];
if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('loggedUser');
    userLogged = userInfo ? JSON.parse(userInfo) : [];
}

let allUsers: UserProps[] = [];
if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('all_register_user');
    allUsers = userInfo ? JSON.parse(userInfo) : [];
}

// Define the initial state
const initialState: User = {
    User: userLogged,
    AllRegisterUser: allUsers,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoggedUser(state, action: PayloadAction<UserProps>) {
            state.User.push(action.payload);
            localStorage.setItem('loggedUser', JSON.stringify(state.User));
        },
        AllRegisterUser(state, action: PayloadAction<UserProps>){
            state.AllRegisterUser.push(action.payload);
            localStorage.setItem('all_register_user', JSON.stringify(state.AllRegisterUser));
        },
        removeUser(state){
            state.User = [];
            localStorage.setItem('loggedUser', JSON.stringify(state.User));
        }
    },
});

export const { LoggedUser,AllRegisterUser,removeUser } = userSlice.actions;
export default userSlice.reducer;
