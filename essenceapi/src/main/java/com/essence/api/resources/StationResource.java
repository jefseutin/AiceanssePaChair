package com.essence.api.resources;

import com.essence.api.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/station")
public class StationResource extends Main {

    @Path("nearest/{longitude}/{latitude}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String nearestStations(@PathParam("longitude") double longitude, @PathParam("latitude") double latitude) {
        return dtb.getClosestStations(longitude, latitude);
    }
}
