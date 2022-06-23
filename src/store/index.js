import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'chatRoom',
    storage: window.localStorage
});

export default createStore({
    plugins: [vuexPersist.plugin],
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
