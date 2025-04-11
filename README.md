<p  align="center"><img  src="/assets/ifba-brand.png"  width="160"></p>

<h1  align="center"> Vet Assist</h1>
<p  align="center">Bem vindo ao Vet Assist!<br/>Sistema para a demonstração de funcionalidade de uma aplicação orientada a serviços. Desenvolvido como atividade avaliativa da disciplina de <b>Desenvolvimento de Aplicações Orientadas a Serviços .</b></p>


##  Estrutura dos Serviços 

### 🩺 Serviço Profissionais Veterinários:

Este serviço oferece funcionalidades para:

-   **Listar todos os profissionais cadastrados**
	-   **Método:** `GET`    
	-   **URL:** `http://127.0.0.1:8000`
	
-    **Cadastrar novos profissionais** (veterinários)
		-   **Método:** `POST`    
		-   **URL:** `http://127.0.0.1:8000`
		-   **Payload:** 
			``` 
			{
			  "name": "Daniel Aguiar",
			  "crmv": "67154939dfs54",
			  "birth_date": "1994-08-24"
			}		
			```

### 💊 Serviço Medicamentos:

Este serviço oferece funcionalidades para:

-   **Listar todos os medicamentos cadastrados**
	-   **Método:** `GET`    
	-   **URL:** `http://127.0.0.1:8001`
	
-    **Cadastrar novos animais** 
		-   **Método:** `POST`    
		-   **URL:** `http://127.0.0.1:8001`
		-   **Payload:** 
			``` 
			{
				"name": "Omeprazol 20mg",
				"description": "Remédio para o estômago",
				"manufacturer": "Medley",
				"expiration_date": "2025-06-06",
				"quantity": 30
			}		
			```	

### 🐾 Serviço Animais:

Este serviço oferece funcionalidades para:

-   **Listar todos os animais cadastrados**
	-   **Método:** `GET`    
	-   **URL:** `http://127.0.0.1:8002`
	
-    **Cadastrar novos animais** 
		-   **Método:** `POST`    
		-   **URL:** `http://127.0.0.1:8002`
		-   **Payload:** 
			``` 
			{
				"name": "Trovão",
				"species": "Cavalo",
				"breed": "Mangalarga marchador",
				"sex": "M",
				"birth_date": "2023-08-22",
				"owner_name": "Geraldo Azevedo"
			}		
			```		

## 📄 Documentação
Uma collection postman foi disponibilizada na raiz do projeto <b>(Vet Assist.postman_collection.json) </b> para facilitar a estruturação das requisições e testar a aplicação

## 🚀 Instalação e Execução dos Serviços
Para instalar essa aplicação o <b>Docker</b> e o <b>docker-compose</b> devem estar corretamente instalados em sua máquina

Certifique-se de manter livre as portas:

  - **3306, 3307, 3308**:  Para os bancos de dados

  - **8000, 8001, 8002**: Para os serviços


 1. Agora iremos rodar os containers usando o docker compose:

 Para versão mais atual do docker compose execute:
```bash
docker compose up
```
 Para versões anteriores execute:
```bash
docker-compose up
```

Após esse comando, aguarde até os containers serem totalmente construídos. Essa ação pode demorar até 5 minutos

Os serviços irão iniciar em: 

  - http://127.0.0.1:8000  (Profissionais)
  - http://127.0.0.1:8001 (Medicamentos)  
  - http://127.0.0.1:8002 (Animais)

⚠️ AVISO ⚠️

Em alguns casos, mesmo com os containers de serviços só iniciarem após os dos bancos, pode acontecer da conexão ser executada antes do container do banco finalizar o build, acarretando uma falha na conexão do serviço com o BD. 

Nesses casos reinicie o container e o problema será resolvido:

```bash
docker-compose down && docker-compose up
```

##  🖥️ Client da aplicação
O client da aplicação foi desenvolvido utilizado <b>HTML 5</b>, <b>CSS 3</b> E Javascript <b>ES6</b>, sendo necessário apenas um navegador web para começar a utilizar, preferencialmente o google Chrome.

Navegue até o diretório do cliente <b>/client</b> e abra o arquivo <b>index.html </b> em um navegador padrão.

O frontend se resume em uma tela geral, composta pela seguinte estrutura:
 1. A primeira seção é disposta por 3 cars, representando o status dos 3 serviços. A cada 5 segundos uma requisição é feita para a rota <b>/alive </b> de cada serviço para verificar seus status de atividade, após isso os cards são atualizados conforme o resultado.
 2. A segunda seção é composta por um menu estilo tab, onde cada aba abre o formulário de cadastro e a listagem dos objetos de cada serviço.
 Nessa seção é possível cadastar e listar apenas se o serviço estiver no ar. 

Os serviços funcionam de forma independente,  ou seja, a queda de um serviço <b>não</b> afeta a fucionalidade dos demais.