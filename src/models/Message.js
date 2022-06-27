import {ToDateTime} from "../utils/Common";

export class Message {
    constructor(message, type) {
        this.message = message;
        this.type = type
        this.time = ToDateTime();
    }
}