const Story = require('../models/Story')
const path = require('path')

const storiesController={}

storiesController.create = (req,res) => {
  let newStory = new Story(req.body)
  newStory.save()
    .then(story => {
      Story.findByIdAndUpdate(story._id, {image: `${story._id}.jpg`})
        .then(() => {
          req.files.file.mv(path.join(__dirname,'../..',`/src/assets/img/stories/${story._id}.jpg`), err => { if (err) console.log( err ) })
          res.json('ok')
        })
    })
    .catch(error => {
      let errors = {}
      if (error.errors.title) errors.title = error.errors.title.message
      if (error.errors.author) errors.author = error.errors.author.message
      if (error.errors.review) errors.review = error.errors.review.message
      if (error.errors.body) errors.body = error.errors.body.message
      res.json(errors)
    })
}

storiesController.list = (req, res) => {
  Story.find({}, 'active title author review image').lean()
    .then(stories => res.json(stories))
}

storiesController.findById = (req,res) => {
  Story.findById(req.body)
    .then(story => res.json(story))
}

storiesController.state = (req, res) =>{
  Story.findById(req.body)
    .then(story => {
      Story.findByIdAndUpdate(req.body, { active: !story.active })
      .then(() => res.json('ok'))
    })
    .catch(() => res.json(null))
}

module.exports=storiesController