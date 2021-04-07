const Block = require('../models/Block')

const blocksController={}

blocksController.create = (req,res) => {
    let newBlock = new Block(req.body)
    newBlock.save()
      .then(block => res.json(block))    
      .catch(error => {
        let errors = {}
        if (error.errors.body) errors.body = error.errors.body.message
        res.json(errors)
      })
}

blocksController.edit = (req, res) => {
  let newBlock = new Block(req.body)
  Block.findByIdAndUpdate(req.body._id , { body: newBlock.body })
    .then(block => res.json(block))
    .catch(error => {
      let errors = { body: error.errors.body.message }
      res.json(errors)
    })
}

blocksController.findByBlockId = (req, res) => {
  Block.findOne({ blockid: req.body.blockid, story: req.body.story })
    .then(block => res.json(block))
    .catch(() => res.json(null))
}

blocksController.delete = (req, res) => {
  Block.deleteMany({ blockid: { $regex: `^${req.body.blockid}`} , story: req.body.story })
      .then(() => res.json("Fragmento eliminado con éxito"))
}

blocksController.publish = (req, res) => {
  Block.findOneAndUpdate({ blockid: req.body.blockid, story: req.body.story }, { published: true } )
    .then(block => {
      Block.deleteMany({ blockid: { $regex: `^${req.body.blockid}`}  , story: req.body.story, published: false })
      .then(()=>res.json(block))
    })
      
}

module.exports=blocksController