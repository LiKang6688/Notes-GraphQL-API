# Guide

## Technology stack

Nodejs
Express
GraphQL
JsonWebToken
Mongoose

## install dev

```sh
npm install
```

## Development run

```sh
npm run dev
```

visit http://localhost:4000/api to check Apollo Studio.

## Install MongoDB Community Edition on macOS

Install Xcode Command-Line Tools

```bash
xcode-select --install
```

Install Homebrew

```bash
brew update
brew tap mongodb/brew
brew install mongodb-community@5.0
```

start MongoDB

brew services start mongodb-community

## wipe out our entire collection

```sh
mongo
```

switch to database

```sh
use notedly
```

wipe out our entire collection

```sh
db.notes.remove({})
db.users.remove({})
```
