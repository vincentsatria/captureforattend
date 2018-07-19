package com.spring.DAO;

import java.sql.ResultSet;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import org.springframework.stereotype.Repository;


import com.spring.model.UserData;


@Repository

public class userDAOImpl implements UserDAO {
	private JdbcTemplate jdbctemplate;
	NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	public userDAOImpl(DataSource dataSource) {
		 new JdbcTemplate(dataSource);
		
	}
	@Autowired
	public void setDataSource(DataSource dataSource)throws DataAccessException{
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		
	}
	private SqlParameterSource getSqlParameterByModel(UserData userData) {
		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		if(userData != null) {
			paramSource.addValue("userID", userData.getUserID());
			paramSource.addValue("name", userData.getName());
			paramSource.addValue("password", userData.getPassword());
			paramSource.addValue("email", userData.getEmail());
			paramSource.addValue("Address", userData.getAddress());
			paramSource.addValue("phone", userData.getPhone());
			paramSource.addValue("company", userData.getCompany());
			paramSource.addValue("userRole", userData.getUserRole());
		}
		
		return paramSource;
	}
	public static final class UserMapper implements RowMapper<UserData>{
		public UserData mapRow(ResultSet rs, int rowNum) throws SQLException{
		UserData userData = new UserData();
		
			userData.setUserID(rs.getInt("userID"));
			userData.setName(rs.getString("userName"));
			userData.setPassword(rs.getString("password"));
			userData.setEmail(rs.getString("email"));
			userData.setAddress(rs.getString("Address"));
			userData.setPhone(rs.getString("phone"));
			userData.setCompany(rs.getString("company"));
			userData.setUserRole(rs.getString("userRole"));
		
		 return userData;
		}
	}


	public void add(UserData userData) {
		String sql = "INSERT INTO userdata(userID, userName, password, email, Address, phone, company, userRole) VALUES (:userID, :name, :password, :email, :Address, :phone, :company, :userRole)";
		
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModel(userData));
		
	}

	public void saveOrUpdate(UserData userData) {
		String sql ="UPDATE userdata SET userID = :userID, userName = :name ,password = :password, email = :email,Address = :Address,phone =:phone,company = :company, userRole= :userRole WHERE userID= :userID";
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModel(userData));
		
		
	}

	public void delete(UserData userData) {
		String sql ="DELETE FROM userdata WHERE userID = :userID";
		namedParameterJdbcTemplate.update(sql, getSqlParameterByModel(userData));
		System.out.println(userData.getUserID());
		
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
		
		String sql = "SELECT userID, userName, password, email, Address, phone, company, userRole FROM userdata WHERE email = '"+userData.getEmail()+"' AND password = '"+userData.getPassword()+"'";
		
		System.out.println(userData.getName());
		return namedParameterJdbcTemplate.queryForObject(sql, getSqlParameterByModel(userData), new UserMapper());
		
	    }
		
   

	public List<UserData> list() {
List<UserData> list = new ArrayList<UserData>();
		
		String sql = "SELECT * FROM userdata ORDER BY userName ASC";
		
		list = namedParameterJdbcTemplate.query(sql, getSqlParameterByModel(null), new UserMapper());
		return list;
	}

	

}
