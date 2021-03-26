const Story = require('../models/Story')

const daoStories={}

daoStories.create = (story)=>{
  return new Promise((resolved,reject)=>{
    let newStory = new Story(story)
    newStory.save()
      .then(story=>resolved(story))    
      .catch(error => reject(error))
  })
}

module.exports=daoStories