const main = document.getElementById('main');
const container2 = document.getElementById('conteiner2');
const container1 = document.getElementById('container1');
function pageCadastro() {
    main.innerHTML = ''
    main.innerHTML = `    <main>
    <div class="container col-md-5 mt-5 ">
        <div class="row ">
            <div class="col col-12">
                <h2>Cadastrar</h2>
            </div>
        </div>
        <div class="row">
            <div class="col col-12">
                <p>Faça o cadastro na plataforma</p>
            </div>
        </div>
        <div class="row mt-2 ">
            <div class="col col-6">
                <button class=" col-12 btn btn-primary bg-prime d-flex  align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-facebook" viewBox="0 0 16 16">
                        <path
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                    <p class="m-2">Cadastro com facebook</p>
                </button>
            </div>
            <div class="col col-6">
                <button class="col-md-12  btn btn-primary bg-prime d-flex  align-items-center"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-google" viewBox="0 0 16 16">
                        <path
                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                    <p class="m-2">Cadastro com Google</p>
                </button>
            </div>
        </div>
        <div class="row mt-3 col-12">
            <div class="col text-center">
                <p>ou com seu endereço de e-mail</p>
            </div>
        </div>
        <form id="formCadastro">
            <div class="row">
                    <div class="col">
                        <input class="col-12 py-2 " type="text" name="name" id="name"
                            placeholder="Digite seu nome"  value="">
                    </div>
            </div>
                    <div class="row mt-3">
                        <div class="col">
                            <input class="col-12 py-2 " type="email" name="mail" id="mail"
                                placeholder="Digite seu email" value="">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col col-12">
                            <input class="col-12 py-2 " type="password" name="password" id="password"
                                placeholder="Digite sua senha" value="">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col col-12">
                            <button class="btn btn-primary bg-prime col-12" type="submit" onclick="cadastrar(event)">Cadastre-se</button>
                        </div>
                    </div>
                </form>
                <div class="row mt-2">
                    <div class="col">
                        <p>Já tem conta? <span onclick="location.reload()">
                                <b>Acessar</b></span></p>
                    </div>
                </div>
            </div>
            <div id="alert">
           
            </div>
</main>`
}

// Variáveis globais para controle de paginação e dados de login
const per_page = 3;
let paginaAtual = 1;
let totalPages = 1;
let dadosLogin = {};
let dadoscadastro = {};
// Função para lidar com o evento de login
function logar(event){
    event.preventDefault();
  
    const form = document.getElementById('login');
    const email = form.mail.value;
    const senha = form.password.value;

    dadosLogin = {
        email: email,
        senha: senha
    };
  console.log(dadosLogin);
    buscarDados(dadosLogin); 
}

// Função para lidar com o evento de cadastro
function cadastrar(event){
    event.preventDefault();
   
    const form = document.getElementById('formCadastro');
    const email = form.mail.value;
    const senha = form.password.value;
    const nome = form.name.value;
    dadoscadastro = {
        email: email,
        senha: senha,
        nome: nome
    };
    console.log(dadoscadastro);

   cadastrarUser(dadoscadastro); 
}

// Funções de navegação de páginas
function proximo() {
    if (paginaAtual < totalPages) {
        paginaAtual++;
        container2.innerHTML = '';
        buscarDados(dadosLogin);
    }
}

function anterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        container2.innerHTML = '';
        buscarDados(dadosLogin);
    }
}

// Função para buscar dados da API
function buscarDados(dadosLogin) {



    axios.post(`https://api-crudde-recados.onrender.com/users/login?per_page=${per_page}&page=${paginaAtual}`, dadosLogin)
        .then(response => {
      
            const listaRecados = response.data.recadosDaPagina;

            for (let recado of listaRecados) {
                recado = {
                    titulo: recado.titulo,
                    descricao: recado.descricao,
                    idRecado: recado.id
                };

                totalPages = Math.ceil(response.data.totalRecados / per_page);

                container1.innerHTML = ` 
                <div class="row">
                <div class="col">
                    <div id="boxButtons" class="text-center d-flex justify-content-center d-flex mb-4">
                        <button  class="btn btn-primary bg-prime" onclick="anterior()"><</button>
                        <p class="m-2">Página ${paginaAtual} de ${totalPages}</p>
                        <button class="btn btn-primary bg-prime" onclick="proximo()">></button>
                    </div>
                </div>
            </div>
                    `;
               
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.classList.add('col-8');
                cardDiv.classList.add('mt-3');
               cardDiv.classList.add('p-2');
                


                const h3 = document.createElement('h3');
                h3.textContent = recado.titulo;

                const p = document.createElement('p');
                p.textContent = recado.descricao;

                 

                cardDiv.appendChild(h3);
                cardDiv.appendChild(p);
                container2.appendChild(cardDiv);
            }
            const sair = document.getElementById('sair');
            sair.innerHTML = ` <button type="button" class="btn btn-secondary" onclick="location.reload()">Sair</button>`;
        })
        .catch(error => {
            console.error('Dados Incorretos:', error);
            const alert = document.getElementById('alert');
            alert.innerHTML = ` <div class="alert alert-danger mt-2 text-center" role="alert">
           Dados incorretos
          </div>`
            
        });
}

// Função para cadastrar um novo usuário
function cadastrarUser() {
    
        axios.post(`https://api-crudde-recados.onrender.com/users/cadastrar`, dadoscadastro)
            .then(response => {
                response.status(201)
              
            })
            .catch(error => {
                console.error('Dados Incorretos:', error);
              
                const alert = document.getElementById('alert');
                alert.innerHTML = ` <div class="alert alert-danger mt-2 text-center" role="alert">
               Dados incorretos
              </div>`
              
            });
    }
    


