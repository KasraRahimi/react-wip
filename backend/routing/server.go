package routing

import (
	"backend/routing/routes"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func corsGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		fmt.Println("Did the middleware")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	}
}

func GetServerRouter() *gin.Engine {
	router := gin.Default()
	router.Use(corsGinMiddleware())

	api := router.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", routes.PostLoginEndpoint)
			auth.POST("/signup", routes.PostSignUpEndpoint)
		}
	}
	return router
}
