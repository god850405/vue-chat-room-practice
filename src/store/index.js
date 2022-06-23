import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            currentRoom:'全頻聊天室',
            messages: [],
            typing:false,
            darkMode:false
        }
    },
    getters:{
        currentRoom(state){
            return state.currentRoom;
        },
        messages(state){
            return state.messages;
        },
        darkMode(state){
            return state.darkMode
        }
    },
    mutations: {
        setMessage (state, data) {
            state.messages = data;
        },
        addMessage (state, data) {
            state.messages.push(data);
        },
        setTypeState (state, data){
            state.typing = data;
        },
        setDarkMode(state, data){
            state.darkMode = data;
        }
    }
})
