
let funcionarios = [
    {id: 1, usuario: 'Evandro', funcao: 'Desenvolvedor', senha: '123456'}
];


function verificarUsuarios(usuario, senha) {
    const usuarioCadastrado = funcionarios.find((funcionario) => {
        return funcionario.usuario === usuario;
      });


    if (usuarioCadastrado) {
        if (usuarioCadastrado.senha === senha) {
          return 1;
        } else {
          return 2;
        }
      } else {
        return 3;
      }
  }

function login() {
    const usuarioLogin = document.getElementById('usuarioLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;
    var opcao = verificarUsuarios(usuarioLogin, senhaLogin);

    switch (opcao) {
        case 1:
            alert("Logado com sucesso.");
            location.href = 'home.html';
            break;
        case 2:
            alert("Usuário ou senha inválidos.");
            break;
        case 3:
            alert("Usuário e senha não existem.");
            break;  
        default:
            break;
    }
}

function cadastrarFuncionario() {

    const id = funcionarios.length + 1;
    const usuario = document.getElementById("usuario").value;
    const funcao = document.getElementById("funcao").value;
    const senha = document.getElementById("senha").value;
   

    funcionarios.push({ 
        id: id,
        usuario: usuario,
        funcao: funcao,
        senha: senha,
    });
    
    document.getElementById("usuario").value = "";
    document.getElementById("funcao").value = "";
    document.getElementById("senha").value = "";
    listarFuncionarios();    
}

function buscarFuncionarioPorId(id) {
    
    for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].id === id) {
            return funcionarios[i];
        }
    }
    return null;
}


function listarFuncionarios() {
    let tabela = document.getElementById("funcionario");
    let tbody = tabela.querySelector('tbody');

    tbody.innerHTML = '';

    funcionarios.forEach(function(funcionario) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${funcionario.id}</td><td>${funcionario.usuario}</td><td>${funcionario.funcao}</td><td>${funcionario.senha}</td>`;
        const tdBuscar = document.createElement('td');
        const botaoBuscar = criarBotaoBuscar(funcionario.id);
        tdBuscar.appendChild(botaoBuscar);
        tr.appendChild(tdBuscar);

        const tdExcluir = document.createElement('td');
        const botaoExcluir = criarBotaoExcluir(funcionario.id);
        tdExcluir.appendChild(botaoExcluir);
        tr.appendChild(tdExcluir);
        
        tbody.appendChild(tr);   

    });
}

function criarBotaoBuscar(idFuncionario) {
    const botao = document.createElement('button');
    botao.textContent = 'Buscar'; 
    botao.addEventListener('click', function() {
    const funcionarioEncontrado = buscarFuncionarioPorId(idFuncionario);
        
        if (funcionarioEncontrado) {

            const idUsuario = document.getElementById("id");
            const nomeUsuario = document.getElementById("usuario");
            const funcaoUsuario = document.getElementById("funcao");
            const senhaUsuario = document.getElementById("senha");

            idUsuario.value = funcionarioEncontrado.id;
            nomeUsuario.value = funcionarioEncontrado.usuario;
            funcaoUsuario.value = funcionarioEncontrado.funcao;
            senhaUsuario.value = funcionarioEncontrado.senha;

            const botaoAlterar = document.getElementById("alterar");
            botaoAlterar.hidden = false;
            const botaoCadastrar = document.getElementById("cadastrar");
            botaoCadastrar.hidden = true;

        } else {
            alet("Funcionário com o ID", idFuncionario, "não encontrado.");
        }
    });
    return botao;
}

function alterarFuncionario() {

    let id = document.getElementById("id").value;
    let usuarioAlterado = document.getElementById("usuario").value;
    let funcaoAlterada = document.getElementById("funcao").value;
    let senhaAlterada = document.getElementById("senha").value;

    for (let contador = 0; contador < funcionarios.length; contador++) {
        if (funcionarios[contador].id == id) {

            funcionarios[contador].usuario = usuarioAlterado;
            funcionarios[contador].funcao = funcaoAlterada;
            funcionarios[contador].senha = senhaAlterada;
            console.log(funcionarios[contador].usuario);
        }
        
    }

    document.getElementById("usuario").value = "";
    document.getElementById("funcao").value = "";
    document.getElementById("senha").value = "";

    const botaoAlterar = document.getElementById("alterar");
    botaoAlterar.hidden = true;
    const botaoCadastrar = document.getElementById("cadastrar");
    botaoCadastrar.hidden = false;

    listarFuncionarios();
}

function criarBotaoExcluir(idFuncionario) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Exlcuir'; 
    botaoExcluir.addEventListener('click', function() {
        const funcionarioExclusao = buscarFuncionarioPorId(idFuncionario);
            
            if (funcionarioExclusao) {
                excluirFuncionarioPorId(idFuncionario);
            } else {
                alert("Funcionário com o ID", idFuncionario, "não encontrado.");
            }
        });
    return botaoExcluir;
}


function excluirFuncionarioPorId(id) {
    const posicaoFuncionario = funcionarios.findIndex(funcionario => funcionario.id === id);
    funcionarios.splice(posicaoFuncionario, 1);
    alert(`Funcionário com ID ${id} foi excluído.`);

    listarFuncionarios();
}




