package com.spring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.DAO.*;
import com.spring.model.UserData;

@Service
public class userServiceImpl implements userServices{
	
	UserDAO userDAO;
	
	@Autowired
	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public void add(UserData userData) {
		userDAO.add(userData);
		
	}

	public void saveOrUpdate(UserData userData) {
		userDAO.saveOrUpdate(userData);
		
	}

	public void delete(UserData userData) {
		userDAO.delete(userData);
		
	}

	public Integer saveGetId(UserData userData) {
		// TODO Auto-generated method stub
		return null;
	}

	public UserData get(String user_id) {
		// TODO Auto-generated method stub
		return null;
	}

	public UserData get(UserData userData) {
		
		//userDAO.get(userData);
		return userDAO.get(userData);
	}

	public List<UserData> list() {
		// TODO Auto-generated method stub
		return userDAO.list();
	}

}
