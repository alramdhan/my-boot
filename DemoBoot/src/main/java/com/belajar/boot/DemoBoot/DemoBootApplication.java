package com.belajar.boot.DemoBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class DemoBootApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		System.setProperty("server.servlet.context-path", "/DemoBoot");
		SpringApplication.run(DemoBootApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(DemoBootApplication.class);
	}
}
