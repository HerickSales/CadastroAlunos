import {BASEURL}from "./const.js";

function rowProd(pProduto){
    return`
        <tr> 
            <td>${pProduto.id}</td>
            <td>${pProduto.descricao} </td>
            <td>${pProduto.valor} </td>
            <td>${pProduto.imagem} </td>
            <td><button type="button" class="btn btn-primary btn-alterar" data-id=${pProduto.id}>Alterar</button> 
            <button type="button" class="btn btn-danger btn-excluir" data-id= ${pProduto.id}>Excluir</button></td>
        </tr>
    `;
}

function carregaProdutos(){
    const tabProd= document.querySelector("tbody");
    tabProd.innerHTML= "";
    fetch(`${BASEURL}/produtos`)
    .then(resultado =>resultado.json())
    .then(produtos => {
        produtos.forEach(prod => {
            tabProd.innerHTML+= rowProd(prod);
        });
        associaEventos();

    });
}

function associaEventos(){
    const frmProd= document.querySelector("#frmProd");
    frmProd.onsubmit= async (e)=>{
        e.preventDefault();
        let formData= new FormData(e.target);
        let prod= {}

        formData.forEach((value,key) => prod[key]=value);
        if(frmProd.dataset.id){
            prod.id= frmProd.dataset.id;
        }
        let dados= JSON.stringify(prod);

        fetch(`${BASEURL}/produtos`,{
            headers:{
                "Content-Type" : "application/json"
            },
            method: "post",
            body:dados

        })
        .then(request => request.text())
        .then(resp => {
            if(resp.toUpperCase()== "OK"){
                window.location.reload();
                carregaProdutos();
            }else{
                alert("Erro ao enviar formulario"+resp);
            }   
        })
        
    }
    let btnsAlterar= document.querySelectorAll(".btn-alterar")
    btnsAlterar.forEach(btn=>{
        btn.onclick= (e) =>{
            let id= e.target.dataset.id;
            fetch(`${BASEURL}/produtos/${id}`)
            .then(res => res.json())
            .then(prods =>{
                let prod= prods[0];
                let frmProd= document.querySelector("#frmProd");
                frmProd.querySelector("#inpDescricao").value= prod.descricao;
                frmProd.querySelector("#inpValor").value= prod.valor;
                frmProd.dataset.id=prod.id;
                let cadastroProduto= document.querySelector("#frmCadastroProduto");
                $(cadastroProduto).modal("show");
 
            });
        }
    });
    let btnsExcluir= document.querySelectorAll(".btn-excluir");

    btnsExcluir.forEach(btn=>{
        btn.onclick= (e) =>{
            let id= e.target.dataset.id;
            let btnsExcluirModal=document.querySelector("#btnExcluirModal");
            btnsExcluirModal.dataset.id= e.target.dataset.id
            $("#frmExcluirProduto").modal("show");
            btnsExcluirModal.onclick=(e)=>{ 
                fetch(`${BASEURL}/produtos/${id}`,
                {
                 headers: {
                     "Content-Type": "application/json"
                 },
                 method: "DELETE"
                })
                .then(request => request.text())
                .then(resp=> {
                 if(resp.toUpperCase() =="OK"){
                     $("#frmExcluirProduto").modal("hide");
                     window.location.reload();
                 }

                })

            }
        }
    });

    

}

carregaProdutos();