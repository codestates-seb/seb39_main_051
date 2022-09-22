package com.codestates.main.member.mapper;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;

public class MemberMapperImpl implements MemberMapper{

    @Override
    public MemberDTO.Post memberToMemberPostDTO(Member member) {
        if(member==null){
            return null;
        }
        long memberId = 0L;
        String email = null;
        String password = null;
        String nickname = null;
        Member.ROLE role = null;

        if ( member.getMemberId()!=0L ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        nickname = member.getNickname();
        password = member.getPassword();
        role = member.getRole();

        return new MemberDTO.Post( memberId, email, nickname, password, role);
    }

    @Override
    public Member memberPostDTOToMember(MemberDTO.Post memberPostDTO) {
        if(memberPostDTO==null){
            return null;
        }
        Member member = new Member();
        member.setMemberId(memberPostDTO.getId());
        member.setEmail(memberPostDTO.getEmail());
        member.setPassword(memberPostDTO.getPassword());
        member.setNickname(memberPostDTO.getNickname());
        member.setRole(memberPostDTO.getRole());
        return member;
    }
}
