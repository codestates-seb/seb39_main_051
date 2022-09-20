package com.codestates.main.answer.controller;

import com.codestates.main.answer.dto.AnswerDTO;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    @GetMapping("/a")
    public String getAnswers(){
        return "answers";
    }

    @GetMapping("/b")
    @GetMapping
    public String getAnswer(){
        return "answer";
    }

    @GetMapping("/c")
    public String getAnswerByQuestion(@ModelAttribute AnswerDTO.GET answerDto){
        System.out.println(answerDto.getPage()+" "+answerDto.getSize()+" "+answerDto.getCategory());
        return "answer";
    }


}
