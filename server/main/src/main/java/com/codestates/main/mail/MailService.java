package com.codestates.main.mail;

import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.service.SubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender javaMailSender;
    private MemberService memberService;
    private SubscriptionService subscriptionService;
    @Scheduled(cron = "*/20 * * * * *")     // 00/20/40 초 마다
    //@Scheduled(cron = "0 0 8 ? * MON-FRI *") 실제 서비스 시 (주말 제외 모든 요일에 아침 8시)
    public void scheduleTest() throws MessagingException {
        List<Member> members = memberService.findMembers();

        for(Member member : members){
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mailHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");
            mailHelper.setFrom("MaeilMail <MaeilMail shb03207@naver.com>");
            mailHelper.setTo(member.getEmail());

            mailHelper.setSubject("안녕하세요, "+member.getNickname()+"님!");
            //SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            //simpleMailMessage.setTo(member.getEmail());
            List<Subscription> subscriptions = subscriptionService.findMemberSubscriptions(member);
            //simpleMailMessage.setSubject("안녕하세요, "+member.getNickname()+"님!");
            StringBuilder sb = new StringBuilder();
            sb.append("[오늘의 질문입니다]\n");
            sb.append("[현재 구독 중인 카테고리]\n");
            for(Subscription subscription : subscriptions){
                QuestionCategory questionCategory = subscription.getQuestionCategory();
                sb.append(questionCategory.getName()).append("\n");
                // 이곳에서 주소 추가
                sb.append("해당 카테고리의 질문 ~~ \n");
            }
            mailHelper.setText(sb.toString());
            //simpleMailMessage.setText(sb.toString());
            //simpleMailMessage.setFrom("everydaymail@naver.com");
            //javaMailSender.send(simpleMailMessage);
            javaMailSender.send(mimeMessage);
            break; // 1명만 보냄
        }
        Member member = members.get(0);



        System.out.println(LocalDateTime.now());
    }
}
