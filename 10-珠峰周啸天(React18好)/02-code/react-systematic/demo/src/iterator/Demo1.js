/**
 * @Author liming
 * @Date 2023/9/11 16:21
 **/

class Iterator{
    constructor(assemble) {
        //assemble:需要迭代的数据结构
        this.assemble = assemble

        //index:记录迭代的次数(或者索引)
        this.index = -1
    }

    //必须具备next方法
    next(){
        this.index ++
        let {assemble,index} = this
        if(index >= assemble.length){
            //迭代完毕
            return {
                done:true,
                value: undefined
            }
        }
        return {
            done:false,
            value:assemble[index]
        }
    }
}

let arr = [10,20,30,40]
let itor = new Iterator(arr)
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())

