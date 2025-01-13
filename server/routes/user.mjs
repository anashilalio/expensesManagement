import { Router } from 'express'
import { Expense } from '../schemas/expense.js'
import { Budget } from '../schemas/budget.js'
import { Category } from '../schemas/category.js'

const router = Router()

router.get(
    "/api/user/getData",
    async (request, response) => {
        if (!request.session.passport.user) {
            return response.sendStatus(400)
        }

        const userId = request.session.passport.user

        const expenses = await Expense.find({ userId: userId })
        const categories = await Category.find({ userId: { $in: [userId, null]} })
        const budgets = await Budget.find({ userId: userId })
        const data = JSON.stringify({
            categories: categories,
            budgets: budgets,
            expenses: expenses
        })
        return response.status(200).send(data)
    }
)

export default router