const userModel = require('../models/userModel');

exports.addExpense = async (req, res) => {
    try {
        const { month, inVal, outVal, date, msg } = req.body;

        const user = await userModel.findById(req.params.id);
        const expense = `${month}_${date}_${inVal}_${outVal}_${msg}`

        user.expenses.push(expense)

        await user.save()

        res.status(201).json({
            success: true,
            "message": "Data added",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            "message": "Error in enetering data in expenses"
        })
    }
}

exports.getMonth = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if(!user){
            res.status(402).json({
                success:false,
                "message":"user not found"
            })
            return
        }

        const  month  = req.params.month;

        const expensesForMonth = await user.expenses.filter(expense => expense.startsWith(month));
        expensesForMonth.sort();

        res.status(200).json({
            success: true,
            expensesForMonth: expensesForMonth.sort()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            "Message": "Error in fetching Data"
        })
    }
}