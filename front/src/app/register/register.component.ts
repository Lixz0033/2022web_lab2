import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import axios from "axios";
import * as qs from 'qs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public username: string;
    public password: string;
    public confirm: string;
    public phone: string;
    public email: string;
    public hint:string;

    constructor(
        public http: HttpClient,
        private router: Router
    ) {
        this.username = '';
        this.password = '';
        this.confirm = '';
        this.phone = '';
        this.email = '';
        this.hint = '';
    }

    ngOnInit() {
    }

    register() {
        console.log(this.username + this.password + this.confirm + this.phone + this.email);
        if (this.password != this.confirm) {
            this.hint='The two passwords do not match'
        } else {
            let data= qs.stringify({
                username: this.username,
                password: this.password,
                phone: this.phone,
                email: this.email
            })
            let api = "http://localhost/user/register";
            axios.post(api,data,{
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
                    if (resp.data.code == '200') {
                        alert(resp.data.msg)
                        this.router
                            .navigateByUrl('/login')
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
            //         this.router
            //             .navigateByUrl('/login')
            //             .then(() => {
            //                 location.reload()
            //             });
            //     } else {
            //         this.hint = resp.msg
            //     }
            // });
        }
    }
}

