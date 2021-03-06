package com.skilldistillery.monkeywrench.security;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // this you get for free when you configure the db connection in application.properties file
    @Autowired
    private DataSource dataSource;

    // this bean is created in the application starter class if you're looking for it
    @Autowired
    private PasswordEncoder encoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll() // For CORS, the preflight request
        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()     // will hit the OPTIONS on the route
        
        .antMatchers("/api/equipment/**").permitAll()
        
        .antMatchers("/api/serviceCalls/**").permitAll()
        
        .antMatchers("/api/user/**").permitAll()
        // user
        .antMatchers(HttpMethod.GET,"/api/username/**").permitAll()
        .antMatchers(HttpMethod.GET,"/api/user").permitAll()
        .antMatchers(HttpMethod.GET,"/api/user/**").permitAll()
        .antMatchers(HttpMethod.DELETE,"/api/user/**").authenticated()
        .antMatchers(HttpMethod.PUT,"/api/user/**").authenticated()
        .antMatchers(HttpMethod.POST,"/api/user").authenticated()
        
        
        .antMatchers("/api/model/**").permitAll()
        
        .antMatchers("/api/type/**").permitAll()
        
        .antMatchers("/api/servicecomment/**").permitAll()
        
        .antMatchers("/api/servicecomments/**").permitAll()
        
        .antMatchers("/api/solution/**").permitAll()
        // Address
        .antMatchers(HttpMethod.GET,"/api/address").permitAll()
        .antMatchers(HttpMethod.GET,"/api/address/**").permitAll()
        .antMatchers(HttpMethod.DELETE,"/api/address/**").authenticated()
        .antMatchers(HttpMethod.PUT,"/api/address/**").authenticated()
        .antMatchers(HttpMethod.POST,"/api/address").authenticated()
        // ServiceType
        .antMatchers(HttpMethod.GET,"/api/servicetype").permitAll()
        .antMatchers(HttpMethod.GET,"/api/servicetype/**").permitAll()
        .antMatchers(HttpMethod.DELETE,"/api/servicetype/**").authenticated()
        .antMatchers(HttpMethod.PUT,"/api/servicetype/**").authenticated()
        .antMatchers(HttpMethod.POST,"/api/servicetype").authenticated()
        
        .antMatchers("/api/problem/**").permitAll()
        
        // Business
        .antMatchers(HttpMethod.GET,"/api/business").permitAll()
        .antMatchers(HttpMethod.GET,"/api/business/**").permitAll()
        .antMatchers(HttpMethod.DELETE,"/api/business/**").authenticated()
        .antMatchers(HttpMethod.PUT,"/api/business/**").authenticated()
        .antMatchers(HttpMethod.POST,"/api/business").authenticated()
        
        .antMatchers("/api/**").authenticated() // Requests for our REST API must be authorized.
        .anyRequest().permitAll()               // All other requests are allowed without authorization.
        .and()
        .httpBasic();                           // Use HTTP Basic Authentication

        http
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        String userQuery = "SELECT username, password, enabled FROM User WHERE username=?";
        String authQuery = "SELECT username, role FROM User WHERE username=?";
        auth
        .jdbcAuthentication()
        .dataSource(dataSource)
        .usersByUsernameQuery(userQuery)
        .authoritiesByUsernameQuery(authQuery)
        .passwordEncoder(encoder);
    }
}