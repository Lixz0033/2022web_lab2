import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public username: string;
  public user_list: any[] = [];
  public hint: string;

  constructor(
    private storage: StorageService,
    public http: HttpClient,
    private router: Router
  ) {
    this.username = '';
    this.user_list = [];
    this.hint = '';
  }

  ngOnInit() {
    let validation_username = this.storage.getItem('username');
    if (validation_username) {
      this.username = validation_username;
    }
    this.list_users();
  }

  list_users() {
    let api = "http://localhost:10007/api/user/list";
    axios.post(api, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': "true",
        'Access-Control-Allow-Header': 'Content-Type,*'
      }
    })
      .then(response => {
        let resp = JSON.parse(JSON.stringify(response))
        console.log(resp)
        if (resp.data.code == '200') {
          this.user_list = resp.data.userList || [];
        } else {
          this.hint = resp.data.msg
        }
      })
      .catch(() => {
        this.hint = 'error'
      })
      .finally();
    // this.http.post(api,
    //     httpOptions).subscribe(response => {
    //     let resp = JSON.parse(JSON.stringify(response))
    //     if (resp.code == '200') {
    //         this.user_list = resp.userList || [];
    //     } else {
    //         this.hint=resp.msg
    //     }
    // });
  }

  logout() {
    //alert('logout')
    let validation_username = this.storage.getItem('username');
    if (validation_username) {
      this.storage.removeItem('username');
    }
    this.router
      .navigateByUrl('/login')
      .then(() => {
        location.reload()
      });
  }
}
