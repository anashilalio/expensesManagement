import { Router } from 'express'
import { Category } from '../schemas/category.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { CategoryValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/category/add",
    checkSchema(CategoryValidationSchema),
    async (request, response) => {
        const result = validationResult(request)
        
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }

        const data = matchedData(request)
        
        data.userId = request.session.passport.user        
        
        const newCategory = new Category(data)

        try {
            const savedCategory = await newCategory.save()
            return response.status(201).send(savedCategory)
        } catch (error) {
            console.dir(error)
            return response.send(400).send()
        }
    }
)

export default router