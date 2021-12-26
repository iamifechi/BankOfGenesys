const Transactions = require("./../models/transactions")
const Users = require("./../models/users");

const transactions = {};

transactions.deposit = async (req, res) => {
    const data = req.body;
    const amount = parseInt(data.amount);
    const ownerId = req.USER_ID;
   
    //console.log(data);
    try {
        if(!(data.type == 'deposit')){
            return res.status(400).send({error: 'this is the wrong route'})
        }
        if(amount <= 0){
           return res.status(400).send({error : 'Please enter a valid amount'})
        }

        const transaction = await new Transactions({
            senderId: ownerId,
            type: data.type,
            amount: data.amount
        }).save()

        if(transaction){
            const user = await Users.findById(req.USER_ID);
          
            const accountBalance = user.accountBalance;
            const updatedBalance = accountBalance + amount;
            await Users.updateOne({_id: user._id},{
                accountBalance: updatedBalance
            })
        }
       return res.status(200).send({
            message: 'Accounted credited successfully',
            data: transaction
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not perform transaction", error})
    }
  };

module.exports = transactions