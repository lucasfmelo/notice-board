import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Notice } from '../notice';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css']
})
export class NoticeFormComponent implements OnInit {

  notice?: Notice;
  noticeForm = this.formBuilder.group({
    title: [this.notice?.title,
      [
        Validators.required,
      ]
    ],
    description: [this.notice?.description,
      [
        Validators.required,
      ]
    ],
    publishDate: [this.notice?.publishDate,
      [
        Validators.required,
      ]
    ],
  })

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private noticeService: NoticeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let noticeId = this.route.snapshot.params.id;
    if (noticeId !== undefined && noticeId !== 'add'){
      this.noticeService.getNoticeById(noticeId).subscribe(
        (notice) => {
          this.notice = notice;
          this.noticeForm.patchValue(notice);
        }
      )
    }
  }

 
  insertOrUpdate() {
    
    const notice = this.noticeForm.getRawValue() as Notice;
    if (this.notice?.id !== undefined){
      notice.id = this.notice.id
    } 
    this.noticeService.insertOrUpdate(notice).subscribe(
      () => {
        this.router.navigate(['']);
        this.toastr.success('Registro salvo com sucesso!');
      },
      err => console.log(err));
    
  }
}
