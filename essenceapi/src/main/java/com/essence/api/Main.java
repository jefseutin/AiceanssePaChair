package com.essence.api;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class Main extends ResourceConfig {

    public DatabaseRequest dtb;

    public Main() {
        property(ServerProperties.TRACING, "ALL");
        this.dtb = new DatabaseRequest();
    }

}
