const axios = require('axios');
const db = require("../db")
var tipos = ['carros', 'motos', 'caminhoes']
var insert = "insert into veiculos(valor, marca, modelo, ano_modelo, combustivel, codigo_fipe,mes_referencia, tipo_veiculo, sigla_combustivel) values($1, $2, $3, $4, $5, $6, $7, $8, $9)"

async function recupera() {
    try {
        for (var tipo of tipos) {
            var response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`);
            var marcas = response.data;
            for (var marca of marcas) {
                response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.codigo}/modelos`);
                var modelos = response.data.modelos;
                for (var modelo of modelos) {
                    response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`);
                    var anos = response.data;
                    for (var ano of anos) {
                        response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`);
                        var veiculo = response.data;
                        var parametros = [
                            veiculo.Valor,
                            veiculo.Marca,
                            veiculo.Modelo,
                            veiculo.AnoModelo,
                            veiculo.Combustivel,
                            veiculo.CodigoFipe,
                            veiculo.MesReferencia,
                            veiculo.TipoVeiculo,
                            veiculo.SiglaCombustivel
                        ]
                        db.query(insert, parametros, function(erro, resposta) {
                            if (erro) {
                                console.log(erro)
                            } else {
                                console.log('sucesso')
                            }
                        })

                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}
recupera();