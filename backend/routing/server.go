package routing

import (
	"backend/database"
	"backend/routing/routes"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func corsGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, token")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	}
}

func authorizationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("token")
		token, err := database.ParseToken(tokenString)
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		if time.Now().After(token.Ttl) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Set("userId", token.Id)
		c.Next()
	}
}

func GetServerRouter() *gin.Engine {
	router := gin.Default()
	router.Use(corsGinMiddleware())

	serverConfig := routes.ServerConfig{
		UserDao: database.UserDAO{},
	}

	api := router.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", serverConfig.PostLoginEndpoint)
			auth.POST("/signup", serverConfig.PostSignUpEndpoint)
		}

		authorized := api.Group("/")
		authorized.Use(authorizationMiddleware())
		{
			authorized.GET("/user/me", serverConfig.GetUserMe)
		}
	}

	static := router.Group("/static")
	{
		static.Static("/", "./static/")
	}
	return router
}
