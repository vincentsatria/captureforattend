package com.spring.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import com.spring.DAO.UserDAO;
import com.spring.DAO.userDAOImpl;




@Component
@EnableAsync
@ComponentScan(basePackages="com.spring.*")
@PropertySource("classpath:config.properties")
		public class AppConfig {
			@Autowired
			private Environment env;
			@Bean
			public DataSource getDataSource(){
			DriverManagerDataSource dataSource = new DriverManagerDataSource();
			String dataBaseUrl = env.getProperty("database.url");		
			String driverClass = env.getProperty("database.class");
			String databaseUser= env.getProperty("database.user");
	        String databasePwd = env.getProperty("database.password");
	        System.out.println("** Mengambil Data Class ** " + driverClass);
	        System.out.println("** Mengambil Data Source ** " + dataBaseUrl);
	        System.out.println("** " + databaseUser +"/"+databasePwd);
	        dataSource.setDriverClassName(driverClass);
	        dataSource.setUrl(dataBaseUrl);
	        dataSource.setUsername(databaseUser);
	        dataSource.setPassword(databasePwd);
	        return dataSource;
			}
			
		    public UserDAO getUsersDAO(){
		    	return new userDAOImpl(getDataSource());
		    }
	}
