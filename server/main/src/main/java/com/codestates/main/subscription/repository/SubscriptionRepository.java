package com.codestates.main.subscription.repository;

import com.codestates.main.member.entity.Member;
import com.codestates.main.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    List<Subscription> findSubscriptionsByMember(Member member);
}
