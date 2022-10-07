package com.codestates.main.question.service;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.question.dto.QuestionResponseDto;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.repository.QuestionRepository;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.repository.QuestionCategoryRepository;
import com.codestates.main.questionCategory.service.QuestionCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
//@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final QuestionCategoryRepository questionCategoryRepository;


    public Question creatQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));

        return questionRepository.save(findQuestion);
    }

    public void deleteQuestion(long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        questionRepository.delete(findQuestion);
    }

    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page,size));
    }

    public List<Question> findByQuestionCategory(QuestionCategory questionCategory, PageRequest pageRequest){
        return questionRepository.findByQuestionCategory(pageRequest,questionCategory);
    }

    public List<Question> findByQuestionCategory(QuestionCategory questionCategory){
        return questionRepository.findByQuestionCategory(questionCategory);
    }


    public Page<Question> findQuestionsByQuestionCategory(int page, int size, String questionCategory) {
        QuestionCategory findQuestionCategory = questionCategoryRepository.findByName(questionCategory);
        return questionRepository.findAllByQuestionCategory(PageRequest.of(page,size),findQuestionCategory);
    }

    public Page<Question> search(int page, int size, String keyword)  {
        return questionRepository.findAllByContentContaining(PageRequest.of(page, size), keyword);
    }

    public Page<Question> searchByQuestionCategoryAndKeyword(int page,
                                                             int size,
                                                             String questionCategory,
                                                             String keyword) {
        QuestionCategory findQuestionCategory = questionCategoryRepository.findByName(questionCategory);

        return questionRepository.findAllByQuestionCategoryAndContentContaining(PageRequest.of(page, size),
                findQuestionCategory, keyword);
    }

    public Page<Question> searchByKeyword(int page, int size, String keyword) {
        return questionRepository.findAllByContentContaining(PageRequest.of(page,size), keyword);
    }
}
