class AccountEntity {
  constructor() {
    this.id = null;
    this.first_name = null;
    this.last_name = null;
    this.email = null;
    this.phone_number = null;
  }

  getId() {
    return this.id;
  }

  getFirstName() {
    return this.first_name;
  }

  getLastName() {
    return this.last_name;
  }

  getEmail() {
    return this.email;
  }

  getPhoneNumber() {
    return this.phone_number;
  }

  setId(id) {
    this.id = id || null;
  }

  setFirstName(firstName) {
    this.first_name = firstName || null;
  }

  setLastName(lastName) {
    this.last_name = lastName || null;
  }

  setEmail(email) {
    this.email = email || null;
  }

  setPhoneNumber(phone_number) {
    this.phone_number = phone_number || null;
  }

  formatAccount(body) {
    const account = new AccountEntity();
    account.setId(body.id);
    account.setFirstName(body.first_name);
    account.setLastName(body.first_name);
    account.setEmail(body.email);
    account.setPhoneNumber(body.phone_number);
    return account;
  }

  getObject() {
    const validObject = {};
    for (let i in this) {
      validObject[i] = this[i];
    }
    return validObject;
  }
}

module.exports = AccountEntity;
