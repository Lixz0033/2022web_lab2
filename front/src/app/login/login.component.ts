import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import axios from "axios";
import * as qs from 'qs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public hint: string;

  constructor(
    private storage: StorageService,
    public http: HttpClient,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
    this.hint = '';
  }

  ngOnInit() {
  }

  login() {
    let data = qs.stringify({
      username: this.username,
      password: this.password
    })
    console.log(data)
    let api = "http://localhost:10007/user/login";
    axios.post(api, data, {
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
          alert(resp.data.msg)
          this.storage.setItem('username', this.username)
          this.router
            .navigateByUrl('/user/list')
            .then(() => {
              location.reload()
            });
        } else {
          this.hint = resp.data.msg
        }
      })
      .catch(() => {
        this.hint = 'error'
      })
      .finally();
    // this.http.post(api,
    //     data,
    //     httpOptions).subscribe(response => {
    //     let resp = JSON.parse(JSON.stringify(response))
    //     if (resp.code == '200') {
    //         alert(resp.msg)
    //         this.storage.setItem('username', this.username)
    //         this.router
    //             .navigateByUrl('/user/list')
    //             .then(() => {
    //                 location.reload()
    //             });
    //     } else {
    //         this.hint=resp.msg
    //     }
    // });
  }
}
