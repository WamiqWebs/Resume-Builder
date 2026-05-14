import mysql from ''
export async function DB() {
    try {
        const body = await req.json();
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'contact_form',
        })
    }
    catch {

    }
}