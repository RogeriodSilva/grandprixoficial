/*

    Toda a parte de Banco de Dados, foram salvas em Local Storage,
    por falta de acesso ao Banco de Dados MySQL. Tentamos fazer
    o máximo para deixar algo similar ao banco de dados.

*/

const _Eventos = {

    //Funções do Sistema

    getForm: function (form, noinput) {

        const whitelist_ = ['input', 'select'];
        const ignorelist_ = ['submit'];

        var INFOS = {};

        for (let TAG of whitelist_) {
            form.querySelectorAll(TAG).forEach((object) => {
                if (!_Eventos.findInArray([ignorelist_, noinput], object.name)) {
                    INFOS[object.id] = object.value;
                }
            })
        }

        return INFOS;
    },

    getInfo: function (type, id) {
        var AllInfo = _Eventos.getAllInfo(type);

        for (Info of AllInfo) {
            if (Info.id == `${type}_${id}`) {
                return Info;
            }
        }
        return null;
    },

    getAllInfo: function (type) {

        var result = [];

        for (let i = 0; i < localStorage.length; i++) {

            let ID = localStorage.key(i);
            let DADOS = localStorage.getItem(ID);

            if (_Eventos.filterText(ID, `${type}_`) && _Eventos.filterText(ID, `${type}_`)) {
                result.push({
                    id: ID,
                    dados: JSON.parse(DADOS)
                })
            }
        }

        return result;
    },

    session: function (form) {

        var Dados = _Eventos.getForm(document.querySelector('#form-login'));
        var Users = _Eventos.getAllInfo('user');

        for (let User of Users) {
            if (Dados.email == User.dados.email && Dados.senha == User.dados.senha) {
                localStorage.setItem('usersession', User.id);
                window.location.href = '../';
            }
        }

        return null;
    },

    setInfo: function (type, form, ignore) {

        var AllInfo = _Eventos.getAllInfo(type);
        var Dados = _Eventos.getForm(form, ignore);

        localStorage.setItem(`${type}_${AllInfo.length + 1}`, JSON.stringify(Dados));
        return false;
    },

    execSession: function () {
        var usersession = localStorage.getItem('usersession');

        if (usersession != null) {
            var Dados = _Eventos.getInfo('user', _Eventos.ignoreInText(usersession, 'user_'));
            var Texto = document.querySelector('#user-session');

            Texto.innerHTML = `Olá, ${Dados.dados.nome}`;
        }
    },



    //Funcões adicionais

    findInArray: function (arrays, find) {


        for (let POS in arrays) {

            var ARRAY = arrays[POS];

            for (let VALUE in arrays[POS]) {
                if (ARRAY[VALUE] == find) {
                    return true;
                }
            }
        }

        return false;
    },

    filterText: function (text, filter) {

        text = text.toUpperCase();
        filter = filter.toUpperCase();

        for (let l = 0; l < text.length; l++) {
            if (text[0] == filter[0] && text.substring(l, filter.length) == filter) {
                return true;
            }
        }
        return false;

    },

    ignoreInText: function (text, filter) {
        var result = '';

        for (let x = 0; x < text.length; x++) {
            if (text[x] == filter[0] && text.substring(x, filter.length) == filter) {
                x = filter.length;
            }
            result += text[x];
        }

        return result;
    },

    createElements: function (isParent, Manter, Elementos) {
        var elements = '';

        for (let _element in Elementos) {

            var elementName = _element.split('_')[0];
            var elementInfo = Elementos[_element]
            var elementConfig = elementInfo.Attribute;

            function setConfig() {
                var result = '';

                for (let _config in elementConfig) {
                    var attribute = elementConfig[_config];

                    switch (typeof attribute) {
                        case 'string': {
                            result += `${_config}="${attribute}"`;
                        } break;

                        case 'object': {
                            result += `${_config}="`

                            for (let info in attribute) {
                                if (Array.isArray(attribute)) {
                                    result += `${attribute[info]} `

                                } else {

                                    result += `${info}:${attribute[info]};`

                                }
                            }
                            result += `"`;
                        } break;
                    }
                }

                return result;
            }

            var ELEMENTO = `<${elementName} ${setConfig()}> ${(elementInfo.Content != undefined ? elementInfo.Content : '')} ${(elementInfo.Close === true ? ('</' + elementName + '>') : '')}`;

            if (isParent) {
                elements += ELEMENTO;
                continue
            }

            if (Manter) {
                elementInfo.Parent.innerHTML += ELEMENTO;

            } else {
                elementInfo.Parent.innerHTML = ELEMENTO;
            }
        }

        if (isParent) {
            if (Manter) {
                isParent.innerHTML += elements;

            } else {
                isParent.innerHTML = elements;
            }

        } else {

            if (Manter) {
                elementInfo.Parent.innerHTML += elements;

            } else {
                elementInfo.Parent.innerHTML = elements;
            }
        }
    },


}

