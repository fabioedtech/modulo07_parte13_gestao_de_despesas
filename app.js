const express = require('express');
const app = express();
const fs = require('fs');
const SERVER_PORT = 3000;
const TABLES_DIR = './tables';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('</h1>FUNCIONANDO</h1>');
});


/*
    Method: POST
    Salva usuário
    Modelo JSON:
    {
        "id": null,
        "name":"Fulano",
        "email":"fulano@teste.com",
        "phone": "99 99999 9999",
        "password":"123"
    }
*/
app.post('/create-user', (req, res) => {
    const user = req.body;
    const filePath = TABLES_DIR + '/users.json';
    if (validateUser(user)) {
        readFile(filePath)
            .then(result => {
                user.id = getNextId(result);
                result.push(user);
                writeFile(filePath, result)
                    .then(result => {
                        res.send(user);
                    })
                    .catch(error => {
                        res.status(500).json({ message: error.message });
                    })
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(500).json({ message: "User out of pattern" });
    }
})


/*
    Method: POST
    Salva categorias de despesas
    Modelo JSON:
    {
        "id": null,
        "name":"Categoria X",
    }
*/
app.post('/create-category', (req, res) => {
    const category = req.body;
    const filePath = TABLES_DIR + '/categories.json';
    if (validateCategory(category)) {
        readFile(filePath)
            .then(result => {
                category.id = getNextId(result);
                result.push(category);
                writeFile(filePath, result)
                    .then(result => {
                        res.send(category);
                    })
                    .catch(error => {
                        res.status(500).json({ message: error.message });
                    })
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(500).json({ message: "Category out of pattern" });
    }
})

/*
    Method: POST
    Salva despesas por usuário e categoria
    Modelo JSON:
    {
        "id": null,
        "category_id":999,
        "user_id":999,
        "due_date":"2021-09-13",
        "release_date":"2021-06-25",
        "total":999.99
    }
*/
app.post('/create-expense', async (req, res) => {
    const expense = req.body;
    const filePath = TABLES_DIR + '/expenses.json';
    const errorlog = [];
    if (await validateExpense(expense, errorlog)) {
        readFile(filePath)
            .then(result => {
                expense.id = getNextId(result);
                result.push(expense);
                writeFile(filePath, result)
                    .then(result => {
                        res.send(expense);
                    })
                    .catch(error => {
                        res.status(500).json({ message: error.message });
                    })
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(500).json({ message: errorlog.join(' / ') });
    }
})

/*
    Method: GET
    Retorna as categorias de despesas
    Modelo JSON:
    [
        {
            "id": null,
            "name":"Categoria X",
        }
    ]

*/
app.get('/get-categories', (req, res) => {
    const filePath = TABLES_DIR + '/categories.json';
    readFile(filePath)
        .then(categories => {
            res.send(categories);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })

})

/*
    Method: GET
    Retorna os dados da categoria pelo ID
    Modelo JSON:
    [
        {
            "id": null,
            "name":"Categoria X",
        }
    ]
    /get-category/1
    req.params.id = 1

*/
app.get('/get-category/:id', (req, res) => {
    const category_id = req.params.id;
    const filePath = TABLES_DIR + '/categories.json';
    readFile(filePath)
        .then(categories => {
            console.log(categories);
            const category = categories.filter(item => {
                return item.id == category_id;
            })
            if (category.length > 0) {
                res.send(category);
            } else {
                res.status(500).json({ message: `Category ${category_id} not found` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })

})

/*
    Method: GET
    Retorna todos os usuários do sistema
    Modelo JSON:
    [
        {
            "id": null,
            "name":"Fulano",
            "email":"fulano@teste.com",
            "phone": "99 99999 9999",
            "password":"123"
        }
    ]

*/
app.get('/get-users', (req, res) => {
    const filePath = TABLES_DIR + '/users.json';
    readFile(filePath)
        .then(users => {
            const usersToSend = users.map((value) => {
                return {
                    id: value.id,
                    name: value.name,
                    email: value.email,
                    phone: value.phone
                }
            })
            res.send(usersToSend);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })

})

/*
    Method: GET
    Retorna os dados de um usuário pelo ID
    Modelo JSON:
    [
        {
            "id": null,
            "name":"Fulano",
            "email":"fulano@teste.com",
            "phone": "99 99999 9999",
            "password":"123"
        }
    ]
    /get-user/1
    req.params.id = 1

*/
app.get('/get-user/:id', (req, res) => {
    const user_id = req.params.id;
    const filePath = TABLES_DIR + '/users.json';
    readFile(filePath)
        .then(users => {
            const user = users.filter(item => {
                return item.id == user_id;
            })
            if (user.length > 0) {
                const userToSend = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    phone: user[0].phone
                }
                res.send(userToSend);
            } else {
                res.status(500).json({ message: `User ${user_id} not found` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })

})


/*
    Função que retorna o próximo ID
*/
function getNextId(data) {
    let nextId = (data.length > 0) ? (data[data.length - 1].id + 1) : 1;
    return nextId;
}

/*
    Função que lê um arquivo json e retorna os dados em formato de objeto
*/
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) reject(error);
            if (typeof data == 'undefined') {
                resolve([]);
            } else {
                resolve(JSON.parse(data));
            }
        });
    })
}

/*
    Função que escreve um arquivo json
*/
function writeFile(filePath, data) {
    const writeData = (typeof data == 'string') ? data : JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, writeData, (error) => {
            if (error) reject(error);
            resolve('OK');
        });
    })
}

/*
    Função que valida se meu usuário possui todos os dados necessários
*/
function validateUser(user) {
    let valid = true;
    if (typeof user.name == 'undefined' || typeof user.email == 'undefined' || typeof user.phone == 'undefined' || typeof user.password == 'undefined') {
        valid = false;
    }
    return valid;
}


/*
    Função que valida se a categoria possui todos os dados necessários
*/
function validateCategory(category) {
    let valid = true;
    if (typeof category.name == 'undefined') {
        valid = false;
    }
    return valid;
}


/*
    Função que valida se a categoria possui todos os dados necessários
*/
async function validateExpense(expense, errorlog) {
    let valid = true;
    if (typeof expense.category_id == 'undefined' || typeof expense.user_id == 'undefined' || typeof expense.total == 'undefined' || typeof expense.due_date == 'undefined' || typeof expense.release_date == 'undefined') {
        valid = false;
        errorlog.push("Expense out of pattern");
    } else {
        let validUser = await checkDataByID(expense.user_id, '/users.json', errorlog);
        let validCategory = await checkDataByID(expense.category_id, '/categories.json', errorlog);

        if (!(validUser && validCategory)) {
            valid = false;
        }
    }
    return valid;
}

/*
    Função que valida se existe usuário cadastrado no sistema pelo ID
*/
async function checkDataByID(id, file, errorlog) {
    const filePath = TABLES_DIR + file;
    try {
        const data = await readFile(filePath);
        let checkObj = data.filter(item => {
            return item.id == id;
        });

        if (checkObj.length > 0) {
            return true;
        } else {
            if (typeof errorlog != 'undefined') {
                errorlog.push(`ID ${id} not found at table ${file}`);
            };
            return false;
        }
    } catch (error) {
        if (typeof errorlog != 'undefined') {
            errorlog.push(error.message)
        }
        return false;
    }
}

app.listen(SERVER_PORT, () => {
    console.log(`SERVICO RODANDO NA PORTA ${SERVER_PORT}`);
})