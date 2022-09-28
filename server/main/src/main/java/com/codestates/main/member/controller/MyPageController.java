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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@RequiredArgsConstructor
@RestController
@RequestMapping("/my-page")
public class MyPageController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;

    private final JwtTokenizer jwtTokenizer;

    @Value("src\\main\\resources\\file\\images")
    private String filePath;

    @PatchMapping("/patch")
    public ResponseEntity patchMember(@RequestBody MemberDTO.Patch requestBody,
                                      @RequestHeader(value = "Authorization") String jwtHeader){
        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            return new ResponseEntity<>(ExceptionCode.JWT_TOKEN_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        long memberId = jwtTokenizer.getMemberIdFromJwtHeader(jwtHeader);
        Member member = memberMapper.memberPatchDTOToMember(requestBody);
        member.setMemberId(memberId);
        Member updatedAnswer = memberService.updateMember(member);
        MemberDTO.Response response = memberMapper.memberToMemberResponseDTO(updatedAnswer);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity postImage(@RequestParam("files") MultipartFile multipartFile) throws IOException {
                                    //@RequestHeader(value = "Authorization") String jwtHeader) {
//        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
//            return new ResponseEntity<>(ExceptionCode.JWT_TOKEN_NOT_FOUND, HttpStatus.BAD_REQUEST);
//        }
//
//        long memberId = jwtTokenizer.getMemberIdFromJwtHeader(jwtHeader);
        long memberId=3;
        String originName = multipartFile.getOriginalFilename();
        String type = originName.split("\\.")[1];
        String path = System.getProperty("user.dir")
                        +File.separator
                        +filePath;
        System.out.println(path);
        //System.out.println(path+"\\resources\\file\\images");

        File newFile = new File(path, memberId+"."+type); // 경로/파일.type\
        if(!newFile.exists()){
            try {
                if (newFile.createNewFile()){
                    System.out.println("파일 생성 성공");
                    multipartFile.transferTo(newFile);
                }
                else
                    System.out.println("파일 생성 실패");
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {	// 파일이 존재한다면
            if(newFile.delete()){
                multipartFile.transferTo(newFile);
            }
        }

        //multipartFile.transferTo(newFile);

        return null;

    }
}
