package com.spring.services;

import java.util.List;

import com.spring.model.UserAttendance;

public interface userAttendanceService {
	public UserAttendance runProcedur();
	public void addAbsenIN(UserAttendance userAttendance);
	public void addAbsenOUT(UserAttendance userAttendance);
	public void afterLogin(UserAttendance userAttendance);
	public void addAbsenINcoba(int angka,byte[] file);
	public UserAttendance get(UserAttendance userAttendance);
	public List<UserAttendance> lists();
}
