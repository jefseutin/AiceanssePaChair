package com.essence.api.objects;

import java.util.Map;

public class Station {

    private int id, zipcode;
    private String city, address;
    private Map<String, String> fuels;
    private Location location;

    public Station() {
    }

    public Station(int id, int zipcode, Location location, String city, String address, Map<String, String> fuels) {
        this.id = id;
        this.zipcode = zipcode;
        this.location = location;
        this.city = city;
        this.address = address;
        this.fuels = fuels;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Map<String, String> getFuels() {
        return fuels;
    }

    public void setFuels(Map<String, String> fuels) {
        this.fuels = fuels;
    }
}
