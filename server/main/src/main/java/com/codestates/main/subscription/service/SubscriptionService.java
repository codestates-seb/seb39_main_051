package com.codestates.main.subscription.service;

import com.codestates.main.member.entity.Member;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    public void createSubscription(Subscription subscription){
        subscriptionRepository.save(subscription);
    }

    public List<Subscription> findMemberSubscriptions(Member member){
        return subscriptionRepository.findSubscriptionsByMember(member);
    }
}
