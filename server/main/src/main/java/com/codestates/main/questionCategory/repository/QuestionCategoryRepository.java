package com.codestates.main.questionCategory.repository;


import com.codestates.main.questionCategory.entity.QuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionCategoryRepository extends JpaRepository<QuestionCategory, Long> {
    QuestionCategory findByQuestionCategoryId(long questionCategoryId);
}
