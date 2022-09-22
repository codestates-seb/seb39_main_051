package com.codestates.main.member.controller;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberMapper memberMapper;

    public MemberController(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @PostMapping("/")
    public ResponseEntity postMember(@RequestBody MemberDTO.Post requestBody){
        Member member = memberMapper.memberPostDTOToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(createdMember);

        return ResponseEntity<response>;
    }

}
