import {MessageType} from "../types";
import {ToDateTime} from "../utils/Common";

export class Message {
    constructor({name = 'Guest'} = {}) {
        this.name = name;
    }
    Text(message){
        this.message = message;
        this.type = MessageType.TEXT
        this.time = ToDateTime();
        return this;
    }
    Photo(message){
        this.message = message;
        this.type = MessageType.PHOTO
        this.time = ToDateTime();
        return this;
    }


}