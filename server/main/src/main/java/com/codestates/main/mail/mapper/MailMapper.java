package com.codestates.main.mail.mapper;

import com.codestates.main.mail.dto.MailDTO;
import com.codestates.main.mail.entity.MailAuth;
import org.springframework.stereotype.Component;

@Component
public interface MailMapper {

    MailAuth mailPostDTOtoMailAuth(MailDTO.POST requestBody);

    MailDTO.Response mailToMailResponseDTO(MailAuth mailAuth);

    MailAuth mailAuthDTOtoMailAuth(MailDTO.Auth requestBody);

    MailDTO.AuthResponse mailToMailAuthResponseDTO(MailAuth verified);
}
