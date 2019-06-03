
const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { API_CONFIG } = require('./config')

const app = express()

cloudinary.config({ 
  cloud_name: API_CONFIG.cloud_name, 
  api_key: API_CONFIG.api_key, 
  api_secret: API_CONFIG.api_secret
})
  
app.use(cors({ 
  origin: 'http://localhost:3000' 
})) 

app.use(formData.parse())

app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise
    .all(promises)
    .then(results => res.json(results))
})

app.listen(1234, () => console.log('server running'))