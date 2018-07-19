package com.spring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.DAO.UserAttendDAO;
import com.spring.model.UserAttendance;
@Service
public class userAttendanceServiceImpl implements userAttendanceService{
	UserAttendDAO userAttendDAO;
	
	@Autowired
	public void setUserAttendDAO(UserAttendDAO userAttendDAO) {
		this.userAttendDAO = userAttendDAO;
	}

	
	public void addAbsenIN(UserAttendance userAttendance) {
		System.out.println(userAttendance.getLocationin());
		//System.out.println(userAttendance.getFile());
		userAttendDAO.addAbsenIN(userAttendance);
		
	}

	public List<UserAttendance> lists() {
		// TODO Auto-generated method stub
		return userAttendDAO.lists();
	}

	public UserAttendance get(UserAttendance userAttendance) {
		// TODO Auto-generated method stub
		return userAttendDAO.get(userAttendance);
	}


	public void addAbsenINcoba(int angka, byte[] file) {
		addAbsenINcoba(angka, file);
		
	}


	public void afterLogin(UserAttendance userAttendance) {
		userAttendDAO.afterLogin(userAttendance);
		
	}


	public void addAbsenOUT(UserAttendance userAttendance) {
		System.out.println(userAttendance.getUserID());
		System.out.println(userAttendance.getUserOUT());
		System.out.println(userAttendance.getAfterLogin());
		userAttendDAO.addAbsenOUT(userAttendance);
		
	}


	public UserAttendance runProcedur() {
		
		return userAttendDAO.runProcedur();
	}

}
