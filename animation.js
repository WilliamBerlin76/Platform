export class Animation {
    constructor(frameSet, delay){
        this.count = 0;
        this.delay = delay;
        this.frameSet = frameSet;
        this.frame = 0;
        this.frameIndex = 0;
    }
    change(frameSet, delay = 20){
        if(this.frameSet !== frameSet){
            this.count = 0;
            this.delay = delay;
            this.frameSet = frameSet;
            this.frameIndex = 0;
            this.frame = this.frameSet[this.frameIndex]
        } 
    }
    update(){
        this.count++;
        // check if count has reached delay time
        if(this.count >= this.delay){
            // reset count
            this.count = 0;
            // if frameIndex is too high, reset it, otherwise, add 1
            this.frameIndex >= this.frameSet.length - 1 ? this.frameIndex = 0 : this.frameIndex++;
            this.frame = this.frameSet[this.frameIndex];
        }
    }
};