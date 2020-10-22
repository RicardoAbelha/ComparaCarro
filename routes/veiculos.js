var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET Listar Tipos de veículos */
router.get('/tipos', function(req, res, next) {
    var tipos = ["carros", "motos", "caminhoes"];
    res.status(200).json(tipos);
});

/* GET Listar Marcas */
router.get('/:tipo/marcas', function(req, res, next) {
    var tipo = req.params.tipo;
    if (tipo != 'carros' && tipo != 'motos' && tipo != 'caminhoes') {
        res.status(400).json({
            mensagem: 'este tipo de veiculo não esta cadastrado'
        })
        return;
    }
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`).then(function(response) {
        /* var data = response.data;
         var arrayMarcas = [];
         for (var i = 0; i < data.length; i++) {
             arrayMarcas.push(data[i].nome)
         }*/
        res.status(200).json(response.data)
    }).catch(function(error) {
        console.log(error)
        res.status(400).json({
            mensagem: 'não foi possivel exibir as marcas'
        })
    });

});

/* GET Listar Modelos */
router.get('/:tipo/marca/:valorMarca/modelos', function(req, res, next) {
    var tipo = req.params.tipo;
    if (tipo != 'carros' && tipo != 'motos' && tipo != 'caminhoes') {
        res.status(400).json({
            mensagem: 'este tipo de veiculo não esta cadastrado'
        })
        return;
    }
    var marca = req.params.valorMarca;
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`).then(function(response) {
        var data = response.data.modelos;
        var arrayModelos = [];
        /* for (var i = 0; i < data.length; i++) {
             arrayModelos.push(data[i].nome)
         }*/
        res.status(200).json(response.data.modelos)
    }).catch(function(error) {
        console.log(error)
        res.status(400).json({
            mensagem: 'não foi possivel exibir as modelos'
        })
    });

});


/* GET Listar anos */
router.get('/:tipo/marca/:valorMarca/modelo/:valorModelo/anos', function(req, res, next) {
    var tipo = req.params.tipo;
    if (tipo != 'carros' && tipo != 'motos' && tipo != 'caminhoes') {
        res.status(400).json({
            mensagem: 'este tipo de veiculo não esta cadastrado'
        })
        return;
    }
    var marca = req.params.valorMarca;
    var modelo = req.params.valorModelo
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`).then(function(response) {
        var data = response.data;
        var arrayAnos = [];
        for (var i = 0; i < data.length; i++) {
            arrayAnos.push(data[i].nome.split(' ')[0])
        }
        res.status(200).json(arrayAnos)
    }).catch(function(error) {
        console.log(error)
        res.status(400).json({
            mensagem: 'não foi possivel exibir os anos dos modelos'
        })
    });

});

/* GET Listar valor do veiculo */
router.get('/:tipo/marca/:valorMarca/modelo/:valorModelo/ano/:valorAno/valor', function(req, res, next) {
    var tipo = req.params.tipo;
    if (tipo != 'carros' && tipo != 'motos' && tipo != 'caminhoes') {
        res.status(400).json({
            mensagem: 'este tipo de veiculo não esta cadastrado'
        })
        return;
    }
    var marca = req.params.valorMarca;
    var modelo = req.params.valorModelo;
    var ano = req.params.valorAno;
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`).then(function(response) {
        var data = response.data;

        res.status(200).json(data.Valor)
    }).catch(function(error) {
        console.log(error)
        res.status(400).json({
            mensagem: 'não foi possivel encontrar esse veiculo'
        })
    });

});

module.exports = router;