package com.codestates.main.member.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RequiredArgsConstructor
@RestController
@RequestMapping("/my-page")
public class MyPageController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.url}")
    private String s3Url;
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
    public ResponseEntity<Object> upload(@RequestParam("files") MultipartFile files) throws Exception {
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String email = String.valueOf(user.getPrincipal().toString());
        Member member = memberService.findMemberByEmail(email);

        String originalContentType = files.getContentType();
        String originalFileExtension;

        if(ObjectUtils.isEmpty(originalContentType)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        if(originalContentType.contains("image/jpeg")){
            originalFileExtension = ".jpg";
        }
        else if(originalContentType.contains("image/png")){
            originalFileExtension = ".png";
        }
        else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        String originalName = member.getMemberId()+originalFileExtension; // 파일 이름
        long size = files.getSize(); // 파일 크기

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(files.getContentType());
        objectMetaData.setContentLength(size);
        System.out.println("Content Type: "+files.getContentType());
        System.out.println("Original Name: "+originalName);
        //S3에 업로드
        String s3Bucket = "maeil-mail";
        amazonS3Client.putObject(
                new PutObjectRequest(s3Bucket, originalName, files.getInputStream(), objectMetaData)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        String imagePath = amazonS3Client.getUrl(s3Bucket, originalName).toString(); // 접근가능한 URL 가져오기
        member.setPicture(s3Url+originalName);
        memberService.updateMember(member);
        return new ResponseEntity<>(imagePath, HttpStatus.OK);
    }

}
