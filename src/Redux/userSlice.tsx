import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProps {
    username: string;
    password: string;
}

interface User {
    User: UserProps[];
}

// Safely retrieve user data from localStorage
let userLogged: UserProps[] = [];
if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('loggedUser');
    userLogged = userInfo ? JSON.parse(userInfo) : [];
}

// Define the initial state
const initialState: User = {
    User: userLogged,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoggedUser(state, action: PayloadAction<UserProps>) {
            state.User.push(action.payload);
            localStorage.setItem('loggedUser', JSON.stringify(state.User));
        },
        removeUser(state){
            state.User = [];
            localStorage.setItem('loggedUser', JSON.stringify(state.User));
        }
    },
});

export const { LoggedUser,removeUser } = userSlice.actions;
export default userSlice.reducer;
