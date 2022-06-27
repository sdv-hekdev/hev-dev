package mobilierhek.controller.config;

import mobilierhek.controller.interceptor.AuthentificationInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		//Configurez l'intercepteur d'authentification.
		registry.addInterceptor(new AuthentificationInterceptor())
					.excludePathPatterns("/api/utilisateur/connecter")
					.excludePathPatterns("/error");
	}
}
