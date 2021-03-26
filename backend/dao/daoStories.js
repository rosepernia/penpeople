const Story = require('../models/Story')

const daoStories={}

daoStories.create = (story)=>{
  return new Promise((resolved)=>{
      let newStory = new Story(story)
      newStory.save().then(story=>{
          resolved(story)
      })    
  })
}

module.exports=daoStories