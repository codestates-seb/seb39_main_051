package com.codestates.main.home;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class Controller {

    @GetMapping("/home")
    public String home(){
        return "home";
    }

    @GetMapping("/subscription")
    public String subscription(){
        return "home";
    }
}
