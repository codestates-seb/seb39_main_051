package com.codestates.main.questionCategory.entity;

import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.question.entity.Question;
import com.codestates.main.subscription.entity.Subscription;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class QuestionCategory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long questionCategoryId;

    @Column(nullable = false)
    private String name;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @OneToMany(mappedBy = "subscriptionId")
    private List<Subscription> subscriptions;

    @OneToMany(mappedBy = "questionId")
    private List<Question> questions;
}
