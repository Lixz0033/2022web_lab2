package adweb.lab2.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse extends Response{
    private String token;
    private String msg = "success";

    public UserResponse(String username,String password) {
        token = username + password;
    }
}
