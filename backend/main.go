package main

import (
	"Songthorsut/config"
	"Songthorsut/controller"
	"Songthorsut/controller/Member"
	"net/http"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", Member.SignUp)
	r.POST("/signin", Member.SignIn)

	router := r.Group("/")
	{
		router.GET("/member/:id", Member.GetMember)
		router.POST("/member", Member.CreateMember)
		router.PATCH("/member/:id", Member.UpdateMember)
		router.DELETE("/member/:id", Member.DeleteMember)

		router.GET("/seller/:id", controller.GetSeller)
		router.POST("/seller", controller.CreateSeller)
		router.PATCH("/seller/:id", controller.UpdateSeller)
		router.DELETE("/seller/:id", controller.DeleteSeller)

		router.GET("/products/:id", controller.GetProductsBYID)
		router.GET("/products", controller.GetProducts)
		router.POST("/products", controller.CreateProducts)
		router.PATCH("/products/:id", controller.UpdateProducts)
		router.DELETE("/products/:id", controller.DeleteProducts)

		//Select 
		router.GET("/years", controller.GetYears)
		router.GET("/instituteof", controller.GetInstituteOf)
		router.GET("/category", controller.GetCategory)
		router.GET("/condition", controller.GetCondition)
		// router.GET("/major", controller.GetMajor)

	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
