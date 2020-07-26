function onOff() {

    document
        .querySelector('#modal')
        .classList
        .toggle('hide');
        
    document
        .querySelector('body')
        .classList
        .toggle('hideScroll')

    document
        .querySelector('#modal')
        .classList
        .toggle('addScroll')
}
       
function checkFields(event) {
    
    // O event é um object onde podemos acessar o target para depois acessar os campos do formulário
    // console.log(event.target.titulo)

    const valoresParaChecar = [
        "titulo",
        "categoria",
        "imagem",
        "descricao",
        "link",
    ]

    const eVazio = valoresParaChecar.find(function(valor) {
        
        const checarSeEString = typeof event.target[valor].value === "string" // verificar se tem um valor tipo string
        const checarSeEVazio = !event.target[valor].value.trim() // tirar todo os espaços e verificar se a algum valor

        if(checarSeEString && checarSeEVazio) {
            return true
        }
    })


    if(eVazio) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}