package com.codestates.main.question.controller;

import com.codestates.main.dto.SingleResponseDto;
import com.codestates.main.question.dto.QuestionPostDto;
import com.codestates.main.question.dto.QuestionResponseDto;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.mapper.QuestionMapper;
import com.codestates.main.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;

    @GetMapping("")
    public String getQuestion(@PathVariable("question-id") long questionId){

        return "question";
    }



    // Question CRUD

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){

        return null;
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
