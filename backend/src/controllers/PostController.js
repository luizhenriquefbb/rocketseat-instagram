const Post = require("../models/Post");
const sharp = require("sharp");
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        // pegar os posts ordenado por data de criacao (decrescente)
        const posts = await Post.find().sort('-createdAt');

        return res.json({posts});
    },

    async store (req, res) {
        // console.log('req.body', req.body );
        // console.log('req.file', req.file );

        const {author, place, description, hashtags} = req.body;
        let {filename: image} =  req.file;

        // renomear imagem
        const [name, ext] = image.split(".");
        image = `${name}.jpg`;


        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality:70})
        .toFile(
            path.resolve(req.file.destination, 'resized', image)
        )

        // delete imagem grande
        fs.unlinkSync(req.file.path);

        // salvar no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        })

        // broadcast
        req.io.emit('post', post);

        return res.json({post});
    }
};