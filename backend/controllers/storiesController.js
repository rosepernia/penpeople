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
  Story.find({ title: { $regex: `.*${req.body.title}.*`, $options: 'i' }, active: true }).lean()
    .then(storys => res.json(storys))
}

//función activar-desactivar//
storiesController.state = (req, res) =>{
    if (req.body.active == false)
    {Story.findByIdAndUpdate(req.body, { active: true })
    .then(story => res.json(story))
    .catch(() => res.json(null))
}}



module.exports=storiesController