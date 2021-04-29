const Block = require('../models/Block')
const Story = require('../models/Story')
const User = require('../models/User')
const mailer = require("../helpers/mailer")

const blocksController={}

blocksController.create = (req,res) => {
  console.log(req.body.father)
  let newBlock = new Block({ blockid: req.body.blockid, title: req.body.title, body: req.body.body, closure: req.body.closure, author: req.body.author._id, story: req.body.story})
  newBlock.save()
    .then(block => {
      mailer.send("Fragmento enviado", req.body.author, req.body.storyname, block.body)
      if(req.body.father!='undefined'){
        User.findOne({ nickname: req.body.father })
          .then(father => {
            mailer.send("Fragmentos pendientes de moderación", father, req.body.storyname)
            res.json('ok')
          })
      }else res.json('ok')
    })
    .catch(error => {
      let errors = { body: error.errors.body.message }
      res.json(errors)
    })
}

blocksController.edit = (req, res) => {
  Block.findByIdAndUpdate(req.body._id , { body: req.body.body })
    .then(() => res.json('ok'))
    .catch(error => {
      let errors = { body: error.errors.body.message }
      res.json(errors)
    })
}

blocksController.findByBlockId = (req, res) => {
  Block.findOne({ blockid: req.body.blockid, story: req.body.story, published: true }).populate('author', 'nickname avatar', User)
    .then(block => res.json(block))
    .catch(() => res.json(null))
}

blocksController.findById = (req, res) => {
  Block.findById(req.body).populate('author', 'nickname avatar', User).populate('story', 'title', Story)
    .then(block => res.json(block))
    .catch(() => res.json(null))
}

blocksController.delete = (req, res) => {
  Block.deleteMany({ blockid: { $regex: `^${req.body.blockid}`} , story: req.body.story })
      .then(() => res.json("ok"))
}

blocksController.deleteOne = (req, res) => {
  Block.findByIdAndRemove( req.body )
    .then(() => res.json('ok'))
}

blocksController.publish = (req, res) => {
  Block.findByIdAndUpdate(req.body._id, { published: true }).populate('story', 'title', Story)
    .then(block => {
      User.findOne({ nickname: req.body.author })
        .then(author => {
          mailer.send("¡Te han publicado!", author, block.story.title)
        })
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
  Block.find({ author: req.body.author, published: true }, 'title likes blockid').populate('story', 'title image active', Story)
    .then(blocks => res.json(blocks))
}

blocksController.findModerateUser = async (req, res) => {
  let blocks = await Block.find({ author: req.body.author, published: true }, 'title blockid').populate('story', 'title image active', Story)
  let allModerateBlocks = []
  blocks.forEach (async (block) => {
    let moderateBlocks = await Block.find({blockid: { $regex: `^${block.blockid}.$` }, published: false, story: block.story }, 'title blockid').populate('story', 'title image', Story)
    allModerateBlocks.push(...moderateBlocks)
  })
  setTimeout(() => res.json(allModerateBlocks), 600);
}

blocksController.findModerateAdmin = (req, res) => {
  let allModerateBlocks=[]
  Block.find({ published: false }, 'date title blockid').populate('story', 'title image', Story)
    .then(blocks => {
      blocks.forEach (block => {
        let moderateDate = Date.parse(new Date(block.date)) + 604800000
        let actualDate = Date.parse(new Date())
        if(actualDate > moderateDate || block.blockid.length==1) 
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