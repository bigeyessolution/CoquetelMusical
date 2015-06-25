/* 
 * Copyright (C) 2015 laudivan
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

appConf = {
    application: "Coquetel Digital",
    start_position: [ { lat: -9.399402, lng: -40.500653 }, { lat: -9.393916666666666, lng: -40.5458 }, { lat: -9.473974, lng: -40.808104 } ],
    puzzle_data: [
        {
            row: 0,
            word: "vaporzinho",
            coordinates: [ { place: "Praça Dom Malan", lat: -9.398788, lng: -40.501179 }, { place: "Unid Saúde da Família", lat: -9.3933, lng: -40.54526666666667 }, { place: "Praça Geraldo Silva", lat: -9.472789, lng: -40.804886 } ],
            music: "puzzle.0.marcha_do_grande_rio.mp3",
            music_solved: "puzzle.0.marcha_do_grande_rio.mp3",
            music_name: "Marcha do Grande Rio",
            music_author: "Paulo Soares",
            music_player: "Paulo Soares e A Tecereira Cidade",
            puzzle_handler: "showPageHandler",
            text: "",
            solved_text: "O Vapor Saldanha Marinho foi o primeiro barco a navegar no Rio São Francisco, no trecho Pirapora (MG) - Juazeiro (BA), entre 1943 e 1971. Hoje, o “vaporzinho” descansa na orla de Juazeiro.",
            success_message: "Apois, essa foi facim facim ... quero vê é tu fazê a próxima.",            
            facebook_message: "Tu ainda tá na rabeta. Simbora vencer esse jogo!",
            image: "puzzle.0.vaporzinho.jpg",
            solved_image: "puzzle.0.solved.vaporzinho.jpg"
        },
        {
            row: 1,
            word: "cordelista",
            coordinates: [ { place: "Anfiteatro", lat: -9.39919, lng: -40.49902}, { place: "Creche", lat: -9.393233333333333, lng: -40.54868333333334 }, { place: "Praça dos Trabalhadores", lat: -9.469868, lng: -40.7998 } ],
            music: "puzzle.1.viagem_de_lotacao.mp3",
            music_solved: "puzzle.1.viagem_de_lotacao.mp3",
            music_name: "Viagem de Lotação",
            music_author: "Maviael Melo",
            music_player: "Maviel Melo",
            puzzle_handler: "showPageHandler",
            text: "",
            solved_text: "Cordel: Gênero de literatura, comumente associado à cantoria, ao repente; geralmente executado nas praças.",
            success_message: "Oxe, tá pessando que é moleza?! Apois segue os prumo das venta que tem mais desafio vindo!",
            facebook_message: "Apois, essa foi fácil...agora tente uma mais difícil!",
            image: "puzzle.1.poeta.jpg",
            solved_image: "puzzle.1.poeta.jpg"
        },
        {
            row: 2,
            word: "fole",
            coordinates: [ { place: "Catedral", lat: -9.399275, lng: -40.50104}, { place: "CRAS do Céu", lat: -9.394166666666667, lng: -40.54878333333333 }, { place: "Praça 7 de Setembro", lat: -9.470884, lng: -40.800186 } ],
            music: "puzzle.2.aurora_e_o_sol.mp3",
            music_solved: "puzzle.2.aurora_e_o_sol.mp3",
            music_name: "Aurora e o Sol",
            music_author: "João Sereno e Ruy Penalva",
            music_player: "João Sereno",
            puzzle_handler: "touchRhythmHandler",
            text: "",
            solved_text: "O fole é um objeto típico do Sertão, usado para ajudar a manter acesa a chama dos fogões.",
            success_message: "Eita caba arretado!!! Achou difícil? Se avexe não que tem mais!",
            facebook_message: "Arretado!!! Essa foi difícil, mas você se armô",
            image: "puzzle.2.fole.jpg",
            solved_image: "puzzle.2.fole.jpg"
        },
        {
            row: 3,
            word: "acochar",
            coordinates: [ { place: "Praça do Bambuzinho", lat: -9.396014, lng: -40.502099 }, { place: "Praça de Eventos", lat: -9.393916666666666, lng: -40.5458 }, { place: "Praça da Vila São Francisco", lat: -9.474905, lng: -40.817975 } ],
            music: "puzzle.3.todo_mundo_quer_dancar_baiao.mp3",
            music_solved: "puzzle.3.todo_mundo_quer_dancar_baiao.mp3",
            music_name: "Todo mundo quer dançar baião",
            music_author: "Manuca Almeida/Tito Bahiense",
            music_player: "Bia Goes",
            puzzle_handler: "btnAcocharHandler",
            text: "",
            solved_text: "a.co.char/verbo.  O verbo acochar significa apertar muito forte alguma coisa ou alguém. (fonte: lexiss.uneb.br)",
            success_message: "Vôte que tu tá é disposto!! Vamos como se sai mas adiante.",
            facebook_message: "Arretado!!! Essa foi difícil, mas você se armô!",
            image: "",
            image_1: "puzzle.3.man.png",
            image_2: "puzzle.3.woman.png",
            solved_image: "puzzle.3.both.png"
        },
        {
            row: 4,
            word: "sanfoneiro",
            coordinates: [ { place: "SESC Petrolina", lat: -9.395438, lng: -40.500023}, { place: "Quadra do Céu", lat: -9.3942, lng: -40.54911666666667 }, { place: "Balneário do Chico Periquito", lat: -9.445358, lng: -40.808147 } ],
            music: "puzzle.4.pra_se_aninhar.mp3",
            music_solved: "puzzle.4.pra_se_aninhar.mp3",
            music_name: "Pra se aninhar",
            music_author: "Targino Gondim",
            music_player: "Targino Gondim",
            puzzle_handler: "showMusicSheetHandler",
            text: "",
            solved_text: "",
            success_message: "Eita pé de valsa aprumado!!! Na próxima num tem xote nem baião, vamo vê se tu desenrola?",
            facebook_message: "Arretado!!! Essa foi difícil, mas você se armô!",
            image: "puzzle.4.partitura.png",
            solved_image: "puzzle.4.solved.sanfona.jpg"
        },
        {
            row: 5,
            word: "caraibeira",
            coordinates: [ { place: "Praça 21 de Setembro", lat: -9.400661, lng: -40.500303}, { place: "Assoc. dos Moradores", lat: -9.394566666666666, lng: -40.54938333333333 }, { place: "Praça ao Lado Memorial", lat: -9.468704, lng: -40.827888 } ],
            music: "puzzle.5.o_velho_arvoredo.mp3",
            music_solved: "puzzle.5.o_velho_arvoredo.mp3",
            music_name: "O velho arvoredo",
            music_author: "Maciel Melo",
            music_player: "Maciel Melo",
            puzzle_handler: "showPageHandler",
            text: "ABRACE AIRI",
            solved_text: "",
            success_message: "Essa foi bem que foi difícil, mas você se armô!",
            facebook_message: "Arretado!!! Essa foi difícil, mas você se armô!",
            image: "puzzle.5.abrace_ari.jpg",
            solved_image: "puzzle.5.solved.caraibeira.jpg"
        },
        {
            row: 6,
            word: "ilhadofogo",
            coordinates: [ { place: "Prefeitura", lat: -9.399777, lng: -40.500051}, { place: "Escola Ana Leopoldina", lat: -9.393666666666666, lng: -40.54541666666667 }, { place: "Praça do Engenheiro", lat: -9.472069, lng: -40.828446 } ],
            music: "puzzle.6.a_ilha_e_do_povo.mp3",
            music_solved: "puzzle.6.solved.a_ilha_e_do_povo.mp3",
            music_name: "A ilha é do povo",
            music_author: "Peu Bandeira/Davi Nascimento",
            music_player: "Sóda Solta",
            puzzle_handler: "showPageHandler",
            text: "",
            solved_text: "",
            success_message: "Cabra bom da peste!!!! Mas o jogo tá ficando melhor...",
            facebook_message: "Cabra bom!!!! Ta ficando melhor...",
            image: "puzzle.6.ilha_do_fogo.jpg",
            solved_image: "puzzle.6.solved.ilha_do_fogo.jpg"
        },
        {
            row: 7,
            word: "caatinga",
            coordinates: [ { place: "Praça Centenária", lat: -9.40168, lng: -40.500853}, { place: "Escola Simão Dourado", lat: -9.393, lng: -40.5463 }, { place: "Eclusa", lat: -9.438923, lng: -40.831665 } ],
            music: "puzzle.7.caatinga.mp3",
            music_solved: "puzzle.7.caatinga.mp3",
            music_name: "Caatinga",
            music_author: "Paulo Soares",
            music_player: "Paulo Soares e a Terceira Cidade",
            puzzle_handler: "showPageHandler",
            text: "",
            solved_text: "Caatinga (do tupi: ka'a [mata] + tinga [branca] = mata branca) é o único bioma exclusivamente brasileiro, o que significa que grande parte do seu patrimônio biológico não pode ser encontrado em nenhum outro lugar do planeta. Este nome decorre da paisagem esbranquiçada apresentada pela vegetação durante o período seco: a maioria das plantas perde as folhas e os troncos tornam-se esbranquiçados e secos. A caatinga ocupa uma área de cerca de 850.000 km², cerca de 10% do território nacional, englobando de forma contínua parte dos estados da Paraíba, Piauí, Ceará, Rio Grande do Norte, Maranhão, Pernambuco, Alagoas, Sergipe, Bahia (região Nordeste do Brasil) e parte do norte de Minas Gerais (região Sudeste do Brasil).",
            success_message: "Eita bicho do quengo duro! Ai se te pego na próxima!",
            facebook_message: "Cabra bom!!!! Ta ficando melhor...",
            image: "puzzle.7.caantinga.jpg",
            solved_image: "puzzle.7.caantinga.jpg"
        },
        {
            row: 8,
            word: "maraca",
            coordinates: [ { place: "Estação das Barcas", lat: -9.40385, lng: -40.50059 }, { place: "Entrada do Céu", lat: -9.394416666666666, lng: -40.54893333333333 }, { place: "Morro do Cruzeiro", lat: -9.405197, lng: -40.811621 } ],
            music: "puzzle.8.brincadeira_de_araras.mp3",
            music_solved: "puzzle.8.brincadeira_de_araras.mp3",
            music_name: "Brincadeira de Araras",
            music_author: "",
            music_player: "",
            puzzle_handler: "shakeToPlayHandler",
            text: "",
            solved_text: "Maracá é um instrumento musical feito de cuité, semelhante ao chocoalho. Utilizado por indios Truká, Pakararú, dentre outros.",
            success_message: "Vôôôte!!! Num é que tu é bom mesmo. Faz a próxima pra mostrar que sabe!",
            facebook_message: "Cabra bom!!!! Ta ficando melhor...",
            image: "puzzle.8.maraca.jpg",
            solved_image: "puzzle.8.maraca.jpg"
        },
        {
            row: 9,
            word: "opara",
            coordinates: [ { place: "Globo de Ferro", lat: -9.403609, lng: -40.497841 }, { place: "Caixa D'Água", lat: -9.489722222222222, lng: -40.68 }, { place: "Porto de Juacema", lat: -9.435663, lng: -40.852307 } ],
            music: "puzzle.9.azul_por_do_sol.mp3",
            music_solved: "puzzle.9.solved.azul_por_do_sol.mp3",
            music_name: "Azul por do Sol",
            music_author: "",
            music_player: "",
            puzzle_handler: "showPageHandler",
            text: "01101111 01110000 01100001 01110010 01100001 00001101 00001010",
            solved_text: "Opara ou Opará (significa “Rio-Mar”) e ra como os índios que habitavam a região chamavam o Rio São Francisco, na ocasião de sua descoberta, em 04/10/1501.",
            success_message: "Aêêê caburé!!! Terminaste tudo sem aperrêi.",
            facebook_message: "Tamo quase lá.",
            image: "puzzle.9.rio.jpg",
            solved_image: "puzzle.9.solved.rio.jpg"
        },
        {
            row: 10,
            word: "",
            coordinates: [  ],
            music: "",
            music_solved: "",
            music_name: "",
            music_author: "",
            music_player: "",
            puzzle_handler: "",
            text: "",
            solved_text: "",
            success_message: "Aêêê caburé!!! Terminaste tudo sem aperrêi.",
            facebook_message: "Porreta!!! O jogo acabou.",
            image: "",
            solved_image: "score.10.png"
        }
    ]
};
