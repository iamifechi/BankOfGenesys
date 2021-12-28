# BankOfGenesys
Learnable 2021 Backend Standardization Test

Users can:
- Login - POST /auth/login
- Deposit money - POST /transactions/deposit
- Withdraw money - POST /transactions/withdraw
- Transfer funds to other users - POST /transactions/transfer
- See a list of their transactions - GET /transactions/view
  (sorted transaction list examples(deposits, withdrawals, transfer,reversals) - GET /transactions/view?sort=transfers )


Admin can:
- Add users - POST /admin/user/register
- Delete users - DELETE /admin/user/delete/:user_id
- Reverse transactions(transfer) - POST /admin/transactions/reverse/:transaction_id
- Disable a user’s account - PATCH /admin/user/disable/:user_id

****** Thoughts ******
For the reverse transaction request, I thought of using PATCH but since I will be creating
and adding a new (reversed) transaction I opted in for POST even if I am still patching both user accounts.

****** Example users ******
1. Favour
{
    "email" : "favour@favour.com",
    "username" : "favour",
    "password" : "1234567",
    "transactionPin": 1234
}
