const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


// cria um servidor
const app = express();

const server = require('http').Server(app);

// usar socket para poder mandar notificções para usuarios logados
// broadcast
const io = require("socket.io")(server);

// conectar com o mongo atlas
mongoose.connect('mongodb+srv://semana:semana@cluster0-qxsir.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true});


app.use((req, res, next) => {
    req.io = io;
    next(); // impedir que esse midleware pare a aplicação
});

app.use(cors());

// mapear a rota files para uploads/resize diretamente.
// para usar nos src="" das imagens no frontend
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads", "resized")));

// importar as rotas
app.use(require('./routes'));


// louvir a uma porta
server.listen(3333);

