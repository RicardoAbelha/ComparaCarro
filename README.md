# ComparaCarro
## Tecnologias usadas 

  Projeto foi desenvolvido com node 12.19
  Foram utilizadas as sequintes bibliotecas/framework:
  
-  express
-  axios
-  pg

  Foi utilizado como banco o postgres v 12
  Para criar as tabelas foi usado o sequinte scriptsql:
  

```
create database carros;

create table veiculos(
	id SERIAL primary key not null,
	valor text not null,
	marca text not null,
	modelo text not null,
	ano_modelo text not null,
	combustivel text not null,
	codigo_fipe text not null,
	mes_referencia text not null,
	tipo_veiculo int not null,
	sigla_combustivel varchar(1) 
);
​
create table favoritos(
	id SERIAL primary key not null,
	veiculo_id integer, 
	constraint fk_veiculo_id
     foreign key (veiculo_id) 
     REFERENCES veiculos (id) 
);
```

## Estrutura do projeto

Foi usado como base o express generetor para a estrutura do projeto.
Pode ser encontrado "https://expressjs.com/pt-br/starter/generator.html"

## Como rodar a API


Na primeira vez que for executado a API faça a instalação das dependencias:
```
npm install 
```

Para executar o servidor execute:
```
npm start
 ```
 Apos executar o servidor o endpoint base da API é:
 localhost:3000/veiculos 
 
 ## Documentação dos endpoints
 
 GET /marcas
 retorna um json array com as marcas dos veiculos
 
 GET /tipos
 retorna um json array com os tipos de veiculos
 
 GET /modelos
 retorna um json array com os modelos de veiculos
 
 GET /anos
 retorna um json array com os anos dos veiculos
 
 GET /valor
 retorna um json array com o valor de cada veiculo
 
 ## Rotina
 
 Para recuperar todos os dados da API do FIPE e persistir no banco, executar os sequinte script:
 ```
 node ./rotinas/recuperarDadosFipe.js
 ```
 ou restaurar o dump com os dados na pasta dump.
 
 