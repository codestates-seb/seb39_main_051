package com.codestates.main.config;

import com.codestates.main.filter.JwtAuthenticationFilter;
import com.codestates.main.filter.JwtAuthorizationFilter;
import com.codestates.main.handler.MemberAuthenticationFailureHandler;
import com.codestates.main.handler.MemberAuthenticationSuccessHandler;
import com.codestates.main.jwt.JwtTokenizer;
import com.codestates.main.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
    private final CorsFilter corsFilter;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //http.addFilterBefore(new FirstFilter(), BasicAuthenticationFilter.class); // BasicAuthenticationFilter 이전에 내가 만든 FirstFilter 적용
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomDsl()); // 추가
                //.and()
                //.authorizeRequests()
                //.antMatchers("/answer/**")
                //.access("hasRole('관리자') or hasRole('일반 유저')")
                //.anyRequest()
                //.permitAll();
        return http.build();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter =new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            builder
                    //.addFilter(corsFilter)
                    .addFilter(jwtAuthenticationFilter)
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, memberRepository));;
        }
    }
}
