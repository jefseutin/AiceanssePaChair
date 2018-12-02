package object;

import java.util.Map;

public class Station {

    private int id, zipcode;
    private double latitude, longitude;
    private String city, address;
    private Map<String, String> fuels;

    public Station() {
    }

    public Station(int id, int zipcode, double latitude, double longitude, String city, String address, Map<String, String> fuels) {
        this.id = id;
        this.zipcode = zipcode;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
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
