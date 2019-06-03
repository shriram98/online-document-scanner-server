const cv = require('opencv4nodejs');

const fs = require('fs')

const Image = cv.imread('scripts/cheque.jpg')

const image = Image.resize(1400, 800)

const orig = image.copy();

const gray = image.bgrToGray();

const blurred = image.gaussianBlur(new cv.Size(5, 5), 0);

const edged  = blurred.canny(0, 50);

const orig_edged = edged.copy();


const contours = orig_edged.findContours(cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

console.log(contours)
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