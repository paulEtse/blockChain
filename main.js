const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = '';
        this.none  = 0
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)+ this.none).toString()
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
    {
        this.none ++
        this.hash = this.calculateHash()
    }
    console.log("Block mined : " + this.hash)
    }
}
class BlockChain{
    constructor(){
        let genesisBlock = this.createGenesisBlock()
        genesisBlock.calculateHash()
        this.chain = [genesisBlock]
        this.difficulty = 4
    }
    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis block", "0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
    isChainValid(){
        for(let i = 1; i< this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if(currentBlock.hash !== currentBlock.calculateHash())
                return false
            if(currentBlock.previousHash !== previousBlock.hash)
                return false
        }
        return true
    }
}

let savjeeCoin = new BlockChain()

console.log("Mining block 1 ...")
savjeeCoin.addBlock(new Block(1, "16/11/2020", {"amount": 500}))

console.log("Mining block 1 ...")
savjeeCoin.addBlock(new Block(2, "17/11/2020", {"amount": 400}))