import { Router } from 'express'
import { CommunityCategory } from '../schemas/communityCategory.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { CommunityCategoryValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/community/category/add",
    checkSchema(CommunityCategoryValidationSchema),
    async (request, response) => {
        
        const result = validationResult(request)
        console.log(result);
        
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }

        const data = matchedData(request)
        console.log(data);
        
        const newCommunityCategory = new CommunityCategory(data)

        try {
            const savedCommunityCategory = await newCommunityCategory.save()
            console.log(savedCommunityCategory);
            
            return response.status(201).send(savedCommunityCategory)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router