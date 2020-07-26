// Usei o express para criar e configurar o servidor
const express = require("express")
const server = express()

// Pegando o db.js que foi exportado
const db = require('./db')

// Criando uma lista de ideias 
// const ideias = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
//         titulo: "Cursos de Programação",
//         categoria: "Estudo",
//         descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quo itaque impedit incidunt quia.",
//         url: "https://rocketseat.com.br/starter"
//     }
//    ]


// Configurar arquivos estáticos (CSS, Script, Imagens etc)
server.use(express.static("public"))

// Habilitar o uso do req.body 
server.use(express.urlencoded({ extended: true }))

// Configuração do nunjucks
// nunjucks é muito bom para manipular o HTML e além disso, pode inserir variáveis e estrutura de repetição e decisão.
const nunjunks = require("nunjucks")
nunjunks.configure('views', {
    express: server,
    noCache: true,
})

// Criei uma rota "/"
// E capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    // req.query -> a gente pegaria toda a url do usuário para trabalhar com informação. // método Get - Para isso o form tem que estar no método GEt

    db.all(`SELECT * FROM ideias`, function(err, rows) {
        // Fazendo o tratamento de erro, tanto para mim quanto para o usuário
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        // Posso transferir os valor de um array para outro sem manter referência dessa maneira: "[...rows]". 
        const inverterIdeias = [...rows].reverse()
        let duasIdeias = [];
        for(ideia of inverterIdeias) {
            if(duasIdeias.length < 2) {
                duasIdeias.push(ideia)
            }
        }

        // retornando o arquivo index.html para o cliente, o "__dirname" faz o caminho do arquivo
        return res.render("index.html", { ideias: duasIdeias })    
    })
})

server.get("/ideias", function(req, res) {

    // req.query -> a gente pegaria toda a url do usuário para trabalhar com informação. // método Get - Para isso o form tem que estar no método GEt

    db.all(`SELECT * FROM ideias`, function(err, rows) {
        // Fazendo o tratamento de erro, tanto para mim quanto para o usuário
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const inverterIdeias = [...rows].reverse()

        // retornando o arquivo index.html para o cliente, o "__dirname" faz o caminho do arquivo
        return res.render("ideias.html", { ideias: inverterIdeias})
    })

})

server.post("/", function(req, res) {

    // Inserir dado na tabela
    const query = `
    INSERT INTO ideias(
        imagem,
        titulo,
        categoria,
        descricao,
        link
    ) VALUES (?,?,?,?,?); 
    `

    const values = [
        req.body.imagem,
        req.body.titulo,
        req.body.categoria,
        req.body.descricao,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideias")
    })  
})

// Vai abrir uma porta no servidor, basta colocar uma porta com 4 dígitos
server.listen(3000)