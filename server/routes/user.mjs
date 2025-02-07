import { Router } from 'express'
import { User } from '../schemas/user.js'
import { Expense } from '../schemas/expense.js'
import { Budget } from '../schemas/budget.js'
import { Category } from '../schemas/category.js'
import { Community } from '../schemas/community.js'
import { CommunityExpense } from '../schemas/communityExpense.js'
import { CommunityCategory } from '../schemas/communityCategory.js'
import { CommunityBudget } from '../schemas/communityBudget.js'
import { updateUserValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator';

const router = Router()

router.get(
    "/api/user/getData",
    async (request, response) => {
        if (!request.session.passport.user) {
            return response.sendStatus(400)
        }

        const userId = request.session.passport.user

        const user = await User.findById(userId)
        const expenses = await Expense.find({ userId: userId })
        const categories = await Category.find({ userId: { $in: [userId, null] } })
        const budgets = await Budget.find({ userId: userId })

        const communities = await Community.find({
            $or: [
                { creatorId: userId },
                { members: userId }
            ]
        })
        const communitiescodes = communities.map(community => community.code);
        const communitiesExpenses = await CommunityExpense.find({ communityCode: { $in: communitiescodes } })
        const communitiesCategories= await CommunityCategory.find({ communityCode: { $in: communitiescodes } })
        const communitiesBudgets= await CommunityBudget.find({ communityCode: { $in: communitiescodes } })

        const data = JSON.stringify({
            user: user,
            categories: categories,
            budgets: budgets,
            expenses: expenses,
            communities,
            communitiesExpenses,
            communitiesCategories,
            communitiesBudgets
        })
        return response.status(200).send(data)
    }
)

router.patch(
    "/api/user/update",
    checkSchema(updateUserValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        
        try {
            const user = await User.findOneAndUpdate(
                { _id: request.session.passport.user },
                {email: data.email, username: data.username}
            )
            
            if(user){
                return response.sendStatus(200)
            }else{
                return response.sendStatus(400)
            }
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router