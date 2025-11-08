package hu.nye.projekt.kolcsonzoapp.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hu.nye.projekt.kolcsonzoapp.config.JwtUtil;
import hu.nye.projekt.kolcsonzoapp.model.User;
import hu.nye.projekt.kolcsonzoapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtil jwtUtil;

    public User register(String username, String plainPassword, String name) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        String hash = BCrypt.hashpw(plainPassword, BCrypt.gensalt());
        User user = User.builder()
                .username(username)
                .passwordHash(hash)
                .name(name)
                .build();
        return userRepository.save(user);
    }

    public boolean checkPassword(User user, String plain) {
        return BCrypt.checkpw(plain, user.getPasswordHash());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String getToken(String username) {
        return jwtUtil.generateToken(username);
    }

    public User getUser(HttpServletRequest httpServletRequest){
        return userRepository.findByUsername(jwtUtil.extractUsername(httpServletRequest)).get();
    }

}