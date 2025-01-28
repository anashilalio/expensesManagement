import { Router } from 'express'
import { Community } from '../schemas/community.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { CommunityValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/community/create",
    checkSchema(CommunityValidationSchema),
    async (request, response) => {
        const result = validationResult(request)
        console.log(result);
        
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }

        const data = matchedData(request)
        
        data.creatorId = request.session.passport.user
        
        const newCommunity = new Community(data)

        try {
            const savedCommunity = await newCommunity.save()
            return response.status(201).send(savedCommunity)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router