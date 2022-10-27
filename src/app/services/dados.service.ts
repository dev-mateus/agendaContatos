import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  public contatos = [
    {id : 1, nome : "Mãe", sobrenome: "", tipo: "celular", telefone : "9-8888-7777", email : ""},
    {id : 2, nome :"Amor", sobrenome: "", tipo: "celular", telefone : "9-9191-8484", email : ""}
  ]

  constructor() { }

  EnviarTodosContatos(){
    return this.contatos
  }

  FiltraContatosId(id : number){
    const contatoSelecionado = this.contatos.filter(contato => contato.id === id)
    console.log(contatoSelecionado)
    return contatoSelecionado[0]
  }

  ExcluirContatoId(contatoRecebido : any){
    this.contatos.splice(this.contatos.indexOf(contatoRecebido), 1)
  }

  InserirContato(dadosRecebidos : any){
    dadosRecebidos.id = this.contatos.length + 1
    this.contatos.push(dadosRecebidos)
  }
}
