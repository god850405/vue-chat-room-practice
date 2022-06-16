export class Recorder {
    constructor() {
        this.chunks = [];
        this.mediaRecorder = null;
        if (navigator.mediaDevices.getUserMedia)
            this.initialize();
        else
            console.error('瀏覽器不支援錄音');
    }
    recording() {
        if (this.mediaRecorder.state === "recording") {
            this.mediaRecorder.stop();
            return false;
        }else{
            this.mediaRecorder.start();
            return true;
        }
    }
    getDataUrl(){
        return new Promise((resolve)=>{
            this.mediaRecorder.onstop = e => {
                const _blob = new Blob(this.chunks,{ type: "audio/ogg; codecs=opus" });
                this.chunks = [];
                const _reader = new FileReader();
                _reader.readAsDataURL(_blob);
                _reader.onloadend = function() {
                    resolve(_reader.result);
                }
            }
        });
    }
    getObjectUrl(){
        return new Promise((resolve)=>{
            this.mediaRecorder.onstop = e => {
                const _blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
                this.chunks = [];
                resolve(window.URL.createObjectURL(_blob));
            }
        });
    }
    initialize(){
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
        });
    }
}