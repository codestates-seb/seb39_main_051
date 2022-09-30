package com.codestates.main.aspect;

import com.codestates.main.jwt.JwtTokenizer;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class SecurityAspect {
    @Value("${jwt.secret-key}")
    private String secretKey;
    private final JwtTokenizer jwtTokenizer;

    @Autowired
    public SecurityAspect(JwtTokenizer jwtTokenizer){
        this.jwtTokenizer = jwtTokenizer;
    }

    @Around("@annotation(TokenAop)")
    public Object verifyUser(ProceedingJoinPoint pjp) throws Throwable {
        ServletRequestAttributes requestAttributes =
                (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest httpServletRequest = requestAttributes.getRequest();

        String jwtToken = httpServletRequest.getHeader("Authorization");
        long memberId = jwtTokenizer
                .getMemberIdFromJwtHeader(jwtToken);
        System.out.println("토큰: "+jwtToken);
        System.out.println("멤버: "+memberId);
        return pjp.proceed(new Object[]{jwtToken});
    }
}
