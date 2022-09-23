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

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final MemberRepository memberRepository;
    @PostConstruct
    public void init(){
        Member member = Member.builder()
                .memberId(1)
                .email("admin@naver.com")
                .nickname("관리자")
                .password("1234")
                //.role(Member.ROLE.MEMBER_ADMIN)
                .roles("ROLE_USER")
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

//    @PostMapping("/login")
//    public ResponseEntity login(@RequestBody MemberDTO.Login requestBody){
//        Member member = memberService.findMember(requestBody.getEmail());
//        if(member==null){
//            return new ResponseEntity<>("존재하지 않는 유저 입니다.",HttpStatus.NOT_FOUND);
//        }
//        if (!bCryptPasswordEncoder.matches(requestBody.getPassword(), member.getPassword())) {
//            return new ResponseEntity<>("비밀번호가 일치하지 않습니다.",HttpStatus.NOT_FOUND);
//        }
//        Date expiredAt = new Date(System.currentTimeMillis()+1000*60*10);
//        Map<String,Object> claims = new HashMap<>();
//        claims.put("email",member.getEmail());
//        String jwtToken = jwtTokenizer.generateAccessToken(claims,
//                                        "jwtToken"
//                                        ,expiredAt
//                                        ,jwtTokenizer.encodeBase64SecretKey(secretKey));
//        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(member);
//        return new ResponseEntity<>("hi",HttpStatus.OK);
//    }
    @PostMapping("/join")
    public String join(@RequestBody Member member) {
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        //member.setRole(Member.ROLE.MEMBER_ADMIN);
        member.setRoles("ROLE_USER");
        memberRepository.save(member);
        return "회원 가입 완료";
    }
}
