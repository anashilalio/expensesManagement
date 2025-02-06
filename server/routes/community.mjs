import { Router } from 'express'
import { Community } from '../schemas/community.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { addMemberToCommunityValidationSchema, CommunityValidationSchema } from '../utils/validationSchemas.mjs';
import { CommunityExpense } from '../schemas/communityExpense.js';
import { CommunityCategory } from '../schemas/communityCategory.js';
import { CommunityBudget } from '../schemas/communityBudget.js';

const router = Router()

router.post(
    "/api/community/create",
    checkSchema(CommunityValidationSchema),
    async (request, response) => {
        const result = validationResult(request)
        console.log(result);

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
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

router.post(
    "/api/community/addMember",
    checkSchema(addMemberToCommunityValidationSchema),
    async (request, response) => {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        const communityCode = data.communityCode
        const community = await Community.find({ code: communityCode })
console.log(community);

        if (community.length !== 0) {

            const userId = request.session.passport.user

            try{
                community[0].members.push(userId);
                community = await community[0].save();
            }catch(error){
                return response.sendStatus(500)
            }

            const communityExpenses = await CommunityExpense.find({ communityCode })
            const communityCategories = await CommunityCategory.find({ communityCode })
            const communityBudgets = await CommunityBudget.find({ communityCode })
            const data = JSON.stringify({
                community,
                communityExpenses,
                communityCategories,
                communityBudgets
            })
            return response.status(200).send(data)
        } else {
            return response.sendStatus(404)
        }

    }
)

export default router