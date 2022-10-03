package com.codestates.main.member.mapper;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.subscription.dto.SubscriptionDTO;
import com.codestates.main.subscription.entity.Subscription;
import com.codestates.main.subscription.mapper.SubscriptionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberMapperImpl implements MemberMapper{
    private final SubscriptionMapper subscriptionMapper;
    @Override
    public MemberDTO.Post memberToMemberPostDTO(Member member) {
        if(member==null){
            return null;
        }
        String email = null;
        String password = null;
        String nickname = null;

        email = member.getEmail();
        nickname = member.getNickname();
        password = member.getPassword();

        return new MemberDTO.Post(email, nickname, password);
    }

    @Override
    public Member memberPostDTOToMember(MemberDTO.Post memberPostDTO) {
        if(memberPostDTO==null){
            return null;
        }
        Member member = new Member();
        //member.setMemberId(memberPostDTO.getId());
        member.setEmail(memberPostDTO.getEmail());
        member.setPassword(memberPostDTO.getPassword());
        member.setNickname(memberPostDTO.getNickname());
        //member.setRole(memberPostDTO.getRole());
        return member;
    }

    @Override
    public MemberDTO.Response memberToMemberResponseDTO(Member member) {
        if(member==null){
            return null;
        }
        long memberId = 0L;
        String email = null;
        String nickname = null;
        String picture = null;
        Member.ROLE role = null;
        LocalDateTime createdDate = null;
        List<Subscription> subscriptionList = null;
        List<SubscriptionDTO.Response> response = new ArrayList<>();
        if ( member.getMemberId()!=0L ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        nickname = member.getNickname();
        picture = member.getPicture();
        role = member.getRole();
        createdDate = member.getCreatedAt();
        subscriptionList = member.getSubscriptions();
        System.out.println(subscriptionList.toString());
        for(Subscription subscription : subscriptionList){
            response.add(subscriptionMapper.subscriptionToSubscriptionResponseDTO(subscription));
        }

        return new MemberDTO.Response(memberId, email, nickname, picture, role,createdDate, response);
    }

    @Override
    public Member memberPatchDTOToMember(MemberDTO.Patch memberPatchDTO) {

        if(memberPatchDTO==null){
            return null;
        }
        Member member = new Member();
        member.setEmail(memberPatchDTO.getEmail());
        member.setPassword(memberPatchDTO.getPassword());
        member.setNickname(memberPatchDTO.getNickname());
        //member.setRole(memberPostDTO.getRole());
        return member;

    }

    @Override
    public Member memberLoginDTOToMember(MemberDTO.Login memberLoginDTO) {
        if(memberLoginDTO==null){
            return null;
        }
        Member member = new Member();
        //member.setMemberId(memberPostDTO.getId());
        member.setEmail(memberLoginDTO.getEmail());
        member.setPassword(memberLoginDTO.getPassword());
        //member.setRole(memberPostDTO.getRole());
        return member;
    }

    @Override
    public MemberDTO.JwtResponse memberToMemberJwtResponseDTO(Member member){
        if(member==null){
            return null;
        }
        long memberId = 0L;
        String email = null;
        String nickname = null;
        Member.ROLE role = null;
        String picture = null;
        if ( member.getMemberId()!=0L ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        nickname = member.getNickname();
        role = member.getRole();
        picture = member.getPicture();
        return new MemberDTO.JwtResponse(memberId, email, nickname, picture, role);
    }
}
