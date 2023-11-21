const tabela = document.querySelector('.tabela-js')

axios.get('http://127.0.0.1:5000/list').then((response) => {
    getData(response.data)
})
    .catch(function (error) {
        console.log('Erro na requisição GET',error)
    })

function getData(data) {
    data.map((item) => {
        tabela.innerHTML += `
            <tr>
                <th scope="row">${item.ID}</th>
                <td>${item.TAREFA}</td>
                <td><button class="btn" type="button" data-bs-toggle="modal"
                data-bs-target="#modalexcluir" onclick="excluir(${item.ID})"><span class="material-symbols-outlined text-danger">
                delete
                </span></button><button class="btn" type="button" data-bs-toggle="modal"
                data-bs-target="#modaleditar" onclick="editar(${item.TAREFA})"><span class="material-symbols-outlined text-success">
                edit
                </span></button></td>
            </tr>
            `
    })
}

function adicionarTarefa(){
    const input = document.getElementById("recipient-name").value

    if (input.trim() !==""){
        const apiUrl = 'http://127.0.0.1:5000/add'
        const Tarefa = {
            Tarefa: input
        }
        axios.post(apiUrl, Tarefa)
        .then(function(response){
            console.log("Informação adicionada com sucesso:", response.data);
        })
        .catch(error => {
        console.error('Erro ao adicionar informação à API:', error);
        });
    }else{
        alert("Por favor, insira uma informação antes de adicionar à API.")
    }
}

function excluir(id){
    console.log("Item a ser excluído: ", id)
    deletar = id
}

function excluirTarefa() {
    axios.delete(`http://127.0.0.1:5000/delete/${deletar}`)
        .then(response => {
            console.log('Item excluído com sucesso:', response.data);
            alert('Item excluído com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao excluir o item:', error);
            alert('Erro ao excluir item.')
        });
    deletar = null;
}



      
