package com.codestates.main.answer.entity;

import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.comment.entity.Comment;
import com.codestates.main.like.answerlike.entity.AnswerLike;
import com.codestates.main.member.entity.Member;
import com.codestates.main.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(nullable = false)
    private String content;

    private long likeCount;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "answer")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "answer", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<AnswerLike> answerLikes = new ArrayList<>();

    public void setAnswerLikes(AnswerLike answerLike) {
        this.answerLikes.add(answerLike);
    }

    public void addQuestion(Question question) {
        this.question = question;
        question.getAnswers().add(this);
    }

    public void discountLike(AnswerLike answerLike) {
        this.answerLikes.remove(answerLike);
    }

    public void updateLikeCount() {
        this.likeCount = (long) this.answerLikes.size();
    }
}
