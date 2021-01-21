package Yuso.Entities;

import java.util.UUID;

public class Profile {
    public Profile(UUID userId, String firstName, String lastName, String address, String city, String county, String postalCode, String phone) {
        UserId = userId;
        FirstName = firstName;
        LastName = lastName;
        Address = address;
        City = city;
        County = county;
        PostalCode = postalCode;
        Phone = phone;
    }

    public UUID getUserId() {
        return UserId;
    }

    public void setUserId(UUID userId) {
        UserId = userId;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }

    public String getCounty() {
        return County;
    }

    public void setCounty(String county) {
        County = county;
    }

    public String getPostalCode() {
        return PostalCode;
    }

    public void setPostalCode(String postalCode) {
        PostalCode = postalCode;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public UUID UserId;
    public String FirstName;
    public String LastName;
    public String Address;
    public String City;
    public String County;
    public String PostalCode;
    public String Phone;
}
