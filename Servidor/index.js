// PARA RODAR
// 1. instalar o nvm
//      $ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
//      $ source ~/.bashrc
// 2. instalar o node através do nvm
//      $ nvm install v6.3.0
// 3. verificar se tudo está instalado
//      $ node -v
//      $ npm -v
// 4. copiar os arquivos index.js e package.json para uma pasta
// 5. abrir o terminal na pasta
// 6. instalar dependências:
//      $ npm install
// 7. executar o ws (a partir daqui ele já está pronto pra receber requisições)
//      $ node index.js
// OBS.: pode testar abrindo o navegador em 'localhost:9000/usuario/berilhes'
// 8. cada mudança que você fizer tem que dar ctrc e fazer o passo 7. denovo

let usuarios = [
    { id: 1, nome: 'joao', senha: '123', email: 'qahsh@ausha.com', data_cadastro: '2017-01-02' },
    { id: 2, nome: 'maria', senha: '123', email: 'qahsh@ausha.com', data_cadastro: '2017-01-02' },
    { id: 3, nome: 'fernando', senha: 'asd', email: 'qahsh@ausha.com', data_cadastro: '2017-01-02' },
	{ id: 4, nome: 'nulo', senha: 'nulo', email: 'nulo', data_cadastro: '2017-01-02' },
	{ id: 5, nome: 'sucesso', senha: 'sucesso', email: 'sucesso', data_cadastro: '2017-01-02' }
]
let carrinhos = [
    {
        id: 1,
        id_usuario: 3,
        produtos: [
            { nome: 'faca' },
            { nome: 'feijao' },
            { nome: 'cerveja' },
            { nome: 'fraldas' }
        ]
    },
    {
        id: 2,
        id_usuario: 1,
        produtos: [
            { nome: 'cerveja' },
            { nome: 'feijão' }
        ]
    }
]
idContador = 6;
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));

// rota padrão, vai cair ela quando você acessar pelo browser
app.get('/', (req, res, next) => res.send('ws conectado'))

app.get('/cadastrar/:nome/:senha', (req, res, next) => {
    // os dados do corpo da requisição podem ser acessados 
    // em req.body
    const email = "kkk@kkkk.com";
    const senha = req.params.senha;
    const nome = req.params.nome;
    const data_cadastro = "2017-01-02";
	
	const usuario_nulo = usuarios.filter(u => u.nome == "nulo")[0];
	const usuario_sucesso = usuarios.filter(u => u.nome == "sucesso")[0];
	const usuario_encontrado = usuarios.filter(u => u.nome == nome)[0];
	if ( usuario_encontrado == null )
	{
		const id = idContador++;
		usuarios.push({ id, nome, senha, email, data_cadastro });
		res.send( usuario_sucesso );
	}
	else
	{
		res.send( usuario_nulo );
	}
    //res.send({ sucesso: true });
})

app.post('/login/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    res.send({ sucesso: true });
})

// exemplo de requisição GET com parâmetros
app.get('/carrinho/:id_carrinho', (req, res, next) => {
    // você vai chamar tipo: GET /carrinho/9
    // e a constante abaixo vai ter o valor 9
    // daí você busca na lista de carrinhos o
    // que tiver id 9
    const id_carrinho = req.params.id_carrinho;
	//const nome_produto = req.params.

    const carrinho_encontrado = carrinhos.filter(c => c.id == id_carrinho)[0];

    res.send(carrinho_encontrado)
})

app.get('/usuario/:nome', (req, res, next) => {
    const id_usuario = req.params.id_usuario;
	const nome_usuario = req.params.nome;
	const usuario_nulo = usuarios.filter(u => u.nome == "nulo")[0];

    const usuario_encontrado = usuarios.filter(u => u.nome == nome_usuario)[0];
	if ( usuario_encontrado == null )
		res.send(usuario_nulo)
		

    res.send(usuario_encontrado)
})

app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;
    console.log(`magic happens at port 9000`);
})

