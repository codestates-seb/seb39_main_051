package com.codestates.main.mail;

import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.service.SubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender javaMailSender;
    private MemberService memberService;
    private SubscriptionService subscriptionService;
    @Scheduled(cron = "*/20 * * * * *")
    public void scheduleTest(){
        List<Member> members = memberService.findMembers();

        for(Member member : members){
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(member.getEmail());
            List<Subscription> subscriptions = subscriptionService.findMemberSubscriptions(member);
            simpleMailMessage.setSubject("제목");
            simpleMailMessage.setText("내용");
            System.out.println(simpleMailMessage.toString());
            javaMailSender.send(simpleMailMessage);
        }

        System.out.println(LocalDateTime.now());
    }
}
