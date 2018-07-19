package com.spring.model;

import java.sql.Date;
import java.sql.Time;


public class UserAttendance {
	private int userID;
	private Date afterLogin;
    private byte[] userCaptureIN;
    private byte[] userCaptureOUT;
    private String userIN;
    private String userOUT;
	public String getUserOUT() {
		return userOUT;
	}
	private Time userTimeIN;
    private Date userDateIN;
	private Time userTimeOUT;
    private Date userDateOUT;
    private String locationin;
    private String locationout;
   
    
    
  

	
	
	public String getLocationin() {
		return locationin;
	}
	public void setLocationin(String locationin) {
		this.locationin = locationin;
	}
	public String getLocationout() {
		return locationout;
	}
	public void setLocationout(String locationout) {
		this.locationout = locationout;
	}
	public Time getUserTimeIN() {
		return userTimeIN;
	}
	public void setUserTimeIN(Time userTimeIN) {
		this.userTimeIN = userTimeIN;
	}
	public Date getUserDateIN() {
		return userDateIN;
	}
	public void setUserDateIN(Date userDateIN) {
		this.userDateIN = userDateIN;
	}
    public Time getUserTimeOUT() {
		return userTimeOUT;
	}
	public void setUserTimeOUT(Time userTimeOUT) {
		this.userTimeOUT = userTimeOUT;
	}
	public Date getUserDateOUT() {
		return userDateOUT;
	}
	public void setUserDateOUT(Date userDateOUT) {
		this.userDateOUT = userDateOUT;
	}
	public void setUserOUT(String userOUT) {
		this.userOUT = userOUT;
	}
	private String gambarIN;
    
    
	public Date getAfterLogin() {
		//System.out.println("ini afterlogin" + afterLogin);
		return afterLogin;
	}
	public void setAfterLogin(Date afterLogin) {
		this.afterLogin = afterLogin;
	}
	public String getGambarIN() {
		return gambarIN;
	}
	public void setGambarIN(String gambarIN) {
		this.gambarIN = gambarIN;
	}
	public byte[] getUserCaptureOUT() {
		return userCaptureOUT;
	}
	public void setUserCaptureOUT(byte[] userCaptureOUT) {
		this.userCaptureOUT = userCaptureOUT;
	}
	public UserAttendance() {
		// TODO Auto-generated constructor stub
	}
	public int getUserID() {
		//System.out.println("ini id "+userID);
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	public byte[] getUserCaptureIN() {
		return userCaptureIN;
	}
	public void setUserCaptureIN(byte[] userCaptureIN) {
		this.userCaptureIN = userCaptureIN;
	}
	
	public String getUserIN() {
	//	System.out.println("ini userIN"+userIN);
		return userIN;
	}
	public void setUserIN(String userIN) {
		
		this.userIN = userIN;
	}
	
	
}
