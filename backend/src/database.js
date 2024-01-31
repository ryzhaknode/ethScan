import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ryzhaknode',
    database: 'notes_app'
}).promise();

const result = await pool.query("SELECT * FROM notes");

async function createNote(title, content) {
    const [result] = await pool.query(`
    INSERT INTO notes (title)
    VALUES (?)
    `, [title])

    return result
}

const res = await createNote('test2', 'test2')

console.log(result)