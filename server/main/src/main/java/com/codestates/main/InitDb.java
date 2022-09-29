package com.codestates.main;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.answer.service.AnswerService;
import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.service.PostService;
import com.codestates.main.question.entity.Question;
import com.codestates.main.question.service.QuestionService;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.questionCategory.service.QuestionCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final MemberService memberService;
    private final PostService postService;
    private final CommentService commentService;
    private final QuestionService questionService;
    private final QuestionCategoryService questionCategoryService;
    private final AnswerService answerService;

    String[] categories = new String[]{"Java", "React", "Spring", "Data Structure", "Operating System", "Database", "Network", "Javascript"};

    @PostConstruct
    public void init() {

        for(long i=0;i<categories.length;i++){
            QuestionCategory questionCategory = QuestionCategory.builder()
                    .questionCategoryId(i+1)
                    .name(categories[(int)i])
                    .build();
            questionCategoryService.createQuestionCategory(questionCategory);
        }

        for (int i=1; i<=5; i++) {
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

            QuestionCategory questionCategory = questionCategoryService.findQuestionCategory(1L);

            Question question = Question.builder()
                    .content("자바 언어 특징 4가지를 설명해주세요.")
                    .member(member1)
                    .questionCategory(questionCategory)
                    .build();
            questionService.creatQuestion(question);

            Answer answer = Answer.builder()
                    .content("고립에의 종류는 3가지가 있습니다.")
                    .member(member2)
                    .question(question)
                    .build();

            answerService.createAnswer(answer);

            Comment comment2 = Comment.builder()
                    .content("고립의 종류는 2가지 입니다.")
                    .answer(answer)
                    .member(member1)
                    .build();
            Comment comment3 = Comment.builder()
                    .content("제 생각에는 고립의 종류는 5가지라고 생각합니다.")
                    .answer(answer)
                    .member(member2)
                    .build();
            commentService.creatAnswerComment(comment2, answer.getAnswerId(), member1.getMemberId());
            commentService.creatAnswerComment(comment3, answer.getAnswerId(), member2.getMemberId());

        }
    }
}