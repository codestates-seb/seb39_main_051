package com.codestates.main.member.mapper;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public interface MemberMapper {
    MemberDTO.Post memberToMemberPostDTO(Member member);
    Member memberPostDTOToMember(MemberDTO.Post memberPostDTO);
}
