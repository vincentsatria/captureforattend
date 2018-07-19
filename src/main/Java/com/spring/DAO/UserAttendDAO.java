package com.spring.DAO;


import java.util.List;

import com.spring.model.UserAttendance;

public interface UserAttendDAO {
	public UserAttendance runProcedur();
	public void addAbsenIN(UserAttendance userAttendance);
	public void addAbsenOUT(UserAttendance userAttendance);
	public void afterLogin(UserAttendance userAttendance);
	public void addAbsenINcoba(int angka,byte[] file);
	public List<UserAttendance> lists();
	public UserAttendance get(UserAttendance userAttendance);
	
}
