package com.belajar.boot.DemoBoot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class DatabaseConfig {
    @Autowired
    private Environment env;

    @Bean(name = "datasource")
    public DriverManagerDataSource getDatasource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
	    dataSource.setDriverClassName(env.getRequiredProperty("database.datasource.driverClassName"));
		dataSource.setUrl(env.getRequiredProperty("database.datasource.url"));
		dataSource.setUsername(env.getRequiredProperty("database.datasource.username"));
		dataSource.setPassword(env.getRequiredProperty("database.datasource.password"));
	    
	    return dataSource;
    }

    @Bean(name = "tm1")
    @Autowired
    @Primary
    public PlatformTransactionManager txManager() {
    	return new DataSourceTransactionManager(getDatasource());
    }
}