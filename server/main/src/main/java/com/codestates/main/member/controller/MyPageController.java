package com.codestates.main.member.controller;

import com.codestates.main.jwt.JwtTokenizer;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/my-page")
public class MyPageController {
    @Value("${jwt.secret-key}")
    private String secretKey;
    private final MemberMapper memberMapper;
    private final MemberService memberService;

    private final JwtTokenizer jwtTokenizer;

    @PatchMapping("/patch")
    public ResponseEntity patchMember(@RequestBody MemberDTO.Patch requestBody,
                                      @RequestHeader HttpHeaders headers){
        System.out.println(headers.toSingleValueMap().toString());
        String a = headers.get("authorization").toString();
        System.out.println(jwtTokenizer.getClaims(a,secretKey));

//        for(String data : a){
//            System.out.println(data);
//        }
        Member member = memberMapper.memberPatchDTOToMember(requestBody);
        Member updatedAnswer = memberService.updateMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(updatedAnswer);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity postImage(@RequestParam("files") MultipartFile multipartFile) {
        return null;

    }
}
