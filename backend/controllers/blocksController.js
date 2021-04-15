const Block = require('../models/Block')
const Story = require('../models/Story')
const User = require('../models/User')

const blocksController={}

blocksController.create = (req,res) => {
    let newBlock = new Block(req.body)
    newBlock.save()
      .then(() => res.json('ok'))
      .catch(error => {
        let errors = { body: error.errors.body.message }
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

blocksController.findModerateUser = async (req, res) => {
  let blocks = await Block.find({ author: req.body.author, published: true }, 'title blockid').populate('story', 'title image', Story)
  let allModerateBlocks = []
  blocks.forEach (async (block) => {
    let moderateBlocks = await Block.find({blockid: { $regex: `^${block.blockid}.$` }, published: false, story: block.story }, 'title blockid').populate('story', 'title image', Story)
    allModerateBlocks.push(...moderateBlocks)
  })
  setTimeout(() => res.json(allModerateBlocks), 1000);
}

blocksController.findModerateAdmin = (req, res) => {
  let allModerateBlocks=[]
  Block.find({ published: false }, 'date title blockid').populate('story', 'title image', Story)
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

blocksController.findModerate = (req, res) => {
  Block.findById(req.body).populate('author', 'nickname', User)
    .then(block => res.json(block))
}

blocksController.listPublish = (req, res) => {
  Block.find({ story: req.body.story, published: true }, 'blockid title')
    .then(blocks => res.json(blocks))
}

module.exports=blocksController