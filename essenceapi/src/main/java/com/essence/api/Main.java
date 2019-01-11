package com.essence.api;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import javax.ws.rs.ApplicationPath;
import java.util.Timer;

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

        //update data every 15 minutes
        Timer timer = new Timer();
        timer.schedule(new DataParser(), 0, 15 * 60 * 1000);
    }

}
