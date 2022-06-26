import {io} from "socket.io-client";
import $store from '../store'

export class Socket {
    constructor() {
        this.socket = io(import.meta.env.VITE_SOCKET_URL);
        this.messageBox = document.getElementById('messageBox');
        this.initialize();
        this.addUser($store.state.userName);
    }
    initialize () {
        // 加入使用者錯誤
        this.socket.on("add-user-fail", message => {
            alert(message);
            $store.commit('clearUserName');
        });
        // 聊天室接收到新訊息的監聽器
        this.socket.on("room-brocast", obj => {
            $store.commit('addMessage',obj);
            this.messageBox.scrollTop = this.messageBox.scrollHeight;
            setTimeout(()=>{
                this.messageBox.scroll({
                    top: this.messageBox.scrollHeight,
                    behavior: 'smooth'
                });
            },200);
        });
        // 進入聊天室時，會收到之前的全部訊息，並更新到 vuex messages
        this.socket.on("get-room-all-message", obj => {
            $store.commit('setMessage',obj);
            setTimeout(()=>{
                this.messageBox.scroll({
                    top: this.messageBox.scrollHeight,
                    behavior: 'smooth'
                });
            },200);
        });
        // 通知訊息
        this.socket.on("alert-message", message => {
            alert(message);
        });
    }

    addUser(userName) {
        this.socket.emit("add-user", userName);
    }
    createRoom(title,password) {
        this.socket.emit("create-room", {title,password});
    }
    join(roomID,password) {
        this.socket.emit("join", {roomID,password});
    }
    leave(roomID) {
        this.socket.emit("leave", roomID);
    }
    post(roomID,message) {
        this.socket.emit("post", {roomID,message});
    }
}

