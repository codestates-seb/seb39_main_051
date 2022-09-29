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
import java.util.Optional;
import java.util.stream.Collectors;

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
        question.setQuestionCategory(findQuestionCategory);
        Question findQuestion = questionService.creatQuestion(question);
        QuestionResponseDto responseDto = new QuestionResponseDto(findQuestion);
        return new ResponseEntity(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestionByQuestionId(@PathVariable("question-id") long questionId){
        System.out.println("QuestionController.getQuestionByQuestionId");
        Question findQuestion = questionService.findQuestion(questionId);
        return new ResponseEntity(
                new QuestionResponseDto2(findQuestion), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam int page,
                                       @RequestParam int size,
                                       @RequestParam("questionCategory") Optional<String> questionCategory){
        System.out.println("QuestionController.getQuestions");
        Page<Question> pageQuestions;

        // 카테고리별 조회하기
        if (questionCategory.isPresent()) {
            pageQuestions = questionService.findQuestionsByQuestionCategory(page -1, size, questionCategory.get());
        }
        // 전체 질문 조회하기
        else {
            pageQuestions = questionService.findQuestions(page - 1, size);

        }
        List<Question> questions = pageQuestions.getContent();
        List<QuestionResponseDto> responseDtos = questions.stream()
                .map(question -> new QuestionResponseDto(question))
                .collect(Collectors.toList());
        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtos,pageQuestions), HttpStatus.OK
        );
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") long questionId,
                                @RequestBody QuestionPatchDto questionPatchDto){
        System.out.println("QuestionController.patchQuestion");
        questionPatchDto.setQuestionId(questionId);
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        Question updatedQuestion = questionService.updateQuestion(question);
        QuestionResponseDto responseDto = new QuestionResponseDto(updatedQuestion);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
