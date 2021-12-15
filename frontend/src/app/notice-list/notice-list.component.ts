import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Notice } from '../notice';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {

  constructor(private noticeService: NoticeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  notices: Notice[] = [];
  deleteList: number[] = [];
  page: number = 0;
  size: number = 5;
  previousEnabled: boolean = false;
  nextEnabled: boolean = true;

  checkBoxSelected(event: any) {
    let valorSelecionado: number = event.target.value
    let index = this.deleteList.findIndex((e) => e == valorSelecionado);
    if (index < 0) {
      this.deleteList.push(Number(event.target.value));
    } else {
      this.deleteList.splice(index, 1);
    }
  }

  selectAllForDelete(event: any) {
    this.deleteList = [];
    let isChecked: boolean = event.target.checked
    let nodeList = document.getElementsByName('deleteCheck');
    for (let index = 0; index < nodeList.length; index++) {
      if (isChecked) {
        nodeList[index].setAttribute('checked', isChecked.toString());
        this.deleteList.push(Number(nodeList[index].getAttribute('value')));
      } else {
        nodeList[index].removeAttribute('checked');
      }
    }
  }

  ngOnInit(): void {
    /*  // carregando da url parametros
     this.activatedRoute.queryParams.subscribe((params) => {
       this.page = params['page'];
       this.size = params['size'];
     })
 
    */
    this.getNoticePaginated(this.page, this.size);
  }

  nextPage() {
    this.page++;
    this.getNoticePaginated(this.page, this.size);
  }

  previousPage() {
    this.page--;
    this.getNoticePaginated(this.page, this.size);

  }

  delete(entity: any) {
    if (confirm("Confirma a exclusão do aviso " + entity.title + "?")) {
      this.noticeService.delete(entity.id).subscribe(() => {
        this.tableReset();
      });
    }

  }

  tableReset() {
    this.page = 0;
    this.size = 5;
    this.getNoticePaginated(this.page, this.size);
    this.toastr.success('Exclusão realizada com sucesso');
  }

  getNoticePaginated(page: number, size: number) {
    this.noticeService.getNoticePaginated(this.page, this.size)
      .subscribe(
        notices => {
          this.notices = notices
          this.deleteList = []
          this.buttonsControl();
        },
        error => {
          this.toastr.error('Não foi possível acessar a API');
          console.log(error);
        });
  }

  buttonsControl() {
    // anterior
    if (this.page === 0) {
      this.previousEnabled = false;
    } else if (this.page > 0) {
      this.previousEnabled = true;
    }

    // proximo
    if (this.notices.length < this.size) {
      this.nextEnabled = false;
    } else {
      this.nextEnabled = true;
    }

    let input: HTMLInputElement = document.getElementById('deleteAll') as HTMLInputElement;
    if (input.checked) input.checked = false;

  }

  deleteSelected() {

    if (this.deleteList.length > 0) {
      if (confirm("Confirma a exclusão dos avisos selecionados ?")) {
        this.noticeService.deleteSelected(this.deleteList).subscribe(
          () => {
            this.toastr.success('Registros apagados com sucesso.');
            this.tableReset();

          },
          (err) => {
            console.log(err)
            this.toastr.error('Não foi possível executar a operação');
          }
        );
      }
    } else {
      alert('Nenhum registro foi selecionado.')

    }

  }

  newRedirect() {
    this.router.navigate(['/notices/add']);
  }

}
