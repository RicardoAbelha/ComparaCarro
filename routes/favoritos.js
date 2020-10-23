var express = require('express');
var router = express.Router();
const db = require('../db')
const axios = require('axios')

/* GET home page. */
router.post('/salvar', function(req, res, next) {
    var tipo = req.body.tipo;
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var ano = req.body.ano;
    if (tipo == undefined || marca == undefined || modelo == undefined || ano == undefined) {
        res.status(400).json({
            mensagem: 'Parametros invalidos'
        })
        return;
    }
    var pesquisa = 'select count(*) as total from favoritos where tipo=$1 and marca = $2 and modelo = $3 and ano = $4';
    var parametros = [tipo, marca, modelo, ano]
    db.query(pesquisa, parametros, function(erro, response) {
        if (erro) {
            res.status(400).json({
                mensagem: 'não foi possivel salvar nos favoritos'
            })
        } else {
            if (response.rows[0].total > 0) {
                res.status(400).json({
                    mensagem: 'esse veiculo ja esta no seu favorito'
                })
            } else {
                var salva = 'insert into favoritos(tipo, marca, modelo, ano) values($1, $2, $3, $4)';
                var favorito = [tipo, marca, modelo, ano]
                db.query(salva, favorito, function(erro, response) {
                    if (erro) {
                        res.status(400).json({
                            mensagem: 'não foi possivel salvar nos favoritos'
                        })
                    } else {
                        res.status(200).json({
                            mensagem: " sucesso"
                        })
                    }
                })

            }

        }
    });

});

router.delete('/delete', function(req, res, next) {
    var tipo = req.body.tipo;
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var ano = req.body.ano;
    if (tipo == undefined || marca == undefined || modelo == undefined || ano == undefined) {
        res.status(400).json({
            mensagem: 'Parametros invalidos'
        })
        return;
    }
    var deletar = 'delete from favoritos where tipo=$1 and marca = $2 and modelo = $3 and ano = $4';
    var parametros = [tipo, marca, modelo, ano]
    db.query(deletar, parametros, function(erro, response) {
        if (erro) {
            res.status(400).json({
                mensagem: 'não foi possivel remover o favorito'
            })
        } else {
            res.status(200).json({
                mensagem: 'sucesso'
            })
        }
    })
})

router.get('/listar', function(req, res, next) {
    var pesquisa = 'select * from favoritos';
    var parametros = []
    db.query(pesquisa, parametros, async function(erro, response) {
        if (erro) {
            res.status(400).json({
                mensagem: 'não foi possivel listar os favorito'
            })
        } else {
            try {

                var array = response.rows;
                var arrayres = []
                for (var linha of array) {
                    var r = await axios.get(`https://parallelum.com.br/fipe/api/v1/${linha.tipo}/marcas/${linha.marca}/modelos/${linha.modelo}/anos/${linha.ano}`)
                    arrayres.push(r.data)
                }
                res.status(200).json({
                    favoritos: arrayres
                })
            } catch (e) {
                res.status(400).json({
                    mensagem: 'inesperado'
                })
            }
        }

    })
})



module.exports = router;