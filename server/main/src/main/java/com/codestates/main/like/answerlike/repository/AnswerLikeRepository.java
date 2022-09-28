package com.codestates.main.like.answerlike.repository;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.like.answerlike.entity.AnswerLike;
import com.codestates.main.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerLikeRepository extends JpaRepository<AnswerLike, Long> {
    Optional<AnswerLike> findByAnswerAndMember(Answer answer, Member member);
}
