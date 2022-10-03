package com.codestates.main.member.service;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final SubscriptionService subscriptionService;
    @Value("src\\main\\resources\\file\\images\\default.png")
    private String defaultFilePath;
    public Member createMember(Member member) {
        String email = member.getEmail();
        Member checkMember = findMember(email);
        if(checkMember!=null){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        String password = member.getPassword();
        member.setPassword(bCryptPasswordEncoder.encode(password));
        member.setRole(Member.ROLE.ROLE_USER);
        member.setPicture(System.getProperty("user.dir")
                + File.separator
                +defaultFilePath);
        return memberRepository.save(member);
    }

    public Member createAdmin(Member member) {
        String email = member.getEmail();
        Member checkMember = findMember(email);
        if(checkMember!=null){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        String password = member.getPassword();
        member.setPassword(bCryptPasswordEncoder.encode(password));
        member.setRole(Member.ROLE.ROLE_ADMIN);
        member.setPicture(System.getProperty("user.dir")
                + File.separator
                +defaultFilePath);
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findMemberByEmail(member.getEmail());

        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(bCryptPasswordEncoder.encode(member.getPassword())));
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(member.getNickname()));
        Optional.ofNullable(member.getPicture())
                .ifPresent(picture -> findMember.setPicture(member.getPicture()));

        return memberRepository.save(findMember);
    }

    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findMemberByEmail(String email){
        Optional<Member> optionalMember =
                Optional.ofNullable(memberRepository.findByEmail(email));
        return optionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.JWT_TOKEN_NOT_FOUND));
    }

    public Member findMember(String email) {
        return memberRepository.findByEmail(email);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Member findMemberWithActiveSubscription(long memberId){
        Member findMember = findVerifiedMember(memberId);
        List<Subscription> subscriptions = subscriptionService.findActiveMemberSubscriptions(findMember);
        findMember.setSubscriptions(subscriptions);
        return findMember;
    }

    public Member findMemberWithActiveSubscription(String email){
        Member findMember = findMemberByEmail(email);
        List<Subscription> subscriptions = subscriptionService.findActiveMemberSubscriptions(findMember);
        findMember.setSubscriptions(subscriptions);
        return findMember;
    }
}
