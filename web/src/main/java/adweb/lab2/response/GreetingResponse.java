package adweb.lab2.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GreetingResponse extends Response{
    private final long id;
    private final String name;

    public GreetingResponse(long id, String name) {
        this.id = id;
        this.name = name;
    }
}
