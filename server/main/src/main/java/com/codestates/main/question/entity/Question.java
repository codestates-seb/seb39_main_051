package com.codestates.main.question.entity;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class Question extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "QUESTION_CATEGORY_ID")
    private QuestionCategory questionCategory;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    public void addAnswer(Answer answer) {
        this.answers.add(answer);
    }
    public void addQuestionCategory(QuestionCategory questionCategory) {
        this.questionCategory = questionCategory;
        questionCategory.getQuestions().add(this);
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
