package com.clocker;

import com.clocker.config.FileStorageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageConfig.class
})
public class ClockerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClockerApplication.class, args);
	}

}
