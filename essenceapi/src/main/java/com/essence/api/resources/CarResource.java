package com.essence.api.resources;

import com.essence.api.Main;
import com.essence.api.objects.Car;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("car")
public class CarResource extends Main {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String add(Car car) {
        return dtb.add("car", car);
    }

    @GET
    @Path("all/{userid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String all(@PathParam("userid") String userid) {
        return dtb.getUserCars(userid);
    }

    @PUT
    @Path("{carid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(@PathParam("carid") String carid, Car car) {
        return dtb.update("car", car, carid);
    }

    @DELETE
    @Path("{carid}")
    public String delete(@PathParam("carid") String carid) {
        return dtb.delete("car", carid);
    }

}
