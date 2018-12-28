package com.essence.api.resources;

import com.essence.api.DatabaseRequest;
import com.essence.api.Main;
import com.essence.api.objects.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("user")
public class UserResource extends Main {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String add(User user) {
        return DatabaseRequest.status(dtb.add("user", user) != null);
    }

    @POST
    @Path("authenticate")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(User user) {
        return dtb.authenticate(user);
    }

}
