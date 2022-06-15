import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            messages: [],
            typing:false
        }
    },
    getters:{
        messages(state){
            return state.messages;
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
        }
    }
})
