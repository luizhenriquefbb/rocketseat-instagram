# Dependências usadas

- express

- nodemon

    - reiniciar o servidor automaticamente quando muda. (live reload)
    - forma de usar:
    ```sh
    yarn dev
    ```

- Mongo

    - mais rápido
    - mais simples
    - nao é muito o foco
    - serviço na nuvem (mongo atlas)


- mongoose

    - lidar com a conexão com o mongo

<!-- mongodb+srv://lhfbarros:<password>@cluster0-qxsir.mongodb.net/test?retryWrites=true&w=majority -->


<!-- insomnia
cliente para fazer gets e post (igual ao postman)

 -->

- multer
 
    - parse dos posts de form-data para json e automatizar upload de arquivos
 
- sharp

    - redimensionar as imagens

- cors

- socket.io
    - trabalhar com web socket e poder fazer broadcast para usuários logados no momento


# Notas para mim:

## [Tutorial] Lista de comandos

Migrando no NPM para YARN

iniciar diretório

```sh
yarn init -y
```

instalar pacotes
```sh
yarn add <package>
```

<!-- -D ==> depedencia de desenvolvimento -->

## await / sync

```js
    // declara
    async funcao_asincrona_como_promisse = function(){}

    // chama
    await funcao_asincrona_como_promisse();
```