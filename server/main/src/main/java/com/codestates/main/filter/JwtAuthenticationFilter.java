package com.codestates.main.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.main.jwt.JwtTokenizer;
import com.codestates.main.member.entity.Member;
import com.codestates.main.oauth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("login 시도");
        ObjectMapper objectMapper = new ObjectMapper();    // (3-1)

        try {
            Member member = objectMapper.readValue(request.getInputStream(), Member.class); // (3-2)
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(member.getEmail(), member.getPassword());

            return authenticationManager.authenticate(authenticationToken);  // (3-4)
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // (3-3)


//        try {
//            ObjectMapper om = new ObjectMapper();
//            Member member = om.readValue(request.getInputStream(), Member.class);
//
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getEmail(), member.getPassword());
//
//            Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//            return authentication;
//        } catch (IOException e) {
//            e.printStackTrace();;
//        }
//        return null;
    }
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//
//        System.out.println("successfulAuthentication");
//        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
//
//        String jwtToken = JWT.create()
//                .withSubject("jwt token")
//                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 10)))
//                .withIssuedAt(new Date(System.currentTimeMillis()))
//                .withClaim("id", principalDetails.getMember().getMemberId())
//                .withClaim("email", principalDetails.getMember().getEmail())
//                .sign(Algorithm.HMAC512("cos_jwt_token"));
//        response.addHeader("Authorization", "Bearer " + jwtToken);
//    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {
        Member member = (Member) authResult.getPrincipal();  // (4-1)

        String accessToken = delegateAccessToken(member);   // (4-2)
        String refreshToken = delegateRefreshToken(member); // (4-3)

        response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
        response.setHeader("Refresh", refreshToken);                   // (4-5)
    }

    // (5)
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // (6)
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
