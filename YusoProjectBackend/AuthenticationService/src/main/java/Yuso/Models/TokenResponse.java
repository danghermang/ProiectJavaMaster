package Yuso.Models;

public class TokenResponse {
    public String Token;

    public TokenResponse(String token) {
        Token = token;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }
}
