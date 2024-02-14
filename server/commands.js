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

class HSetCommand {
  constructor(database) {
    this.database = database;
  }

  execute(hash, key, value) {
    this.database[hash] = { [key]: value }
  }
}

class HGetCommand {
  constructor(database) {
    this.database = database;
  }

  execute(hash, key) {
    return this.database[hash]?.[key];
  }
}

class HKeysCommand {
  constructor(database) {
    this.database = database;
  }

  execute(hash) {
    return Object.keys(this.database[hash])
  }
}

class HValsCommand {
  constructor(database) {
    this.database = database;
  }

  execute(hash) {
    return Object.values(this.database[hash])
  }
}

module.exports = {
  SetCommand,
  GetCommand,
  AppendCommand,
  DeleteCommand,
  HSetCommand,
  HGetCommand,
  HKeysCommand,
  HValsCommand
}