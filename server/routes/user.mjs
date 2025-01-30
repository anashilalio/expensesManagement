import { Router } from 'express'
import { Expense } from '../schemas/expense.js'
import { Budget } from '../schemas/budget.js'
import { Category } from '../schemas/category.js'
import { Community } from '../schemas/community.js'
import { CommunityExpense } from '../schemas/communityExpense.js'
import { CommunityCategory } from '../schemas/communityCategory.js'
import { CommunityBudget } from '../schemas/communityBudget.js'

const router = Router()

router.get(
    "/api/user/getData",
    async (request, response) => {
        if (!request.session.passport.user) {
            return response.sendStatus(400)
        }

        const userId = request.session.passport.user

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

export default router