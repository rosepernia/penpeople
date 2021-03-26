const Block = require('../models/Block')

const daoBlocks={}

daoBlocks.create = (block)=>{
  return new Promise((resolved,reject)=>{
    let newBlock = new Block(block)
    newBlock.save()
      .then(block=>resolved(block))    
      .catch(error => reject(error))
  })
}

module.exports=daoBlocks