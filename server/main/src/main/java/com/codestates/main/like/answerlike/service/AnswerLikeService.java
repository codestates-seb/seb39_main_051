package com.codestates.main.like.answerlike.service;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.answer.service.AnswerService;
import com.codestates.main.config.SecurityUtils;
import com.codestates.main.like.answerlike.entity.AnswerLike;
import com.codestates.main.like.answerlike.repository.AnswerLikeRepository;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerLikeService {

    private final AnswerLikeRepository answerLikeRepository;
    private final MemberService memberService;
    private final AnswerService answerService;
    public boolean postLike(Long answerId) {
        Answer findAnswer = answerService.findAnswer(answerId);
        Member findMember = SecurityUtils.getCurrentMember(memberService);
        Optional<AnswerLike> optionalAnswerLike = answerLikeRepository.findByAnswerAndMember(findAnswer, findMember);

        optionalAnswerLike.ifPresentOrElse(
                answerLike -> {
                    answerLikeRepository.delete(answerLike);
                    findAnswer.discountLike(answerLike);
                    findAnswer.updateLikeCount();
                },
                () -> {
                    AnswerLike answerLike = AnswerLike.builder().build();

                    answerLike.setAnswer(findAnswer);
                    answerLike.setMember(findMember);
                    findAnswer.updateLikeCount();

                    answerLikeRepository.save(answerLike);
                }
        );

        if (optionalAnswerLike.isPresent())
            return false;
        else
            return true;
    }
}
