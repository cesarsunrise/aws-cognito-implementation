const AccountRepository = require("../repositories/AccountRepository");
const AccountEntity = require("../entities/AccountEntity");

class SignUpService {
  constructor(account) {
    this.account = new AccountEntity().formatAccount(account);
  }

  async createAccount() {
    const accountAttributes = this.account.getObject();
    const accountExists = await AccountRepository.checkAccountExist(
      accountAttributes
    );

    if (accountExists) {
      throw new Error("Email or Phone number already exist");
    }

    const account = await AccountRepository.create(this.account.getObject());
    return this.createAccountResponse(account);
  }

  createAccountResponse(account) {
    const newAccount = new AccountEntity().formatAccount(account);
    const response = {
      id: newAccount.getId(),
      user: newAccount.getObject(),
    };

    return response;
  }
}

module.exports = SignUpService;
