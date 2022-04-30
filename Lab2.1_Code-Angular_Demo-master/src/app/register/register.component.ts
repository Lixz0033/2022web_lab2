import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type': 'application/json'}),
                params: {
                    username: this.username,
                    password: this.password,
                    phone: this.phone,
                    email: this.email
                }
            };
            let api = "http://localhost:8686/user/register";
            this.http.post(api,
                {},
                httpOptions).subscribe(response => {
                let resp = JSON.parse(JSON.stringify(response))
                if (resp.code == '200') {
                    alert(resp.msg)
                    this.router
                        .navigateByUrl('/login')
                        .then(() => {
                            location.reload()
                        });
                } else {
                    this.hint = resp.msg
                }
            });
        }
    }
}

