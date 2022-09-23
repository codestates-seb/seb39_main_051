package com.codestates.main.test.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @PostMapping("/token")
    public String getToken(){
        return "token";
    }
}
