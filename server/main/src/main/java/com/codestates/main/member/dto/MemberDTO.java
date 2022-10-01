package com.codestates.main.member.dto;

import com.codestates.main.member.entity.Member;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class MemberDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class JwtResponse{
        private long id;
        private String email;
        private String nickname;
        private Member.ROLE role;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private String email;
        private String password;
        private String nickname;
        //private Member.ROLE role;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long id;
        private String email;
        private String nickname;
        private Member.ROLE role;
        private LocalDateTime createdDate;
        private List<Subscription> subscriptions;

        public Response(Member member) {
            this.id = member.getMemberId();
            this.email = member.getEmail();
            this.nickname = member.getNickname();
            this.role = member.getRole();
            this.createdDate = member.getCreatedAt();
            this.subscriptions = member.getSubscriptions();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private String email;
        private String password;
        private String nickname;
    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Login {
        private String email;
        private String password;
    }
}
