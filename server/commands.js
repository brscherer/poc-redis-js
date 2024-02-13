class SetCommand {
  constructor(database) {
      this.database = database;
  }

  execute(key, value) {
      this.database[key] = value;
  }
}

class GetCommand {
  constructor(database) {
      this.database = database;
  }

  execute(key) {
      return this.database[key];
  }
}

module.exports = {
  SetCommand,
  GetCommand
}