import eel
import json
import bcrypt
import sqlite3

conn = sqlite3.connect('users.db')
conn.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(250) NOT NULL
)
''')
conn.commit()

eel.init('web')


@eel.expose 
def add_new_user(user):
    _user: dict = json.loads(user)
    salt = bcrypt.gensalt()
    password = str.encode(_user['password'])
    _user['password'] = bcrypt.hashpw(password, salt)

    query = f'INSERT INTO users (name, email, password) VALUES (?, ?, ?);'

    result = conn.execute(query, list(_user.values()))
    conn.commit()
    return {
        "success":  True,
        "id": result.lastrowid
    }

@eel.expose
def get_all_users():
    fields = ("id", "name", "email")
    query = 'SELECT * from users'
    cursor = conn.execute(query)
    users = []
    for user in cursor:
        print(dict(zip(fields, user)))
        users.append(
            dict(zip( fields, user ))
        )
    return users


@eel.expose
def delete_user(id):
    query = 'DELETE ROM users WHERE id = ?'
    conn.execute(query, (id, ))
    conn.commit()
    return  {
        "success": True,
    }


@eel.expose
def close_connection():
    conn.close()


eel.start('index.html', mode='chrome', cmdline_args=['--start-fullscreen'])
