const SHA256 = require('crypto-js');

/* ============Block Class============ |
|  Class with the block consturctor    |
| ====================================*/

class Block {
  constructor(data) {
    this.hash = '';
    this.height = 0;
    this.body = data;
    this.time = 0;
    this.previousBlockHash = '';
  }
}

/* ===============Block Chain Class============== |
|  Class with a contructor for new block chain    |
| ===============================================*/
class BlockChain {
  constructor() {
    this.chain = [];
    this.addBlock(new Block('First block in the chain - Genesis block'));
  }

  addBlock(newBlock) {
    newBlock.height = this.chain.length;
    newBlock.time = new Date().getTime().toString().slice(0, -3);
    if (this.chain.length > 0) {
      newBlock.previousBlockHash = this.chain[this.chain.length - 1].hash;
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    this.chain.push(newBlock);
  }
}
