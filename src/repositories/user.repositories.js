import db from "../config/database";

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT 
    )
    `);

function createUserRepository(newUser) {
  return new Promise((res, rej) => {
    const {username, email, password, avatar} = newUser
    db.run(
      `
        INSERT INTO users (username, email, password, avatar)
        VALUES {?, ?, ?, ?}
      `,
      [username, emai, password, avatar],
      (err) => {
        if(err) {
            rej(err)
        } else {
         res({message: 'User created'})
        }
      }
    );
  });
}

export default {
    createUserRepository
}