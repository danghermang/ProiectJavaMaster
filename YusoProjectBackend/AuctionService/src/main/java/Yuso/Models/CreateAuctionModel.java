package Yuso.Models;

import java.util.Date;

public class CreateAuctionModel {
    public CreateAuctionModel(String name, String fromCity, String fromAddress, String fromPostalCode, String toCity, String toAddress, String toPostalCode, Date endDate, Date pickupOnDate, Date deliverOnDate, float weight, String aditionalDetails, String pickupGeo, String deliveryGeo) {
        Name = name;
        FromCity = fromCity;
        FromAddress = fromAddress;
        FromPostalCode = fromPostalCode;
        ToCity = toCity;
        ToAddress = toAddress;
        ToPostalCode = toPostalCode;
        EndDate = endDate;
        PickupOnDate = pickupOnDate;
        DeliverOnDate = deliverOnDate;
        Weight = weight;
        AditionalDetails = aditionalDetails;
        PickupGeo = pickupGeo;
        DeliveryGeo = deliveryGeo;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getFromCity() {
        return FromCity;
    }

    public void setFromCity(String fromCity) {
        FromCity = fromCity;
    }

    public String getFromAddress() {
        return FromAddress;
    }

    public void setFromAddress(String fromAddress) {
        FromAddress = fromAddress;
    }

    public String getFromPostalCode() {
        return FromPostalCode;
    }

    public void setFromPostalCode(String fromPostalCode) {
        FromPostalCode = fromPostalCode;
    }

    public String getToCity() {
        return ToCity;
    }

    public void setToCity(String toCity) {
        ToCity = toCity;
    }

    public String getToAddress() {
        return ToAddress;
    }

    public void setToAddress(String toAddress) {
        ToAddress = toAddress;
    }

    public String getToPostalCode() {
        return ToPostalCode;
    }

    public void setToPostalCode(String toPostalCode) {
        ToPostalCode = toPostalCode;
    }

    public Date getEndDate() {
        return EndDate;
    }

    public void setEndDate(Date endDate) {
        EndDate = endDate;
    }

    public Date getPickupOnDate() {
        return PickupOnDate;
    }

    public void setPickupOnDate(Date pickupOnDate) {
        PickupOnDate = pickupOnDate;
    }

    public Date getDeliverOnDate() {
        return DeliverOnDate;
    }

    public void setDeliverOnDate(Date deliverOnDate) {
        DeliverOnDate = deliverOnDate;
    }

    public float getWeight() {
        return Weight;
    }

    public void setWeight(float weight) {
        Weight = weight;
    }

    public String getAditionalDetails() {
        return AditionalDetails;
    }

    public void setAditionalDetails(String aditionalDetails) {
        AditionalDetails = aditionalDetails;
    }

    public String getPickupGeo() {
        return PickupGeo;
    }

    public void setPickupGeo(String pickupGeo) {
        PickupGeo = pickupGeo;
    }

    public String getDeliveryGeo() {
        return DeliveryGeo;
    }

    public void setDeliveryGeo(String deliveryGeo) {
        DeliveryGeo = deliveryGeo;
    }

    private String Name ;
    private String FromCity ;
    private String FromAddress ;
    private String FromPostalCode ;
    private String ToCity ;
    private String ToAddress ;
    private String ToPostalCode ;
    private Date EndDate ;
    private Date PickupOnDate ;
    private Date DeliverOnDate ;
    private float Weight ;
    private String AditionalDetails ;
    private String PickupGeo ;
    private String DeliveryGeo ;


    public CreateAuctionModel() {
    }
}
