package com.codestates.main.answer.controller;

import com.codestates.main.answer.dto.AnswerPatchDto;
import com.codestates.main.answer.dto.AnswerPostDto;
import com.codestates.main.answer.dto.AnswerResponseDto;
import com.codestates.main.answer.entity.Answer;
import com.codestates.main.answer.mapper.AnswerMapper;
import com.codestates.main.answer.service.AnswerService;
import com.codestates.main.config.SecurityUtils;
import com.codestates.main.dto.SingleResponseDto;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;
    private final MemberService memberService;
    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto){
//        Long memberId = answerPostDto.getMemberId();
        Long questionId = answerPostDto.getQuestionId();
        Member findMember = SecurityUtils.getCurrentMember(memberService);
//        Member findMember = memberService.findVerifiedMember(memberId);
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);
        answer.setMember(findMember);
        answer.addQuestion(findQuestion);
        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerResponseDto answerResponseDto = mapper.answerToAnswerResponseDto(createdAnswer);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") Long answerId) {
        System.out.println("AnswerController.getAnswer");

        Answer findAnswer = answerService.findAnswer(answerId);
        AnswerResponseDto answerResponseDto = mapper.answerToAnswerResponseDto(findAnswer);

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerResponseDto),HttpStatus.OK);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        System.out.println("AnswerController.patchAnswer");

        answerPatchDto.setAnswerId(answerId);
        Answer answer = mapper.answerPatchDtoToAnswer(answerPatchDto);
        Answer updatedAnswer = answerService.updateAnswer(answer);
        AnswerResponseDto answerResponseDto = mapper.answerToAnswerResponseDto(updatedAnswer);

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerResponseDto),HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId) {
        answerService.delete(answerId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
