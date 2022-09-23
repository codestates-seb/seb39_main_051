package com.codestates.main.post.controller;

import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity postPost() {
        System.out.println("PostController.postPost");
        return null;
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") Long postId) {
        System.out.println("PostController.patchPost");
        return null;
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost() {
        System.out.println("PostController.getPost");
        return null;
    }

    @GetMapping
    public ResponseEntity getPosts(@RequestParam int page,
                                   @RequestParam int size) {
        System.out.println("PostController.getPosts");
        return null;
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost() {

        return null;
    }
}
