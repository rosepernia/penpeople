const Story = require('../models/Story')

const storiesController={}

storiesController.create = (req,res) => {
    let newStory = new Story(req.body)
    newStory.save()
      .then(story => res.json(story))    
      .catch(error => {
        let errors = {}
        if (error.errors.title) errors.title = error.errors.title.message
        if (error.errors.author) errors.author = error.errors.author.message
        if (error.errors.review) errors.review = error.errors.review.message
        if (error.errors.body) errors.body = error.errors.body.message
        if (error.errors.image) errors.image = error.errors.image.message
        res.json(errors)
      })
}
//función listar//
storiesController.list = (req, res) => {
  Story.find().lean()
    .then(stories => res.json(stories))
}

//función activar-desactivar//
storiesController.state = (req, res) =>{
    req.body.active=!req.body.active
    Story.findByIdAndUpdate(req.body._id, {active:req.body.active})
    .then(story => res.json(story))
    .catch(() => res.json(null))
}
  


module.exports=storiesController