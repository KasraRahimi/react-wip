package routes

import (
	"backend/database"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type loginStruct struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type responseUser struct {
	Id       string `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
}

type loginResponse struct {
	Token string       `json:"token"`
	User  responseUser `json:"user"`
}

type Error struct {
	Error string `json:"error"`
}

func (s *ServerConfig) PostLoginEndpoint(c *gin.Context) {
	var data loginStruct
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			Error{
				Error: "The format of the JSON is incorrect",
			},
		)
		return
	}

	user, err := s.UserDao.ReadByUsername(data.Username)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			c.JSON(http.StatusUnauthorized, Error{
				Error: "Incorrect username or password",
			})
			return
		default:
			c.JSON(http.StatusInternalServerError, Error{
				Error: "Something went wrong",
			})
			return
		}
	}

	isPasswordCorrect := database.IsPasswordAndHashSame(data.Password, user.PasswordHash)
	if !isPasswordCorrect {
		c.JSON(http.StatusUnauthorized, Error{
			Error: "Incorrect username or password",
		})
		return
	}

	responseUser := responseUser{
		Id:       strconv.Itoa(user.Id),
		Email:    user.Email,
		Username: user.Username,
	}

	tokenString, err := database.GenerateToken(responseUser.Id, 60)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Error{
			Error: err.Error(),
		})
		return
	}

	reponsePayload := loginResponse{
		Token: tokenString,
		User:  responseUser,
	}

	c.JSON(http.StatusOK, reponsePayload)
}
