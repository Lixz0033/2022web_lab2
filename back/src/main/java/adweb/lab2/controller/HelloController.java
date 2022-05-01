package adweb.lab2.controller;

import adweb.lab2.response.GreetingResponse;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class HelloController {
    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = "*")
    @RequestMapping("/greeting")
    public @ResponseBody
    GreetingResponse greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new GreetingResponse(counter.incrementAndGet(), "Hello, " + name + "!");
    }

    @CrossOrigin(origins = "*")
    @RequestMapping("/hello")
    public String index() {
        return "Hello, World!";
    }
}
