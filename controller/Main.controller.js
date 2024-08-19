sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
              /* Acesso ao arquivo .json   
               var dadosGerais = {
                nomeCampeonato : "Brasileirão 2023",
                rodada : 99
               };

               var dadosModel = new JSONModel( );
               dadosModel.setData(dadosGerais);

               // obter instancia da tela
               var tela = this.getView();
               tela.setModel(dadosModel, "ModeloDadosGerais"); // ModeloDadosGerais é apelido para tela
              */ 
               
               // 3 objetos vazios
               var dadosGerais = {};
               var classificacao = {};
               var partidas = {};

               // 3 modelos - 1 para cada objeto
               var dadosModel = new JSONModel(dadosGerais);
               var classificacaoModel = new JSONModel(classificacao);
               var partidasModel = new JSONModel(partidas);

               // Atribuições de Modelo para a tela(View)
               this.getView().setModel(dadosModel, "ModeloDadosGerais");
               this.getView().setModel(classificacaoModel, "ModeloClassificacao");
               this.getView().setModel(partidasModel, "ModeloPartidas"); 

               this.buscarDadosGerais();
               this.buscarClassificacao();
               this.buscarPartidas();
            },   // Init

            buscarDadosGerais: function() {

                // Obter o model a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");
                
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : ""
                    }

                };

                // Chamada de API
                $.ajax(configuracoes)

                // sucesso
                .done(function(resposta) {
                    dadosModel2.setData(resposta);
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                }.bind(this) )

                // erro
                .fail(function(erro) {
                    debugger
                })

            },   // buscarDAdosGerais 

            buscarClassificacao : function() {
                // Obter o model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");
                
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_4e0c543258da9b1a38e1a56ed5377b"
                    }

                };

                // Chamada de API
                $.ajax(configuracoes)

                // sucesso
                .done(function(resposta) {
                    classificacaoModel2.setData({"Classificacao" : resposta});
                    debugger
                })

                // erro
                .fail(function(erro) {
                    debugger
                })

            },   // buscarClassificacao

            buscarPartidas : function(rodada) {
                // Obter o model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");
                
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_4e0c543258da9b1a38e1a56ed5377b"
                    }

                };

                // Chamada de API
                $.ajax(configuracoes)

                // sucesso
                .done(function(resposta) {
                    partidasModel2.setData(resposta);
                    debugger
                })

                // erro
                .fail(function(erro) {
                    debugger
                })

            }  // buscarPartidas

        });
    });
