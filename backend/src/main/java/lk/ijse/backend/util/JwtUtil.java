package lk.ijse.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lk.ijse.backend.dto.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;


    public String generateToken(UserRegistrationDTO userRegistrationDTO) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userRegistrationDTO.getRole());
        claims.put("id", userRegistrationDTO.getId());
        return doGenerateToken(claims, userRegistrationDTO.getEmail(), 1000 * 60 * 10);
    }
    public String doGenerateToken(Map<String, Object> claims, String subject, int expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ expiration))
                .signWith(SignatureAlgorithm.HS256,secretKey).compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);

    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimFromToken(token);
        return claimsResolver.apply(claims);
    }
    private Claims getAllClaimFromToken(String token) {
        return  Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}
