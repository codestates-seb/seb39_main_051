package com.codestates.main.mail;

import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.service.QuestionService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.service.SubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
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
    private QuestionService questionService;
    @Scheduled(cron = "*/60 * * * * *")     // 00/20/40 초 마다
    //@Scheduled(cron = "0 0 8 ? * MON-FRI") //실제 서비스 시 (주말 제외 모든 요일에 아침 8시)
    public void scheduleTest() throws MessagingException {
        List<Member> members = memberService.findMembers();

        for(Member member : members){
            List<Subscription> subscriptions = subscriptionService.findActiveMemberSubscriptions(member);
            if(subscriptions.size()==0){
                System.out.println("유저의 구독 정보가 없음");
                continue;
            }
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mailHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");
            mailHelper.setFrom("MaeilMail <shb03207@naver.com>");
            mailHelper.setTo(member.getEmail());

            mailHelper.setSubject("안녕하세요, "+member.getNickname()+"님!");

            StringBuilder sb = new StringBuilder();
            sb.append("<p><span style=\"font-size: 30px;\">안녕하세요, <strong>").append(member.getNickname()).append("</strong> 님, 매일메일 입니다.</span></p>");
            sb.append("<p><br></p>");
            sb.append("<p><span style=\"font-size: 20px;\">현재 <strong>").append(member.getNickname()).append("</strong> 님이 구독 중인 카테고리 :&nbsp;</span></p>");
            for(Subscription subscription : subscriptions){

                long received = subscription.getReceived();
                int size = 2;
                QuestionCategory questionCategory = subscription.getQuestionCategory();
                PageRequest pageRequest = PageRequest.of((int) received,size);                                   // received 부터 size 개 전송
                List<Question> questions = questionService.findByQuestionCategory(questionCategory,pageRequest);
                //sb.append(questionCategory.getName()).append("\n");
                sb.append("<p><strong>").append(questionCategory.getName()).append("</strong></p>");
                sb.append("<ol>");
                for(Question question : questions){
                    sb.append("<li>").append(question.getContent()).append(" &nbsp;<a href=\"http://www.google.com\">답변하러 가기</a></li>");
                    // 이곳에서 주소 추가
                }
                sb.append("</ol>");
                subscription.setReceived(received+size);
                subscriptionService.createSubscription(subscription);

            }
            mailHelper.setText(sb.toString(),true);
            javaMailSender.send(mimeMessage);
            break; // 1명만 보냄
        }

        System.out.println(LocalDateTime.now());
    }
}
