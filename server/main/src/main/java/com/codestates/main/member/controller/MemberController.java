package com.codestates.main.member.controller;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.filter.JwtAuthenticationFilter;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.servlet.headers.HeadersSecurityMarker;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @PostConstruct
    public void init(){
        Member member = Member.builder()
                .memberId(1)
                .email("admin@naver.com")
                .nickname("관리자")
                .password("1234")
                .role(Member.ROLE.MEMBER_ADMIN)
                .build();
        memberService.createMember(member);
    }
    @GetMapping("/get")
    public String get(){
        return "hello";
    }

    @PostMapping("/token")
    public String P(){
        return "hello";
    }

    @PostMapping("/post")
    public ResponseEntity<Object> postMember(@RequestBody MemberDTO.Post requestBody) throws BusinessLogicException {
        Member member = memberMapper.memberPostDTOToMember(requestBody);
        Member createdMember;
        try{
            createdMember = memberService.createMember(member);
        }catch (BusinessLogicException businessLogicException ){
            return new ResponseEntity<>("USER EXISTS",HttpStatus.NOT_FOUND);
        }

        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(createdMember);


        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/patch")
    public ResponseEntity patchMember(@RequestBody MemberDTO.Patch requestBody){
        Member member = memberMapper.memberPatchDTOToMember(requestBody);
        Member updatedAnswer = memberService.updateMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(updatedAnswer);

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

}
