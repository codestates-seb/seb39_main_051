package com.codestates.main.like.answerlike.entity;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AnswerLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    public void setMember(Member member) {
        this.member = member;
        member.setAnswerLikes(this);
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
        answer.setAnswerLikes(this);
    }
}
