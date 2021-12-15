import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Notice, Notices } from './notice';
import { Observable } from 'rxjs';

const API = environment.apiUrl;
const PATH = 'notice'

@Injectable({
  providedIn: 'root',
})
export class NoticeService {

  constructor(private http: HttpClient) { }

  getNoticePaginated(page: number, size:number): Observable<Notices> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    return this.http.get<Notices>(`${API}/${PATH}`, {params: params});
  }

  getNoticeById(id: number): Observable<Notice> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Notice>(`${API}/${PATH}/` + id);
  }

  delete(id: number){
    return this.http.delete(`${API}/${PATH}/` + id)
  }

  deleteSelected(listIds: number[]){
    return this.http.delete(`${API}/${PATH}`, {
      body: listIds
    })
  }

  insertOrUpdate(notice: Notice) {
    if (notice.id === undefined){
      return this.http.post(`${API}/${PATH}`, notice);
    }else{
      return this.http.put(`${API}/${PATH}`, notice);
    }
  }



}
