package com.codestates.main.question.entity;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String content;

//    @ManyToOne
//    @JoinColumn(name = "QUESTION_CATEGORY_ID")
//    private QuestionCategory questionCategory;

//    @OneToMany(mappedBy = "question")
//    private List<Answer> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

//    public void addAnswer(Answer answer) {
//        this.answers.add(answer);
//    }

    public void addMember(Member member) {
        this.member = member;
    }
}
