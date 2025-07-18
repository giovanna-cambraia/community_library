import { setErrorMap } from "zod";
import db from "../config/database.js";

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
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = newUser;

    db.run(
      `
        INSERT INTO users (username, email, password, avatar)
        VALUES (?, ?, ?, ?)
      `,
      [username, email, password, avatar],
      function (err) {
        if (err) {
          reject(err);
        } else {
          // 'this' aqui se refere ao Statement, então usamos function() {} e não arrow function
          resolve({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}

function findUserByEmailRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, username, email, avatar 
      FROM users
      WHERE email = ?
      `,
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findUserByIdRepository(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT id, username, email, avatar 
      FROM users
      WHERE id = ?
      `,
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findAllUserRepository() {
  return new Promise((resolve, reject) => {
    db.all(`
        SELECT id, username, email, avatar FROM users
      `, [], (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
  })
}

function updateUserRepository(userId, user) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = user;
    let query = "UPDATE users SET";
    const values = [];

    if (username !== undefined) {
      query += " username = ?,";
      values.push(username);
    }
    if (email !== undefined) {
      query += " email = ?,";
      values.push(email);
    }
    if (password !== undefined) {
      query += " password = ?,";
      values.push(password);
    }
    if (avatar !== undefined) {
      query += " avatar = ?,";
      values.push(avatar);
    }

    query = query.slice(0, -1);

    query += " WHERE id = ?";
    values.push(userId);

    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: userId, ...user });
      }
    });
  });
}

async function deleteUserRepository(id) {
  return new Promise((resolve, reject) => {
    db.run(`
      DELETE FROM users
      WHERE id = ?
      `, (id), (err) => {
        if(err) {
          reject(err)
        } else {
          resolve({ message: "User deleted successfully", id})
        }
      })
  })
  
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  findAllUserRepository,
  updateUserRepository,
  deleteUserRepository
};
