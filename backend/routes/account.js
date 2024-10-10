const { Router } = require('express');
const { authMiddleware } = require('../middlewares/userValidation');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const userAccount = await Account.findOne({
            userId
        }, );
        res.json({
            balance: userAccount.balance
        })
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    try {
        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        
        if(!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }
        
        const data = await Account.findOneAndUpdate({
            userId: req.userId
        }, {
            $inc: { balance: -amount }
        }).session(session);

        const data2 = await Account.findOneAndUpdate({
            userId: to
        }, {
            $inc: { balance: amount }
        }).session(session);


        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })
    } catch(error) {
        const data = await Account.findOneAndUpdate({
            userId: req.body.to
        }, {
            $inc: { balance: req.body.amount }
        });
    }
})

module.exports = router;