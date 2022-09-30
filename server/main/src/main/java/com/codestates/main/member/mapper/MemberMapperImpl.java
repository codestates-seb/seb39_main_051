package com.codestates.main.member.mapper;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.subscription.entity.Subscription;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class MemberMapperImpl implements MemberMapper{

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
        Member.ROLE role = null;
        LocalDateTime createdDate = null;
        List<Subscription> subscriptionList = null;
        if ( member.getMemberId()!=0L ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        nickname = member.getNickname();
        role = member.getRole();
        createdDate = member.getCreatedAt();
        subscriptionList = member.getSubscriptions();
        return new MemberDTO.Response(memberId, email, nickname, role,createdDate, subscriptionList);
        //return new MemberDTO.Response(memberId, email, nickname);
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
}
