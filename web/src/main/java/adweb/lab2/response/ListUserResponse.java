package adweb.lab2.response;

import adweb.lab2.mybatis.po.User;

import java.util.List;

public class ListUserResponse extends Response{
    private List<User> userList;

    public ListUserResponse(List<User> list){
        this.userList = list;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
