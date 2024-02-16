class Produto{
    _id;
    _descricao;
    _valor;
    _imagem;

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        this._descricao = value;
    }

    get valor() {
        return this._valor;
    }
    set valor(value) {
        this._valor = value;
    }
   
    get imagem() {
        return this._imagem;
    }
    set imagem(value) {
        this._imagem = value;
    }

    constructor(pId, pDescricao, pValor, pImagem){
        this.id = pId;
        this.descricao = pDescricao;
        this.valor = pValor;
        this.imagem = pImagem;
    }
}

export default Produto;