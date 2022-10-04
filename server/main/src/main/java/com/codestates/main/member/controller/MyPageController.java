package com.codestates.main.member.controller;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.jwt.JwtTokenizer;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.mapper.MemberMapper;
import com.codestates.main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;


@RequiredArgsConstructor
@RestController
@RequestMapping("/my-page")
public class MyPageController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;

    @GetMapping("/test")
    public String getTest(){
        return "security test";
    }

    @GetMapping
    public ResponseEntity getMemberProfile(){
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String email = String.valueOf(user.getPrincipal().toString());
        Member member = memberService.findMemberByEmail(email);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(member);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PatchMapping("/patch")
    public ResponseEntity patchMember(@RequestBody MemberDTO.Patch requestBody){
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String email = String.valueOf(user.getPrincipal().toString());

        Member member = memberMapper.memberPatchDTOToMember(requestBody);
        member.setEmail(email);
        Member updatedAnswer = memberService.updateMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(updatedAnswer);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity postImage(@RequestParam("files") MultipartFile multipartFile) throws IOException {
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String email = String.valueOf(user.getPrincipal().toString());

        Member member = memberService.findMemberByEmail(email);
        String filePath="resources"+File.separator+"images";
        String contentType = multipartFile.getContentType();
        String originalFileExtension;
        String current = System.getProperty("user.dir");
        String path = current+ File.separator+filePath+File.separator;  // 실제 파일이 저장되는 위치
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
        if(ObjectUtils.isEmpty(contentType)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            if(contentType.contains("image/jpeg")){
                originalFileExtension = ".jpg";
            }
            else if(contentType.contains("image/png")){
                originalFileExtension = ".png";
            }
            else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }

        System.out.println(path);

        file = new File(path, member.getMemberId()+originalFileExtension); // 경로/파일.type\
        if(file.exists()){
            System.out.println("exits");
            if(file.delete()){
                System.out.println("deleted");
            }
        }
        multipartFile.transferTo(file);
        member.setPicture(path+member.getMemberId()+originalFileExtension);
        memberService.updateImage(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(member);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
}
