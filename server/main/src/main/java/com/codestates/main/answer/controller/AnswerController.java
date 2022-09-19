package com.codestates.main.answer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    @GetMapping
    public String getAnswers(){
        return "answers";
    }

    @GetMapping
    public String getAnswer(){
        return "answer";
    }

    @GetMapping
    public String getAnswerByQuestion(){
        return "answer";
    }


}
