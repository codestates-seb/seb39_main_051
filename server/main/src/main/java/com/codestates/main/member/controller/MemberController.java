package com.codestates.main.member.controller;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.filter.JwtAuthenticationFilter;
import com.codestates.main.jwt.JwtTokenizer;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.service.QuestionCategoryService;
import com.codestates.main.subscription.dto.SubscriptionDTO;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.service.SubscriptionService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.servlet.headers.HeadersSecurityMarker;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;

    private final QuestionCategoryService questionCategoryService;

    private final SubscriptionService subscriptionService;
    private final JwtTokenizer jwtTokenizer;
    @PostConstruct
    public void init(){
        Member member = Member.builder()
                .email("shb03207@naver.com")
                .nickname("관리자")
                .password("1234")
                .role(Member.ROLE.ROLE_ADMIN)
                .build();
        memberService.createAdmin(member);
        Subscription subscription = Subscription.builder().build();
        member = Member.builder()
                .email("shb03207@gmail.com")
                .nickname("유저")
                .password("1234")
                .build();
        memberService.createMember(member);
    }

    @PostMapping("/post")
    public ResponseEntity<Object> postMember(@RequestBody MemberDTO.Post requestBody) throws BusinessLogicException {
        Member member = memberMapper.memberPostDTOToMember(requestBody);
        Member createdMember;
        try{
            createdMember = memberService.createMember(member);
        }catch (BusinessLogicException businessLogicException ){
            return new ResponseEntity<>(ExceptionCode.MEMBER_EXISTS,HttpStatus.NOT_FOUND);
        }

        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(createdMember);


        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/subscription")
    public ResponseEntity postSubscription(@RequestBody SubscriptionDTO.Post requestBody,
                                           @RequestHeader(value = "Authorization") String jwtHeader){
        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            return new ResponseEntity<>(ExceptionCode.JWT_TOKEN_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        long memberId = jwtTokenizer.getMemberIdFromJwtHeader(jwtHeader);
        long questionCategoryId = requestBody.getQuestionCategoryId();
        Member member = memberService.findVerifiedMember(memberId);
        QuestionCategory questionCategory = questionCategoryService.findQuestionCategory(questionCategoryId);
        Subscription subscription = subscriptionService.findSubscriptionInfo(member,questionCategory);
//        Subscription subscription = new Subscription();
//        subscription.setMember(member);
//        subscription.setQuestionCategory(questionCategory);
        //subscriptionService.createSubscription(subscription);
        return new ResponseEntity<>(subscription,HttpStatus.CREATED);
    }

}
