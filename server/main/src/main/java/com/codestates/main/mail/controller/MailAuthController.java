package com.codestates.main.mail.controller;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.mail.dto.MailDTO;
import com.codestates.main.mail.entity.MailAuth;
import com.codestates.main.mail.mapper.MailMapper;
import com.codestates.main.mail.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mailAuth")
public class MailAuthController {
    private final MailMapper mailMapper;
    private final MailService mailService;

    @PostMapping("/createMailAuth")
    public ResponseEntity createMailAuth(@RequestBody MailDTO.POST requestBody) throws MessagingException {
        System.out.println(requestBody);
        MailAuth mailAuth = mailMapper.mailPostDTOtoMailAuth(requestBody);
        MailAuth createdMailAuth = mailService.sendAuthMail(mailAuth);
        MailDTO.Response response = mailMapper.mailToMailResponseDTO(createdMailAuth);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/verifyMailAuth")
    public ResponseEntity verifyMailAuth(@RequestBody MailDTO.Auth requestBody){
        MailAuth mailAuth = mailMapper.mailAuthDTOtoMailAuth(requestBody);
        MailAuth verified = mailService.authMail(mailAuth);

        if(verified==null){
            return new ResponseEntity<>(ExceptionCode.AUTH_NOT_FOUND,HttpStatus.BAD_REQUEST);
        }
        MailDTO.AuthResponse response = mailMapper.mailToMailAuthResponseDTO(verified);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
}
