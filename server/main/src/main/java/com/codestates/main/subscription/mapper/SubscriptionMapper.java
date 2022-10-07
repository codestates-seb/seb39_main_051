package com.codestates.main.subscription.mapper;

import com.codestates.main.subscription.dto.SubscriptionDTO;
import com.codestates.main.subscription.entity.Subscription;

public interface SubscriptionMapper {
    Subscription SubscriptionPostDtoToSubscription(SubscriptionDTO.Post requestBody);

    SubscriptionDTO.Response subscriptionToSubscriptionResponseDTO(Subscription subscription);
}
