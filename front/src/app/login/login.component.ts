import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string;
    public hint:string;

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
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            params: {
                username: this.username,
                password: this.password
            }
        };
        let api = "http://localhost:10007/user/login";
        this.http.post(api,
            {},
            httpOptions).subscribe(response => {
            let resp = JSON.parse(JSON.stringify(response))
            if (resp.code == '200') {
                alert(resp.msg)
                this.storage.setItem('username', this.username)
                this.router
                    .navigateByUrl('/user/list')
                    .then(() => {
                        location.reload()
                    });
            } else {
                this.hint=resp.msg
            }
        });
    }
}
