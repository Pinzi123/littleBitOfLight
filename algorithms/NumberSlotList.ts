/*
 * @Author: yaping.wang 
 * @Date: 2019-10-24 14:50:23 
 * @Last Modified by: yaping.wang
 * @Last Modified time: 2019-10-30 10:01:21
 * 
 * info:这个类是用来保证插入的数值范围不重复，例如在0-100插入20-30,20-40，第二个会自动向后挪动为30-50
 */
export class NumberSlot{
    private _tail: number;
    public childs:NumberSlot[] = [];
    public get tail(): number {
        return this._tail;
    }
    public set tail(value: number) {
        if(value < this.head) this._tail = this.head;
        else this._tail = value;
    }
    private _head: number;
    public get head(): number {
        return this._head;
    }
    public set head(value: number) {
        if(value > this.tail) this._head = this.tail;
        else this._head = value;
    }

    public get middle():number{
        return (this.head+this.tail)/2;
    }

    public get  width():number{
        return this._tail - this._head;
    }
    public isEmpty:boolean = true;

    constructor(head:number,tail:number,isEmpty:boolean=true){
        
        this._head = head;
        this._tail = tail;
        this.isEmpty = isEmpty;
    }

    isInRange(head:number,tail:number):boolean{
        let middle = (tail+head)/2;
        if((this.head-0.1)<middle && (this.tail+0.1)>middle) return true;
        return false;
    }
    

    moveDown(v:number){
        this._head +=v;
        this._tail +=v;
    }

    insert(head:number,tail:number):NumberSlot{
        if(head===tail ||(tail-head) > (this.tail-this.head) ) return null;
        let current = new NumberSlot(head,tail,false);
        if(current.head<this.head){
            current.moveDown(this.head-current.head);
            this.childs.push(current);
            this.addChild(current.tail,this.tail);
        }
        else if(current.tail>this.tail){
            current.moveDown(this.tail-current.tail);
            this.addChild(this.head,current.head);
            this.childs.push(current);
        }
        else {
            this.addChild(this.head,current.head);
            this.childs.push(current);
            this.addChild(current.tail,this.tail);
        }
        return current;
    }

    private addChild(head:number,tail:number,isEmpty:boolean=true){
        if(tail-head<0.01) return null;
        this.childs.push(new NumberSlot(head,tail,isEmpty))
    }

    clone():NumberSlot{
        return new NumberSlot(this.head,this.tail,this.isEmpty);
    }
}

export class NumberSlotList extends NumberSlot{

    insert(head:number,tail:number):NumberSlot{
        let currents :NumberSlot[],pos:number,current:NumberSlot,closet:NumberSlot,res:NumberSlot;
        if(head===tail||(tail-head) > (this.tail-this.head))return;
        if(this.childs.length === 0){
            return super.insert(head,tail);
        }else{
            pos = this.findSlot(head,tail);
            if(pos>-1){
                current = this.childs[pos];
                if(current.isEmpty&&current.width>=(tail-head)){
                    res = current.insert(head,tail).clone();
                    currents = current.childs;
                    this.childs.splice(pos,1,...currents);
                    this.mergeIsNotEmpty(pos,currents.length);
                    return res;
                }
            }
            pos = this.closetSlot(pos,head,tail);
            if(pos>-1){
                current = this.childs[pos];               
                if(current.isEmpty&&current.width>=(tail-head)){
                    res = current.insert(head,tail).clone();
                    currents = current.childs;
                    this.childs.splice(pos,1,...currents);
                    this.mergeIsNotEmpty(pos,currents.length);
                    return res;
                }
            }
            this.childs.every((child,index)=>{
                if(child.isEmpty){
                    res = child.insert(head,tail);
                    currents = child.childs;
                    if(res !== null){
                        res = res.clone();
                        this.childs.splice(index,1,...currents);
                        this.mergeIsNotEmpty(index,currents.length);
                        return false;
                    }
                }
                return true;
            });
        }
        return res;
    }


    //查找附近的空白区域
    closetSlot(pos:number,head:number,tail:number):number{
        let right:NumberSlot=null,left:NumberSlot=null;
        if(pos > 0) left = this.childs[pos-1];
        if(pos < this.childs.length-1) right = this.childs[pos+1];
        if(right&&left){
            let a = Math.abs(head - left.tail),
                b = Math.abs(right.head - tail);
            if(a<b) return pos-1;
            return pos+1;
        }
        if(right) return pos+1;
        if(left) return pos-1;
        return pos;
    }


    //合并附近不为空的插槽
    mergeIsNotEmpty(index:number,length:number){
        if(length>0&&length<3){//等于三不要检查
            if(index>0&&this.childs[index-1].isEmpty===this.childs[index].isEmpty){
                this.childs[index-1].tail = this.childs[index].tail;
                this.childs.splice(index,1);
            }else if(this.childs.length>(index+length) && this.childs[index+(length-1)].isEmpty==this.childs[index+length].isEmpty){
                this.childs[index+(length-1)].tail = this.childs[index+length].tail;
                this.childs.splice(index+length,1);
            }
        }
    }

    findSlot(head:number,tail:number):number{
        let index:number = -1;
        this.childs.every((child,i)=>{
            if(child.isInRange(head,tail)){
                index = i;
                return false;
            }
            return true;
        })
        return index;
    }

    clone():NumberSlotList{
        let clone = new NumberSlotList(this.head,this.tail);
        clone.childs = [...this.childs];
        return clone;
    }


    canHold(width:number):boolean{
        if(this.childs.length === 0 && this.width>width){
            return true;
        }
        for (let index = 0; index < this.childs.length; index++) {
            const child = this.childs[index];
            if(child.isEmpty&&child.width >= width){
                return true;
            }
        }
        return false;
    }

}

