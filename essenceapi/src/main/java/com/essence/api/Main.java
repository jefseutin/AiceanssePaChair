package com.essence.api;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class Main extends ResourceConfig {


    /**
     * Command for push on heroku
     * - login to heroku cli
     * - mvn clean heroku:deploy-war
     */


    public DatabaseRequest dtb;

    public Main() {
        property(ServerProperties.TRACING, "ALL");
        this.dtb = new DatabaseRequest();
    }

}