function save_default() {

    const DADOS = {
        produto: [
            {
                nome: 'Semente de Alface',
                preco: '25,60',
                desc: 'Uma coisa de Deus.',
                vendedor: 2,
                forum : 'http://119.8.81.122:8010/phpBB3/viewforum.php?f=4',
                imagem: 'produto.png',
                espefic: [
                    'Produtos de fácil plantio;',
                    'Indicado para jardins e vasos;',
                    'Sementes livres de defensivos e transgênicos;',
                    'Adaptados ao cultivo caseiro e para pequenas propriedades.']
            },
            {
                nome: 'Tratores Série 8R',
                preco: '600.000,00',
                desc: 'Uma coisa de Deus.',
                vendedor: 2,
                imagem: 'produto2.png',
                forum : 'http://119.8.81.122:8010/phpBB3/viewforum.php?f=5',
                espefic: [
                    'Modelo: 8270R;',
                    'Potência Nominal: 270cv;',
                    'Reserva de Estoque: 40%;',
                    'Transmição: 16x4/23x11;',
                    'Eixo Dianteiro: MFDW / ILS.']
            },
            {
                nome: 'Forth Plantio',
                preco: '100,00',
                desc: 'Uma coisa de Deus.',
                vendedor: 2,
                imagem: 'produto3.png',
                forum: 'http://119.8.81.122:8010/phpBB3/viewforum.php?f=8',
                espefic: [
                    'Umidade Máxima 30,0%',
                    'Nitrogênio Total 1,0%',
                    'Fósfo Total (P2O2) 1,0%',
                    'Relação C/N Máxima 20',
                    'Relação CTC/C 10',
                    'Mínima 6,0',
                    'pH 15',
                    'Carbono Orgânico 150',
                    'CTC mmol/dm3',
                ]
            },
        ],

        user: [
            {
                nome: 'Rogério',
                email: 'ro@gmail.com',
                senha: '1234',
                contato: '31 9 9349-3930',
                tipo: 'cliente'
            },
            {
                nome: 'Alexandre Etc..',
                email: 'alex@gmail.com',
                senha: '1234',
                contato: '31 9 4925-5234',
                tipo: 'vendedor'
            },
            {
                nome: 'admin',
                email: 'adminm',
                senha: '1234',
                contato: '-',
                tipo: 'admin'
            },
        ],
    }

    for (let INFO in DADOS) {
        for (let ID = 0; ID < DADOS[INFO].length; ID++) {
            var VALUE = JSON.stringify(DADOS[INFO][ID]);
            localStorage.setItem(`${INFO}_${ID + 1}`, VALUE);
        }
    }

    // _Eventos.createElements(document.querySelector('body'), true, {
    //     div: {
    //         Close: true,
    //         Content: 'Hello World',
    //         Attribute: {
    //             id: 'id_div',
    //             class: 'v',
    //             style: {
    //                 'width': '300px',
    //                 'height': '300px',
    //                 'background-color': 'red',
    //                 'text-align': 'center',
    //             }
    //         }
    //     }
    // })
}