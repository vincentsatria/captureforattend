package com.spring.DAO;

import java.util.List;

import com.spring.model.UserData;

public interface UserDAO {
	public void add(UserData userData);
	public void saveOrUpdate(UserData userData);
    public void delete(UserData userData);
    public Integer saveGetId(UserData userData);
    public UserData get(String user_id);
    public UserData get(UserData userData);
    public List<UserData> list();
}
