const  { body, validationResult } =require('express-validator')

class ProductValidation {
    addProductValidate= [
        body('name').notEmpty().withMessage("Product nameis required"),
        body('description').notEmpty().withMessage("Product description is required").isLength({ min: 50 }).withMessage("Description must be greater than 50 characters"),
        body('price').notEmpty().withMessage("Product price is required").isNumeric().withMessage("Price must be a number"),
        body('quantity').notEmpty().withMessage("Product quantity is required").isNumeric().withMessage("Quantity must be a number"),
        body('category').notEmpty().withMessage("Product category is required"),
        body('image_url').notEmpty().withMessage("Product image is required")
    ]
}

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
   next()
}

module.exports=ProductValidation