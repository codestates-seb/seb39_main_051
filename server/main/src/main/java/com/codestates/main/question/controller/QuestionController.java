package com.codestates.main.question.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @GetMapping("")
    public String getQuestion(@PathVariable("question-id") long questionId){

        return "question";
    }



    // Question CRUD

    @PostMapping("")
    public String postQuestion(){
        return "";
    }

    @GetMapping("{question-id}")
    public String getQuestionByQuestionId(@PathVariable("question-id") long questionId){

        return "question";
    }

    @PatchMapping("{question-id}")
    public String patchQuestion(@PathVariable("question-id") long questionId){
        return "";
    }

    @DeleteMapping("{question-id}")
    public String deleteQuestion(@PathVariable("question-id") long questionId){
        return "";
    }

}
