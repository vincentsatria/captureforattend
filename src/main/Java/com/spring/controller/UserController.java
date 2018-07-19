package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.spring.DAO.UserDAO;
import com.spring.model.UserData;
import com.spring.services.userAttendanceService;
import com.spring.services.userServices;
import com.spring.model.*;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	userServices userServices;
	@Autowired
	userAttendanceService userAttendanceService;
	
	@GetMapping("/user")
	public ResponseEntity<List<UserData>> list(){
		List<UserData> list = userServices.list();
		
		if(list.size() == 0) {
			return new ResponseEntity<List<UserData>>(HttpStatus.NO_CONTENT);
			
		}
		
		return new ResponseEntity<List<UserData>>(list,HttpStatus.OK);
		
		
	}
	@GetMapping("/run")
	public ResponseEntity<UserAttendance> run(){
		userAttendanceService.runProcedur();
		HttpHeaders header = new HttpHeaders();
		return new ResponseEntity<UserAttendance>(header,HttpStatus.OK);
	}
	@GetMapping("/user/list")
	public ResponseEntity<List<UserAttendance>> lists(){
		List<UserAttendance> lists = userAttendanceService.lists();
	
		if(lists.size() == 0) {
			return new ResponseEntity<List<UserAttendance>>(HttpStatus.NO_CONTENT);
			
		}
		
		return new ResponseEntity<List<UserAttendance>>(lists,HttpStatus.OK);
		
		
	}
	
	@PostMapping("/add")
	public ResponseEntity<Void> add(@RequestBody UserData userData){
		userServices.add(userData);
		System.out.println(userData);
		
		HttpHeaders header = new HttpHeaders();
		return new ResponseEntity<Void>(header, HttpStatus.CREATED);
		
		
	}

	@PostMapping("/add/absenIN")
	public ResponseEntity<Void> addAbsenIN(@RequestBody UserAttendance userAttendance){
		
		System.out.println(userAttendance.getLocationin()); 
		System.out.println(userAttendance.getUserIN());
		userAttendanceService.addAbsenIN(userAttendance);
		
		HttpHeaders header = new HttpHeaders();
		return new ResponseEntity<Void>(header, HttpStatus.CREATED);
		
		
	}
	
	@PutMapping("/add/absenOUT")
	public ResponseEntity<UserAttendance> absenOUT(@RequestBody UserAttendance userAttendance){
		System.out.println(userAttendance.getUserID());
		System.out.println(userAttendance.getUserOUT()+"\n");
		System.out.println(userAttendance.getAfterLogin());
	userAttendanceService.addAbsenOUT(userAttendance);
	return new ResponseEntity<UserAttendance>(userAttendance, HttpStatus.CREATED);
	}
	
	@PostMapping("/add/absenIN/coba")
	public ResponseEntity<UserAttendance> addAbsenINcoba(@RequestParam("userID") int userID,@RequestParam("file") byte[] fyle){
		
		userAttendanceService.addAbsenINcoba(userID, fyle);
		
		System.out.println(userID);
		System.out.println(fyle);
		
		
		
		HttpHeaders header = new HttpHeaders();
		return new ResponseEntity<UserAttendance>(header, HttpStatus.CREATED);
		
		
	}
	
	

	@PutMapping("/update/{userId}")
	public ResponseEntity<UserData> update(@PathVariable int userId,@RequestBody UserData userData){
		
	userServices.saveOrUpdate(userData);
	return new ResponseEntity<UserData>(userData, HttpStatus.CREATED);
	
	
	}
	
	
	
	
	
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<UserData> delete(@PathVariable int userId, UserData userData){
		
		userData.setUserID(userId);
		
		
		userServices.delete(userData);
		
		
		
		return new ResponseEntity<UserData>(userData, HttpStatus.NO_CONTENT);

	}
	@PostMapping("/user/login")
	public ResponseEntity<UserData> getIDandPWD(@RequestBody UserData userData){
		//UserRole result = new UserRole();
		UserData user = new UserData();
		user = userServices.get(userData);
		userServices.get(userData);	
		//System.out.println(user.getName());
		//result.setsUser(user);
		//System.out.println(user.getUserID());
		return new ResponseEntity<UserData>(user,HttpStatus.OK);
		
		
	}
	@PostMapping("/user/afterLogin")
	public ResponseEntity<Void> afterLogin(@RequestBody UserAttendance userAttendance){
		
			userAttendanceService.afterLogin(userAttendance);
		
		//System.out.println(userAttendance);
		
		
		
		HttpHeaders header = new HttpHeaders();
		return new ResponseEntity<Void>(header, HttpStatus.CREATED);
		
	}
}