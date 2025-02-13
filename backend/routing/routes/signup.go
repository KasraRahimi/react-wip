package routes

import (
	"backend/database"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

type signUpJson struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (s *ServerConfig) PostSignUpEndpoint(c *gin.Context) {
	var data signUpJson
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		c.JSON(http.StatusBadRequest, Error{
			Error: "Invalid JSON format",
		})
		return
	}

	passwordHash, err := database.GeneratePasswordHash(data.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Error{
			Error: "Could not generate password hash",
		})
		return
	}

	newUser := database.User{
		Email:        data.Email,
		Username:     data.Username,
		PasswordHash: passwordHash,
	}

	err = s.UserDao.Create(newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Error{
			Error: "Could not create account",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Successfully created account",
	})
}
