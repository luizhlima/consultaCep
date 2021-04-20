var getZipCode = document.querySelector("#inp-zip")
var button = document.querySelector('#btn')
var main = document.querySelector('#app main')
var p = document.createElement('p')

button.addEventListener('click', consultZipCode)

function consultZipCode (event) {
    event.preventDefault()
    var zipCode = getZipCode.value
    zipCode = zipCode.trim()

    zipCode = zipCode.replace(/[^0-9]/g,'')
    console.log(zipCode)

    if (zipCode === '' || zipCode.length < 8 || zipCode.length > 8) {
        message('Campo CEP vazio ou formato inválido!')
        clearCep()
    }
    else{
        axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response) {
            if (response.data.erro) {
                message('Cep não existe!')
                clearCep()
            }

            else {
                var formatZipCode = response.data.logradouro + ', Bairro: ' + response.data.bairro + ', Cidade: ' + response.data.localidade + ' - ' + response.data.uf
                main.appendChild(p).innerHTML = formatZipCode
            }
        })
        .catch(function (error) {
            console.log(error)
            message()
            clearCep()
        })
    }
}

function message(text) {
    main.appendChild(p).innerHTML = text
}

function clearCep(){
    setTimeout(() => {
        main.appendChild(p).innerHTML = ''
    },3000)
}
