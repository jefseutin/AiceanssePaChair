package com.essence.api.objects;

public class Car {

    private String name, fuel, userID;
    private float consumption;

    public Car() {
    }

    public Car(String userID, String name, float consumption, String fuel) {
        this.userID = userID;
        this.fuel = fuel;
        this.name = name;
        this.consumption = consumption;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public float getConsumption() {
        return consumption;
    }

    public void setConsumption(float consumption) {
        this.consumption = consumption;
    }
}
