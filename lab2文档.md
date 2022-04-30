### Lab2说明文档

#### 前端部分

##### 配置的简要说明

在lab2文档中提供的项目例子基础上为注册、登录、列举用户创建了3个新的组件。

![1](D:\web\1.png)

为了保持登录状态，创建了storage service，封装了之前学的localStorage的内容。

```typescript
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeItem(key) {
        localStorage.removeItem(key)
    }
}
```

然后是，模块和路由的配置。

/login 跳转到登录界面，

/register 跳转到注册界面，

/user/list 跳转到列举用户界面，

用‘**’令非法路由都跳转到登录界面。

因为使用了表单和发送请求，所以额外导入了FormsModule，HttpClientModule， HttpClientJsonpModule这三个模块

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http'

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAlertsComponent} from './product-alerts/product-alerts.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserListComponent} from './user-list/user-list.component';
import {StorageService} from './storage.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'user/list',
        component: UserListComponent
    },
    {
        path: 'products/list',
        component: ProductListComponent
    },
    {
        path: 'products/:productId',
        component: ProductDetailsComponent
    },
    {
        path: '**',
        redirectTo: 'login',
    },
]

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        HttpClientJsonpModule
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        ProductAlertsComponent,
        ProductDetailsComponent,
        LoginComponent,
        RegisterComponent,
        UserListComponent,
    ],
    providers: [StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

##### 逻辑的简要说明

###### 登录

将表单的信息检查后（本次lab中没有）发送给服务器，接受信息后，根据信息反馈。如果登录成功，就在本地存储登录信息，然后跳转到主页（列举用户）。

###### 注册

同理，如果注册成功，就跳转到登录界面。

###### 列举用户

当跳转到这个界面时，在调用`ngOnInit()`时发送请求，获得需要列举的用户数据，同时也从本地获得登录信息（登录时存储的信息）。

#### 后端部分

##### 配置的简要说明

