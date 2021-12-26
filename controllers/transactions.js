const Transactions = require("./../models/transactions")
const Users = require("./../models/users");

const transactions = {};

transactions.deposit = async (req, res) => {
    const data = req.body;
    const amount = parseInt(data.amount);
    const senderId = req.USER_ID
    const user = await Users.findById(senderId);
            

    console.log(data);
    try {
        if(!(data.type == 'deposit')){
            return res.status(400).send({error: 'this is the wrong route'})
        }
        if(amount <= 0){
           return res.status(400).send({error : 'Please enter a valid amount'})
        }

        const transaction = await new Transactions({
            senderId: senderId,
            receiver: user.accountNumber,
            type: data.type,
            amount: data.amount
        }).save()

        if(transaction){
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

transactions.withdraw = async (req, res) =>{
    const data = req.body;
    const amount = parseInt(data.amount);
    const senderId = req.USER_ID
    const user = await Users.findById(senderId);
    const accountBalance = user.accountBalance;
       
    try{
        if(!(data.type == 'withdrawal')){
            return res.status(400).send({error: 'this is the wrong route'})
        }
        if(amount <= 0){
           return res.status(400).send({error : 'Please enter a valid amount'})
        }
        if(accountBalance < amount){
            return res.status(400).send({error : 'Insufficient funds'})
        }

        const transaction = await new Transactions({
            senderId: senderId,
            accountNumber: user.accountNumber,
            type: data.type,
            amount: data.amount
        }).save()

        if(transaction){
            const updatedBalance = accountBalance - amount;
            await Users.updateOne({_id: user._id},{
                accountBalance: updatedBalance
            })
        }
        return res.status(200).send({
            message: 'Withdrawal successful',
            data: transaction
        })

    }catch(error){
        console.log(error)
        res.status(400).send({message: "Could not perform transaction", error: error})
    }
}

transactions.transfer = async (req, res) =>{
    const data = req.body;
    const amount = parseInt(data.amount);
    const senderId = req.USER_ID
    
    console.log(data);

    try{
        const sender = await Users.findById(senderId);
        const senderBalance = sender.accountBalance;
        const receiverAccountNumber = data.receiverAccount
        const receiver = await Users.findOne({accountNumber: receiverAccountNumber})
        const receiverBalance = receiver.accountBalance;

        console.log("THIS IS RECEIVER", receiver)

        if(!(data.type == 'transfer')){
            return res.status(400).send({error: 'this is the wrong route'})
        }
        if(amount <= 0){
           return res.status(400).send({error : 'Please enter a valid amount'})
        }
        if(senderBalance < amount){
            return res.status(400).send({error : 'Insufficient funds'})
        }
        // if(!receiver){
        //     return res.status(400).send({error : 'Could not find receiver account'})
        // }
        if(!receiver || receiverAccountNumber.length !== 10 || !parseInt(receiverAccountNumber)){
            return res.status(400).send({error : 'Invalid receiver account number'})
        }
        
        if(receiverAccountNumber == sender.accountNumber){
            return res.status(400).send({error : 'You cannot make a transfer to yourself'})
        }

        const transaction = await new Transactions({
            senderId: senderId,
            receiver: receiverAccountNumber,
            type: data.type,
            amount: data.amount
        }).save()

        if(transaction){
            const senderUpdatedBalance = senderBalance - amount;
            const receiverUpdatedBalance = receiverBalance + amount;
            await Users.updateOne({_id: sender._id},{
                accountBalance: senderUpdatedBalance
            })
            await Users.updateOne({accountNumber: receiverAccountNumber},{
                accountBalance: receiverUpdatedBalance
            })

        }

        return res.status(200).send({
            message: 'Transfer successful',
            data: transaction
        })

    }catch(error){
        console.log(error)
        res.status(400).send({message: "Could not perform transaction", error: error})}
}

module.exports = transactions