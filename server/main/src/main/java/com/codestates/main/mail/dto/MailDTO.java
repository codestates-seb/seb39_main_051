package com.codestates.main.mail.dto;

import com.codestates.main.mail.entity.MailAuth;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class MailDTO {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class POST{
        private String email;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String email;
        private LocalDateTime sendAt;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Auth{
        private String email;
        private String certificationNumber;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthResponse{
        private String email;
        private MailAuth.Authed certified;
    }
}
