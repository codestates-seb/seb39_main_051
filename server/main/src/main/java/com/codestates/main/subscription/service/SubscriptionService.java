package com.codestates.main.subscription.service;

import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    public void createSubscription(Subscription subscription){
        subscriptionRepository.save(subscription);
    }

    public void createNewSubscription(Subscription subscription){
        subscription.setStatus(Subscription.STATUS.SUBSCRIPTION_ACTIVE);
        subscriptionRepository.save(subscription);
    }

    public List<Subscription> findActiveMemberSubscriptions(Member member){
        return subscriptionRepository.findSubscriptionsByMemberAndStatus(member, Subscription.STATUS.SUBSCRIPTION_ACTIVE);
    }

    public Subscription findSubscriptionInfo(Member member, QuestionCategory questionCategory) {
        Subscription subscription = subscriptionRepository.findSubscriptionsByMemberAndQuestionCategory(member, questionCategory);

        if (subscription == null) {
            Subscription createdSubscription = new Subscription();
            createdSubscription.setMember(member);
            createdSubscription.setQuestionCategory(questionCategory);
            createNewSubscription(createdSubscription);
            return createdSubscription;
        } else {

            Subscription.STATUS status = subscription.getStatus();
            System.out.println(status);
            if (status.equals(Subscription.STATUS.SUBSCRIPTION_ACTIVE)) {
                subscription.setStatus(Subscription.STATUS.SUBSCRIPTION_DEACTIVATED);
            } else {
                subscription.setStatus(Subscription.STATUS.SUBSCRIPTION_ACTIVE);
            }
            createSubscription(subscription);
            return subscription;
        }
    }
}
