package com.codestates.main.question.repository;

import com.codestates.main.question.entity.Question;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    Page<Question> findAllByQuestionCategory(Pageable pageable, QuestionCategory questionCategory);
}
