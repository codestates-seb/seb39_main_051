package com.codestates.main.questionCategory.service;

import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.repository.QuestionCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionCategoryService {
    private final QuestionCategoryRepository questionCategoryRepository;
    public QuestionCategory createQuestionCategory(QuestionCategory questionCategory){
        return questionCategoryRepository.save(questionCategory);
    }

    public QuestionCategory findQuestionCategory(long questionCategoryId) {
        return questionCategoryRepository.findByQuestionCategoryId(questionCategoryId);
    }
}
