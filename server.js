
const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { API_CONFIG } = require('./config')

// const readImage = require('./scan')

/* CODE FOR READinG THE iMAGE */
const cv = require('opencv4nodejs');

function readImage(filepath, cb) {
  console.log('function called')
  const Image = cv.imread(filepath)

  const image = Image.resize(800, 1200)

  cv.imwrite("output.jpg", image)
  
  const orig = image.copy();
  
  const gray = image.bgrToGray();
  
  const blurred = image.gaussianBlur(new cv.Size(5, 5), 0);
  
  const edged  = blurred.canny(0, 50);
  
  const orig_edged = edged.copy();
  
  
  const contours = orig_edged.findContours(cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE  );

  // contours.sort();
  // contours.reverse();
  
  var target, approx;
  
  // console.log(contours)
  
  // for( var c = 0; c<contours.length; ++c) {
  //     const p = contours[c].arcLength(true);
  //     approx = contours[c].approxPolyDP(0.02*p, true);
  
  //     if(approx.length == 4) {
  //         target = approx;
  //         break;
  //     }
  // }
  
  
  
  // console.log(contours[0])
  
  // console.log(approx);
  
  // var array = [[approx[0].y, approx[0].x]]
  
  
  // orig.drawContours([approx],-1, new cv.Vec3(0,255,0), 4);
  // cv.imwrite("temp.jpg", orig);
  cb();
}


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

  console.log('calling method')
  readImage(values[0].path, () =>{
    console.log('method finished')
    cloudinary.uploader.upload('./output.jpg')
      .then(results => {
        console.log(results);
        res.json(results)
    })
  })


  // const promises = values.map(image => cloudinary.uploader.upload(image.path))



  // Promise
  //   .all(promises)
  //   .then(results => {
  //     // res.json(results)
  //   })
})

app.listen(1234, () => console.log('server running'))