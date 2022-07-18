# <p align = "center"> drivenpass-back </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f512.svg" width="110"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-andregugelmin-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/andregugelmin/drivenpass-back?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

Para se proteger melhor nos dias de hoje é necessário o uso de senhas diferentes e seguras. Para uma senha ser segura, ela deve conter vários caracteres e números misturados, sem contar que o quanto mais longa ela for, melhor. O problema é que é muito dificil de decorar todas essas senhas complexas diferentes uma das outras. Esse projeto cria uma forma de armazenar suas senhas, sendo necessário apenas uma senha "mestra".

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostgresSQL com Prisma

***

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{        
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
}
```
    
```yml 
POST /login
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
```
    
```yml 
GET /{credentials, secretenotes, wifis ou cards} (autenticada)
    - Rota para listar todos as {credentials, secretenotes, wifis ou cards} de um usuários
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /{credential, secretenote, wifi ou card}/:id (autenticada)
    - Rota para listar uma {credential, secretenote, wifi ou card} de um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
POST /{credential, secretenote, wifi ou card} (autenticada)
    - Rota para inserir uma nova credencial
    - headers: { "Authorization": "Bearer $token" }
    - credential
      body: {
          "title": "Lorem ipsum",
          "site": "loremipsum.com",
          "username": "loremipsum",
          "password": "loremipsum"
      }
    -secretenote
      body: {
          "title": "Lorem ipsum",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna massa, mollis id facilisis ut, tristique convallis dolor.",
      }
    -wifi
     body: {
          "title": "Lorem ipsum",
          "name": "loremipsum",
          "password": "loremipsum",
     }
     -card
     body: {
          "title": "Lorem ipsum",
          "name": "loremipsum",
          "number": "9845623158",
          "password": "loremipsum",
          "securityCode": "LOR",
          "expirationDate": "07/25",
          "isVirual": false,
          "type": {'credit', 'debit' ou 'credit_debit'}
     }
     
```
 
```yml
DELETE /{credential, secretenote, wifi ou card}/:id (autenticada)
    - Rota para deletar uma /{credential, secretenote, wifi ou card} pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

