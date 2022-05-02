package adweb.lab2.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import adweb.lab2.mybatis.SqlSessionLoader;
import adweb.lab2.mybatis.po.User;
import adweb.lab2.request.UserLoginRequest;
import adweb.lab2.request.UserRegisterRequest;
import adweb.lab2.response.ListUserResponse;
import adweb.lab2.response.MsgResponse;
import adweb.lab2.response.UserResponse;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;

@Controller
public class UserController {

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public @ResponseBody
    String register(UserRegisterRequest request) {
        SqlSession sqlSession;
        try {
            sqlSession = SqlSessionLoader.getSqlSession();
        } catch (IOException e) {
            return JSON.toJSONString(new MsgResponse(401, "IOException in  Sql Session"), SerializerFeature.WriteNullStringAsEmpty);
        }
        User user = sqlSession.selectOne("adweb.lab2.UserMapper.findUserByUsername",
                request.getUsername());
        if (user != null) {
            sqlSession.close();
            return JSON.toJSONString(new MsgResponse(401, "The username is already used"), SerializerFeature.WriteNullStringAsEmpty);
        } else {
            sqlSession.insert("adweb.lab2.UserMapper.addUser", new
                    User(request.getUsername(), request.getPassword(), request.getEmail(),
                    request.getPhone()));
            sqlSession.commit();
            sqlSession.close();
            UserResponse response = new UserResponse(request.getUsername(), request.getPassword());
            response.setMsg("register success!");
            return JSON.toJSONString(response, SerializerFeature.WriteNullStringAsEmpty); // use your generated token here.
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public @ResponseBody
    String login(UserLoginRequest request) {
        System.out.println(request.getUsername() + " " + request.getPassword());
        String msg = "";
        SqlSession sqlSession;
        try {
            sqlSession = SqlSessionLoader.getSqlSession();
        } catch (IOException e) {
            msg = JSON.toJSONString(new MsgResponse(401, "IOException in  Sql Session"), SerializerFeature.WriteNullStringAsEmpty);
            return msg;
        }
        User user = sqlSession.selectOne("adweb.lab2.UserMapper.findUserByUsername",
                request.getUsername());
        if (user == null) {
            sqlSession.close();
            msg = JSON.toJSONString(new MsgResponse(401, "The username is not found"), SerializerFeature.WriteNullStringAsEmpty);
        } else if (!user.getPassword().equals(request.getPassword())) {
            sqlSession.close();
            msg = JSON.toJSONString(new MsgResponse(401, "Passwords does not match"), SerializerFeature.WriteNullStringAsEmpty);
        } else {
            String token = new UserResponse(request.getUsername(), request.getPassword()).getToken();
            sqlSession.close();
            msg = JSON.toJSONString(new MsgResponse(200, "Login success"), SerializerFeature.WriteNullStringAsEmpty);
        }
        System.out.println(msg);
        return msg;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/list", method = RequestMethod.POST)
    public @ResponseBody
    Object listUser() {
        SqlSession sqlSession;
        try {
            sqlSession = SqlSessionLoader.getSqlSession();
        } catch (IOException e) {
            return new MsgResponse(401, "IOException in  Sql Session");
        }
        List<User> userList = sqlSession.selectList("adweb.lab2.UserMapper.listAllUsers");
        sqlSession.close();
        return new ListUserResponse(userList);
    }
}
