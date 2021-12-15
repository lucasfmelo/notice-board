import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from '../notice';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {

  notice?: Notice;

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    private router: Router
    ) { }
  

  ngOnInit(): void {
    let noticeId = this.route.snapshot.params.id;
    if (noticeId !== undefined){
      this.noticeService.getNoticeById(noticeId).subscribe(
        (notice) => {
          this.notice = notice;
        }
      )
    }else{
      console.log('id inexistente');
      this.router.navigate(['']);
    }
  }

}
