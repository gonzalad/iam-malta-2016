package org.malta.iam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Notes :
 * * Cors with spring-security issue, see https://github.com/spring-projects/spring-boot/issues/5834
 *
 * @author agonzalez
 */
@Configuration
@EnableResourceServer
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class OAuth2ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        CorsFilter corsFilter = new CorsFilter(corsConfigurationSource);
        http
                .addFilterBefore(corsFilter, AbstractPreAuthenticatedProcessingFilter.class)
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/**").authenticated();
    }
}
