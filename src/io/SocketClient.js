import {io} from "socket.io-client";
import $store from '../store'

export class Socket {
    constructor() {
        this.socket = io(import.meta.env.VITE_SOCKET_URL);
        this.messageBox = document.getElementById('messageBox');
        this.initialize();
    }
    initialize () {
        // 進入聊天室時，會收到之前的全部訊息，並更新到 vuex messages
        this.socket.on("allMessage", obj => {
            $store.commit('setMessage',obj);
            setTimeout(()=>{
                this.messageBox.scroll({
                    top: this.messageBox.scrollHeight,
                    behavior: 'smooth'
                });
            },200);
        });

        // 設定接收到新訊息的監聽器
        this.socket.on("newMessage", obj => {
            $store.commit('addMessage',obj);
            this.messageBox.scrollTop = this.messageBox.scrollHeight;
            setTimeout(()=>{
                this.messageBox.scroll({
                    top: this.messageBox.scrollHeight,
                    behavior: 'smooth'
                });
            },200);
        });

        this.socket.on("someoneIsTyping", value => {
            $store.commit('setTypeState',value);
        });
    }

    sendMessage(message) {
        this.socket.emit("sendMessage", message)
    }
    sendTyping() {
        this.socket.emit("sendTyping");
    }
}

