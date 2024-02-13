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

class AppendCommand {
  constructor(database) {
    this.database = database;
  }

  execute(key, value) {
    this.database[key] = this.database[key] ? this.database[key] + value : value;
  }
}

class DeleteCommand {
  constructor(database) {
    this.database = database;
  }

  execute(key) {
    if (this.database[key]) {
      delete this.database[key]
      return true
    }
    return false
  }
}

module.exports = {
  SetCommand,
  GetCommand,
  AppendCommand,
  DeleteCommand
}