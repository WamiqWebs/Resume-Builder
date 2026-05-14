// route.js
import mysql from 'mysql2/promise';

export async function POST(req) {
  try {
    const body = await req.json();
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'contact_form',
    });

    await connection.query(
      'INSERT INTO messages (name, email, password, message) VALUES (?, ?, ?, ?)',
      [body.name, body.email, body.password, body.message]
    );

    await connection.end();

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred while submitting the contact form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}