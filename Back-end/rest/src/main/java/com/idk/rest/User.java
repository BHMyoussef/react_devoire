package com.idk.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class User {
	private int id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String birthDay;
	
	
	//Getters
	public int getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
	public String getBirthDay() {
		return birthDay;
	}

	//Setters
	public void setId(int id) {
		this.id=id;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setBirthDay(String dateDeNaissance) {
		this.birthDay = dateDeNaissance;
	}

	public String toString() {
		return "\nUser: {\n\tnom: "+firstName+"\n\tprenom :"+lastName+"\n\temail: "+email+"\n\tdateDeNaissance: "+birthDay+"\n\tpassword: "+password+ "\n}";
	}
}
