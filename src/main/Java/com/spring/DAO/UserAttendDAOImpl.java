package com.spring.DAO;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.sql.DataSource;
import javax.swing.text.html.parser.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.ParsedSql;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.stereotype.Repository;

import com.spring.model.UserAttendance;

@Repository
public class UserAttendDAOImpl implements UserAttendDAO {
	private JdbcTemplate jdbctemplate;
	NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private DataSource datasour;
	public UserAttendDAOImpl(DataSource dataSource) {
		new JdbcTemplate(dataSource);
	}
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		this.datasour = dataSource;
	}
	
	
	
	private SqlParameterSource getSqlParameterByModel(UserAttendance userAttendance)
	{
		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		if(userAttendance != null) 
		{
			paramSource.addValue("userID", userAttendance.getUserID());
			paramSource.addValue("afterLogin",userAttendance.getAfterLogin());
			paramSource.addValue("userCaptureIN", new SqlLobValue(new ByteArrayInputStream(userAttendance.getUserCaptureIN()),userAttendance.getUserCaptureIN().length,new DefaultLobHandler()),Types.BLOB);
			paramSource.addValue("userIN", userAttendance.getUserIN());
			paramSource.addValue("LOCATION_IN", userAttendance.getLocationin());
			//paramSource.addValue("userCaptureOUT", new SqlLobValue(new ByteArrayInputStream(userAttendance.getUserCaptureOUT()),userAttendance.getUserCaptureOUT().length,new DefaultLobHandler()),Types.BLOB);
			//paramSource.addValue("userOUT", userAttendance.getUserOUT());
			
		}
		return paramSource;
	}private SqlParameterSource getSqlParameterByModelLogOut(UserAttendance userAttendance)
	{
		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		if(userAttendance != null) 
		{
			paramSource.addValue("userID", userAttendance.getUserID());
			paramSource.addValue("afterLogin",userAttendance.getAfterLogin());
			paramSource.addValue("userOUT", userAttendance.getUserOUT());			
			paramSource.addValue("userCaptureOUT", new SqlLobValue(new ByteArrayInputStream(userAttendance.getUserCaptureOUT()),userAttendance.getUserCaptureOUT().length,new DefaultLobHandler()),Types.BLOB);
			paramSource.addValue("LOCATION_OUT", userAttendance.getLocationout());
			
		}
		return paramSource;
	}
	
	public static final class UserMapper implements RowMapper<UserAttendance>
	{
		public UserAttendance mapRow(ResultSet rs, int rowNum) throws SQLException
		{
			//SimpleDateFormat dateFormat = new SimpleDateFormat( "LLLL", Locale.getDefault() );
			//String date = dateFormat.format(rs.getString("userIN"));
			
			UserAttendance userAttendance = new UserAttendance();
			userAttendance.setUserID(rs.getInt("userID"));
			userAttendance.setUserCaptureIN(rs.getBytes("userCaptureIN"));
			userAttendance.setUserIN(rs.getString("userIN"));
			userAttendance.setUserTimeIN(rs.getTime("userIN"));
			userAttendance.setUserDateIN(rs.getDate("userIN"));
			userAttendance.setLocationin(rs.getString("LOCATION_IN"));
			userAttendance.setUserCaptureOUT(rs.getBytes("userCaptureOUT"));
			userAttendance.setUserOUT(rs.getString("userOUT"));
			userAttendance.setUserDateOUT(rs.getDate("userOUT"));
			userAttendance.setUserTimeOUT(rs.getTime("userOUT"));
			userAttendance.setLocationout(rs.getString("LOCATION_OUT"));
			
			return userAttendance;
		}
	}
	
	
	
	
	public void addAbsenIN(UserAttendance userAttendance) {

		
		String sql = "INSERT INTO userattend(userID, userCaptureIN, userIN, afterLogin,LOCATION_IN ) VALUES (:userID, :userCaptureIN, :userIN, :afterLogin,:LOCATION_IN)";
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModel(userAttendance));
	}

	public List<UserAttendance> lists() {
		List<UserAttendance> list = new ArrayList<UserAttendance>();
		//System.out.println(list.get(1));
		String sql ="SELECT * FROM userattend ORDER BY userIN ASC";
		list = namedParameterJdbcTemplate.query(sql, getSqlParameterByModel(null),new UserMapper());
		
	return list;
	}

	public UserAttendance get(UserAttendance userAttendance) {
		// TODO Auto-generated method stub
		return null;
	}

	public void addAbsenINcoba(int angka, byte[] file) {
		UserAttendance userAttendance = new UserAttendance();
		userAttendance.setUserID(angka);
		//userAttendance.setFile(file);
		String sql = "INSERT INTO userattend(userID, set userCaptureIN) VALUES (:userID, :userCaptureIN)";
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModel(userAttendance));
		
	}

	public void afterLogin(UserAttendance userAttendance) {
		// TODO Auto-generated method stub
		
	}

	public void addAbsenOUT(UserAttendance userAttendance) {
		System.out.println(userAttendance.getUserID());
		System.out.println(userAttendance.getUserOUT());
		System.out.println(userAttendance.getAfterLogin());
		
		String sql ="UPDATE userattend SET userCaptureOUT = :userCaptureOUT, userOUT = :userOUT,LOCATION_OUT = :LOCATION_OUT WHERE userID = :userID AND afterLogin = :afterLogin";
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModelLogOut(userAttendance));
	}
	
	public UserAttendance runProcedur() {
		String sql = "call getSelectedData";
		namedParameterJdbcTemplate.update(sql,getSqlParameterByModel(null));
		return null;
	}

	

	

}
