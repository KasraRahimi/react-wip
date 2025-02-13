package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type userResponse struct {
	Id       string `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
}

func (s *ServerConfig) GetUserMe(c *gin.Context) {
	userId, _ := strconv.Atoi(c.GetString("userId"))

	user, err := s.UserDao.ReadById(userId)
	if err != nil {
		c.JSON(http.StatusNotFound, Error{
			Error: "Cannot find user",
		})
		return
	}

	c.JSON(http.StatusOK, userResponse{
		Id:       strconv.Itoa(user.Id),
		Email:    user.Email,
		Username: user.Username,
	})
}
