package adweb.lab2.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MsgResponse extends Response{
    private String msg;
    public MsgResponse(int code, String msg) {
        setCode(code);
        this.msg = msg;
    }
}
