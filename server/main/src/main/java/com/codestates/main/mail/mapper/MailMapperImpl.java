package com.codestates.main.mail.mapper;

import com.codestates.main.mail.dto.MailDTO;
import com.codestates.main.mail.entity.MailAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class MailMapperImpl implements MailMapper{
    @Override
    public MailAuth mailPostDTOtoMailAuth(MailDTO.POST mailPostDTO) {
        if(mailPostDTO==null){
            return null;
        }
        MailAuth mailAuth = new MailAuth();
        mailAuth.setEmail(mailPostDTO.getEmail());
        return mailAuth;
    }

    @Override
    public MailDTO.Response mailToMailResponseDTO(MailAuth mailAuth) {
        if(mailAuth == null){
            return null;
        }
        String email = null;
        LocalDateTime sendAt = null;
        email = mailAuth.getEmail();
        sendAt = mailAuth.getSendAt();

        return new MailDTO.Response(email,sendAt);
    }

    @Override
    public MailAuth mailAuthDTOtoMailAuth(MailDTO.Auth mailAuthDTO) {
        if(mailAuthDTO==null){
            return null;
        }
        MailAuth mailAuth = new MailAuth();
        mailAuth.setEmail(mailAuthDTO.getEmail());
        mailAuth.setCertificationNumber(mailAuthDTO.getCertificationNumber());
        return mailAuth;
    }

    @Override
    public MailDTO.AuthResponse mailToMailAuthResponseDTO(MailAuth mailAuth) {
        if(mailAuth == null){
            return null;
        }
        String email = null;
        MailAuth.Authed certified = null;
        email = mailAuth.getEmail();
        certified = mailAuth.getAuthed();

        return new MailDTO.AuthResponse(email,certified);
    }

}
