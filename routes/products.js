var express = require('express');
var router = express.Router();
var productController = require('../Controller/productController');
var Joi = require('joi');

// var inputs = Joi.object().keys({
//   user_id: Joi.number().empty().required(),
//   is_featured: Joi.boolean().empty().required(),
//   name: Joi.string().empty().required(),
//   description: Joi.string().empty().required(),
//   image : Joi.empty().optional()
//   // productable_id : Joi.
// });

// router.PUT('/addproduct', (request, response) => {
//   Joi.validate(response.body, inputs, function (err, val) {
//     if (err) {
//       console.log(err);
//       return response.send(
//         JSON.stringify({
//           status: 0,
//           message: 'Invalid ' + err.details[0].path
//         })
//       );
//     } else {
//       categoryController.add_product(request, response);
//     }
//   });
//   console.log('inside products.js');
// });

module.exports = router;