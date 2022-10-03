package com.codestates.main.question.repository;

import com.codestates.main.question.entity.Question;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findByQuestionCategory(PageRequest pageRequest, QuestionCategory questionCategory);
    List<Question> findByQuestionCategory(QuestionCategory questionCategory);

    Page<Question> findAllByQuestionCategory(Pageable pageable, QuestionCategory questionCategory);

    Page<Question> findAllByContentContaining(Pageable pageable, String keyword);
}
