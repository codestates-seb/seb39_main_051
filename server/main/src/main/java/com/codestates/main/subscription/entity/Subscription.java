package com.codestates.main.subscription.entity;

import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subscriptionId;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @ManyToOne
    private Member member;

    @ManyToOne
    private QuestionCategory questionCategory;
}
