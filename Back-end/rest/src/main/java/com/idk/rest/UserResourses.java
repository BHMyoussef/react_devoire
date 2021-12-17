package com.idk.rest;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
public class UserResourses {
	UsersRepository repo = new UsersRepository();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUser() {
		return repo.getUsers();
	}
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("user/{id}")
	public User getUser(@PathParam("id") int id) {
		return repo.getUser(id);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("user")
	public User createUser(User u) {
		//System.out.print(u);
		repo.createUser(u);
		return u;
	}
	
}
