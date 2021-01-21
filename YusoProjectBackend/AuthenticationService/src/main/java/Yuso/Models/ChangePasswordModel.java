package Yuso.Models;

public class ChangePasswordModel {
    public ChangePasswordModel(String oldPassword, String newPassword) {
        OldPassword = oldPassword;
        NewPassword = newPassword;
    }

    private String OldPassword;
    private String NewPassword;

    public ChangePasswordModel() {
    }

    public String getOldPassword() {
        return OldPassword;
    }

    public void setOldPassword(String oldPassword) {
        OldPassword = oldPassword;
    }

    public String getNewPassword() {
        return NewPassword;
    }

    public void setNewPassword(String newPassword) {
        NewPassword = newPassword;
    }
}
