const Block = require('../models/Block')
const Story = require('../models/Story')
const User = require('../models/User')

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
  Block.findOne({ blockid: req.body.blockid, story: req.body.story, published: true })
    .then(block => res.json(block))
    .catch(() => res.json(null))
}

blocksController.delete = (req, res) => {
  Block.deleteMany({ blockid: { $regex: `^${req.body.blockid}`} , story: req.body.story })
      .then(() => res.json("Fragmento eliminado con éxito"))
}

blocksController.publish = (req, res) => {
  Block.findByIdAndUpdate(req.body._id, { published: true })
    .then(block => {
      Block.deleteMany({ blockid: req.body.blockid, story: req.body.story, published: false })
      .then(()=>res.json(block))
    })   
}

blocksController.findByAuthor = (req, res) => {
  Block.find({author: req.body.author, published: true}).populate('story', 'title image', Story)
    .then(blocks=>res.json(blocks))
}

blocksController.findModerate = (req, res) => {
  let allModerateBlocks=[]
  Block.find({author: req.body.author, published: true}).populate('story', 'title image', Story)
    .then(blocks=>{
        for (let i = 0; i < blocks.length; i++) {
          Block.find({blockid: { $regex: `^${blocks[i].blockid}.$`}, published: false, story: blocks[i].story}).populate('story', 'title image', Story)
          .then(moderateBlocks=>{allModerateBlocks.push(...moderateBlocks)
            console.log(allModerateBlocks)
            if(i==blocks.length-1) res.json(allModerateBlocks)
          })  
        }
    })  
}

blocksController.findModerateAdmin = (req, res) => {
  Block.find({published: false}).populate('story', 'title image', Story)
    .then(blocks=>{
      blocks.forEach(block=>{
        let moderateDate = Date.parse(new Date(block.date)) + 604800000
        let actualDate = Date.parse(new Date())
        console.log(moderateDate)
        console.log(actualDate)
        if(actualDate > moderateDate) 
          res.json(blocks)
        else {
          res.json({message:"No hay fragmentos pendientes de moderar"})
        }
      })
    })
}

blocksController.listPublish = (req, res) => {
  Block.find({story: req.body.story, published: true}, 'blockid title')
    .then(blocks=>res.json(blocks))
}



module.exports=blocksController