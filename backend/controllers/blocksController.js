const Block = require('../models/Block')

const blocksController={}

blocksController.create = (req,res) => {
    let newBlock = new Block(req.body)
    newBlock.save()
      .then(block => res.json(block))    
      .catch(error => {
        let errors = {}
        if (error.errors.body) errors.body = error.errors.body.message
        res.json({
          errors: errors
        })
      })
}

module.exports=blocksController