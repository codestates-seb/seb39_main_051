package com.codestates.main.comment.controller;

import com.codestates.main.comment.service.CommentService;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postComment() {
        System.out.println("CommentController.postComment");
        return null;
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") Long commentId) {
        System.out.println("CommentController.patchComment");
        return null;
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment() {
        System.out.println("CommentController.getComment");
        return null;
    }

    @GetMapping
    public ResponseEntity getComments(@RequestParam int page,
                                   @RequestParam int size) {
        System.out.println("CommentController.getComments");
        return null;
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment() {

        return null;
    }
}
