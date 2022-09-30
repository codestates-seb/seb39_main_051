package com.codestates.main.subscription.repository;

import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    List<Subscription> findSubscriptionsByMemberAndStatus(Member member, Subscription.STATUS status);
    Subscription findSubscriptionsByMemberAndQuestionCategory(Member member, QuestionCategory questionCategory);

}
