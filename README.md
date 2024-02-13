# POC - Redis in NodeJS

This POC is a simple exercise of what Redis do as being a in-memory DB that store key-value pairs

Using the `redis-cli` there is the whole mechanism of RESP that helps writing and reading the buffers to store the values in memory.

This approach uses a REST client using express, so we only care about being able to read and write values

For this POC I'm using [Command](https://refactoring.guru/design-patterns/command) design pattern to execute GET and SET commands that will read and write into the in-memory local db