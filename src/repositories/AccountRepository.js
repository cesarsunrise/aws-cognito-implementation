const db = require("../config/connection");
const { Op } = db.Sequelize;
const Account = require("../models/account")(db.sequelize);

class AccountRepository {
  static async getAll() {
    const accounts = await Account.findAll();
    return accounts.length ? accounts : null;
  }

  static async getAccountById(id) {
    const options = {
      where: {
        id: id,
      },
    };
    const account = await Account.findOne(options);

    return account ? account : null;
  }

  static async getAccountByEmailOrPhone(username) {
    const options = {
      where: {
        [Op.or]: [
          { email: { [Op.eq]: username } },
          { phone: { [Op.eq]: username } },
        ],
      },
    };
    const account = await Account.findOne(options);

    return account ? account : null;
  }

  static async checkAccountExist(accountAttributes) {
    const fieldsToCheck = ["email", "phone"];
    let where = fieldsToCheck
      .map((field) => {
        if (accountAttributes[field]) {
          return {
            [field]: { [Op.eq]: accountAttributes[field] },
          };
        }
      })
      .filter((item) => !!item);

    const options = {
      where: {
        [Op.or]: where,
      },
    };

    const quantiy = await Account.count(options);
    return quantiy;
  }

  static async getAccountCount() {
    return await Account.count();
  }

  static async create(punch) {
    return await Account.create(punch);
  }

  static async delete(id) {
    const options = {
      where: {
        id: id,
      },
    };
    await Account.destroy(options);
  }

  async update(instance, punch) {
    return await instance.update(punch);
  }

  static async upsert(account) {
    const accountExist = await this.getAccountById(account.id);
    if (accountExist) {
      await accountExist.update(account);
    } else {
      await this.create(account);
    }
  }
}

module.exports = AccountRepository;
