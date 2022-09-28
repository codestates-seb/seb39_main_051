package com.codestates.main.post;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final MemberService memberService;
    private final PostService postService;
    private final CommentService commentService;

    @PostConstruct
    public void init() {

        for (int i=1; i<=10; i++) {
            Member member1 = Member.builder()
                    .email("test" + i + "@naver.com")
                    .nickname("작성자" + i)
                    .password("1234")
                    .role(Member.ROLE.ROLE_USER)
                    .build();
            memberService.createMember(member1);

            Member member2 = Member.builder()
                    .email("test" + (i+10) + "@naver.com")
                    .nickname("작성자" + (i+10))
                    .password("1234")
                    .role(Member.ROLE.ROLE_USER)
                    .build();
            memberService.createMember(member2);

            Post post = Post.builder()
                    .title("제목" + i + " 입니다.")
                    .content("내용" + i + " 입니다.")
                    .type((i%2==0) ? "자유게시판" : "건의게시판")
                    .category((i%2==0) ? "유머" : "질문 추가 요청")
                    .member(member1)
                    .build();
            postService.createPost(post);

            Comment comment = Comment.builder()
                    .content("댓글" + i + " 입니다.")
                    .post(post)
                    .member(member2)
                    .build();

            Comment comment1 = Comment.builder()
                    .content("댓글" + i + " 입니다~")
                    .post(post)
                    .member(member1)
                    .build();
            commentService.creatComment(comment, post.getPostId(), member2.getMemberId());
            commentService.creatComment(comment1, post.getPostId(), member2.getMemberId());
        }
    }
}
