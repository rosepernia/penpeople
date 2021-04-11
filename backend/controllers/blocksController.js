const Block = require('../models/Block')
const Story = require('../models/Story')
const User = require('../models/User')

const blocksController={}

blocksController.create = (req,res) => {
    let newBlock = new Block(req.body)
    newBlock.save()
      .then(() => res.json('ok'))
      .catch(error => {
        let errors = {}
        if (error.errors.body) errors.body = error.errors.body.message
        res.json(errors)
      })
}

blocksController.edit = (req, res) => {
  let newBlock = new Block(req.body)
  Block.findByIdAndUpdate(req.body._id , { body: newBlock.body })
    .then(() => res.json('ok'))
    .catch(error => {
      let errors = { body: error.errors.body.message }
      res.json(errors)
    })
}

blocksController.findByBlockId = (req, res) => {
  Block.findOne({ blockid: req.body.blockid, story: req.body.story, published: true }).populate('author', 'nickname', User)
    .then(block => res.json(block))
    .catch(() => res.json(null))
}

blocksController.delete = (req, res) => {
  Block.deleteMany({ blockid: { $regex: `^${req.body.blockid}`} , story: req.body.story })
      .then(() => res.json("ok"))
}

blocksController.publish = (req, res) => {
  Block.findByIdAndUpdate(req.body._id, { published: true })
    .then(() => {
      Block.deleteMany({ blockid: req.body.blockid, story: req.body.story, published: false })
      .then(() => res.json('ok'))
    })   
}

blocksController.like = (req,res) => {
  Block.findById(req.body)
    .then(block => {
      Block.findByIdAndUpdate(req.body, { likes: block.likes+1 })
      .then(() => res.json('ok'))
    })
}

blocksController.findByAuthor = (req, res) => {
  Block.find({ author: req.body.author, published: true }, 'title likes').populate('story', 'title image', Story)
    .then(blocks => res.json(blocks))
}

blocksController.findModerate = (req, res) => {
  let allModerateBlocks=[]
  Block.find({ author: req.body.author, published: true }).populate('story', 'title image', Story)
    .then(blocks => {
        for (let i = 0; i < blocks.length; i++) {
          Block.find({blockid: { $regex: `^${blocks[i].blockid}.$` }, published: false, story: blocks[i].story }, 'title').populate('story', 'title image', Story)
          .then(moderateBlocks => {
            allModerateBlocks.push(...moderateBlocks)
            if(i==blocks.length-1) res.json(allModerateBlocks)
          })  
        }
    })  
}

blocksController.findModerateAdmin = (req, res) => {
  let allModerateBlocks=[]
  Block.find({ published: false }, 'date title').populate('story', 'title image', Story)
    .then(blocks => {
      blocks.forEach (block => {
        let moderateDate = Date.parse(new Date(block.date)) + 604800000
        let actualDate = Date.parse(new Date())
        if(actualDate > moderateDate) 
          allModerateBlocks.push(block)
      })
      res.json(allModerateBlocks)
    })
}

blocksController.listPublish = (req, res) => {
  Block.find({ story: req.body.story, published: true }, 'blockid title')
    .then(blocks => res.json(blocks))
}

module.exports=blocksController