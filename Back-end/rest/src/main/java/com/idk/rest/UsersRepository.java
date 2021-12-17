package com.idk.rest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UsersRepository {
	private Connection cos;
	
	public UsersRepository() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			cos = DriverManager.getConnection("jdbc:mysql://localhost:3306/ruser?zeroDateTimeBehavior=CONVERT_TO_NULL&serverTimezone=UTC","root","1234"); 			
		}catch(Exception e) {
			System.out.print("\n------------il y a une erreur avex la conection :   "+e.getStackTrace());
		}
	}
	
	public List<User> getUsers() {
		List<User> users=new ArrayList<User>();
		try {
			Statement stm = cos.createStatement();	
			ResultSet result = stm.executeQuery("select * from users");
			while(result.next()) {
				User u = new User();
				u.setId(result.getInt(1));
				u.setFirstName(result.getString(2));
				u.setLastName(result.getString(3));
				u.setEmail(result.getString(4));
				u.setPassword(result.getString(5));
				u.setBirthDay(result.getString(6));
				
				users.add(u);
			}
		}catch(Exception e) {
			System.out.print(e);
		}
		return users;
	}
	
	
	public User getUser(int id) {
		List<User> users = getUsers();
		for(User u:users) {
			if(u.getId()==id)
				return u;
		}
		return new User();
	}

	public void createUser(User u) {
		boolean userIsValide = validate(u);
		if(userIsValide) {
			String firstName = u.getFirstName();
			String lastName = u.getLastName();
			String email = u.getEmail();
			String password = u.getPassword();
			String birthDay = u.getBirthDay();
			String query = "insert into users (firstName,lastName,email,password,birthDay) value ('"+firstName+"','"+lastName+"','"+email+"','"+password+"','"+ birthDay+"')";
			try {
				Statement stm = cos.createStatement();
				stm.executeUpdate(query);
			}catch(Exception e) {
				e.printStackTrace();
			}			
		}
	}
	
	public static boolean validate(User u) {
		if(u.getBirthDay()==null || u.getPassword()==null || u.getEmail()==null || u.getFirstName()==null || u.getLastName()==null ) {
			return false;
		}else {
			Pattern namePattern = Pattern.compile("^[a-zA-Z]{3,}$", Pattern.CASE_INSENSITIVE);
			Pattern emailPattern = Pattern.compile("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}", Pattern.CASE_INSENSITIVE);
			Pattern date = Pattern.compile("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$",Pattern.CASE_INSENSITIVE);
			Pattern pass = Pattern.compile("[a-zA-Z0-9]{5,}",Pattern.CASE_INSENSITIVE);
			
			Matcher firstName = namePattern.matcher(u.getFirstName());
			Matcher lastName = namePattern.matcher(u.getLastName());
			Matcher email = emailPattern.matcher(u.getEmail());
			Matcher birthDay = date.matcher(u.getBirthDay());
			Matcher password = pass.matcher(u.getPassword());
			
			if(firstName.find() && lastName.find() && email.find() && birthDay.find() && password.find()) 	
				return true;
			else
				return false;	
		}
	}

}
