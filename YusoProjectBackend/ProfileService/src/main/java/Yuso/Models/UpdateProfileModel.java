package Yuso.Models;

public class UpdateProfileModel {
    public UpdateProfileModel() {
    }

    public UpdateProfileModel(String firstName, String lastName, String address, String city, String county, String postalCode, String phone) {
        FirstName = firstName;
        LastName = lastName;
        Address = address;
        City = city;
        County = county;
        PostalCode = postalCode;
        Phone = phone;
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

    private String FirstName;
    private String LastName;
    private String Address;
    private String City;
    private String County;
    private String PostalCode;
    private String Phone;
}
