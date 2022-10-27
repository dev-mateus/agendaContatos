import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DadosService } from 'src/app/services/dados.service';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})

export class DetalhesPage implements OnInit {

  public detalhesContato : any //objeto que recebe os valores do array criado na classe "service"
  public modoEdicao = false //objeto modo de edição
  contatoForm : FormGroup //objeto usado para validar o formulário

  constructor(
    private objDadosService : DadosService, //objeto usado para chamar métodos da classe "service"
    private objRoute : ActivatedRoute, //objeto usado para 'pegar' o id do contato passado através da pagina inicial
    private alertController: AlertController,// objeto usado para criar a caixa de alerta
    public formBuilder : FormBuilder, // objeto construtor de formulário
    public navCtrl: NavController //objeto usado voltar de pagina
    ) { }

    // método que cria (renderiza) uma caixa de alerta
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Deseja remover o contato da lista?!',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              ;
            },
          },
          {
            text: 'Sim',
            handler: () => {
              //botão 'Sim' chama o método que exclui contato
              this.ExcluirContato(),
              this.navCtrl.back()
              ;
            },
          },
        ],
      });
      await alert.present();
    }

  //método é carregado junto com a página HTML  
  ngOnInit() {

    // validação do formulário enviado pela pagina HTML
    this.contatoForm = this.formBuilder.group({
      nome : ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      sobrenome : [''],
      tipo : ['', Validators.required],
      telefone : ['', Validators.required],
      email : ['', Validators.email]
      })
    
    // captura do id do contato
    const id : number = Number(this.objRoute.snapshot.paramMap.get('id'))

    //id maior que 0, contato já existe então é carregado no objeto detalhesContato os valores salvos no array da classe "service"
    if (id > 0){
      this.detalhesContato = this.objDadosService.FiltraContatosId(id)

    }
    else{
      this.detalhesContato = {id, nome : "", sobrenome : "", tipo : "", telefone : "", email : ""}
      this.modoEdicao = true
    }
  }

  IniciarEdicao(){
    this.modoEdicao = true
  }

  EncerrarEdicao(){
    
    const id : number = Number(this.objRoute.snapshot.paramMap.get('id'))
    
    if(id > 0){
      if (this.contatoForm.valid){
        this.modoEdicao = false
      }
    }
    
    else{
      if (this.contatoForm.valid){
      this.objDadosService.InserirContato(this.detalhesContato)
      this.modoEdicao = false
      }
    }
  }

  ExcluirContato(){
    this.objDadosService.ExcluirContatoId(this.detalhesContato)
  }

}
