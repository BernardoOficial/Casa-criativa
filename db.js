// Criando um banco de dados
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./casacriativa.db")

// O serialize permite que utilizemos funções do banco de dados
db.serialize(function(){

    // Criar a tabela 
    // Ele cria uma tabela se não existir uma, e com nome de ideias
    // id: tipo do dado, chave primaria e faça auto incremento para que quando seja criada um novo elemento seja incrementado uma unidade ao id
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagem TEXT,
            titulo TEXT,
            categoria TEXT,
            descricao TEXT,
            link TEXT
        );
    `)

    // // Inserir dado na tabela
    // const query = `
    // INSERT INTO ideias(
    //     imagem,
    //     titulo,
    //     categoria,
    //     descricao,
    //     link
    // ) VALUES (?,?,?,?,?); 
    // `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quo itaque impedit incidunt quia.",
    //     "https://rocketseat.com.br/starter"
    // ]

    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    
    // Consultar um dado na tabela
    // db.all(`SELECT * FROM ideias`, function(err, rows) {
    //     if (err) return console.log(err)
        
    //     console.log(rows)
    // })
    

    // Deletar um dado na tabela
    // db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err) {
    //     if (err) return console.log(err)

    //     console.log(this)
    // })    
})

// Exportanto o arquivo db.js
module.exports = db