package com.codestates.main.member.controller;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.service.QuestionCategoryService;
import com.codestates.main.subscription.dto.SubscriptionDTO;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.mapper.SubscriptionMapper;
import com.codestates.main.subscription.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;

    private final QuestionCategoryService questionCategoryService;

    private final SubscriptionService subscriptionService;

    private final SubscriptionMapper subscriptionMapper;

    @PostMapping("/post")
    public ResponseEntity<Object> postMember(@RequestBody MemberDTO.Post requestBody) throws BusinessLogicException {
        Member member = memberMapper.memberPostDTOToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(createdMember);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/subscription")
    public ResponseEntity postSubscription(@RequestBody SubscriptionDTO.Post requestBody){

        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String email = String.valueOf(user.getPrincipal());
        Member member = memberService.findMemberByEmail(email);

        long questionCategoryId = requestBody.getQuestionCategoryId();

        QuestionCategory questionCategory = questionCategoryService.findQuestionCategory(questionCategoryId);
        Subscription subscription = subscriptionService.findSubscriptionInfo(member,questionCategory);
        SubscriptionDTO.Response response = subscriptionMapper.subscriptionToSubscriptionResponseDTO(subscription);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
}
