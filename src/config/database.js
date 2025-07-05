import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("library_db.sqlite", (err) => {
    if (err) {
        console.error('Error ao conectar ao bando de dados:', err.message);
    } else {
        console.log('Conectando com sucesso ao banco de dados SQLite');
    }
})

export default db;