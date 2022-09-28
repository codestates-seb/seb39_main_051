package com.codestates.main.subscription.service;

import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    public void createSubscription(Subscription subscription){
        subscriptionRepository.save(subscription);
    }
}
