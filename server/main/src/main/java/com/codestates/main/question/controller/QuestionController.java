package com.codestates.main.question.controller;

import com.codestates.main.dto.MultiResponseDto;
import com.codestates.main.dto.SingleResponseDto;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.question.dto.QuestionPatchDto;
import com.codestates.main.question.dto.QuestionPostDto;
import com.codestates.main.question.dto.QuestionResponseDto;
import com.codestates.main.question.dto.QuestionResponseDto2;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.mapper.QuestionMapper;
import com.codestates.main.question.service.QuestionService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.service.QuestionCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;

    private final MemberService memberService;
    private final QuestionCategoryService questionCategoryService;
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        System.out.println("QuestionController.postQuestion");

        Long memberId = questionPostDto.getMemberId();
        Member findMember = memberService.findVerifiedMember(memberId);
        Long questionCategoryId = questionPostDto.getQuestionCategoryId();
        QuestionCategory findQuestionCategory = questionCategoryService.findQuestionCategory(questionCategoryId);
        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        question.setMember(findMember);
        question.addQuestionCategory(findQuestionCategory);
        Question findQuestion = questionService.creatQuestion(question);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(findQuestion);
        return new ResponseEntity(
                new SingleResponseDto<>(responseDto), HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestionByQuestionId(@PathVariable("question-id") long questionId){
        System.out.println("QuestionController.getQuestionByQuestionId");
        Question findQuestion = questionService.findQuestion(questionId);
//        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(findQuestion);
        return new ResponseEntity(
                new QuestionResponseDto2(findQuestion), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam int page,
                               @RequestParam int size){
        System.out.println("QuestionController.getQuestions");

        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();
        List<QuestionResponseDto> questionResponseDtos = mapper.questionsToQuestionResponses(questions);

        return new ResponseEntity<>(
                new MultiResponseDto<>(questionResponseDtos,pageQuestions), HttpStatus.OK
        );
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") long questionId,
                                @RequestBody QuestionPatchDto questionPatchDto){
        System.out.println("QuestionController.patchQuestion");
        questionPatchDto.setQuestionId(questionId);
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        Question updatedQuestion = questionService.updateQuestion(question);
        QuestionResponseDto responseDto = mapper.questionToQuestionResponseDto(updatedQuestion);
        return new ResponseEntity(
                new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
