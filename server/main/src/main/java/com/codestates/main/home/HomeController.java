package com.codestates.main.home;

import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class HomeController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @GetMapping("/home")
    public String home(){
        return "home";
    }

    @GetMapping("/subscription")
    public ResponseEntity getMember(){
        long memberId = 1;
        Member member = memberService.findMemberWithActiveSubscription(memberId);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(member);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
