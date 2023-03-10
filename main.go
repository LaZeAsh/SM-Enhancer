package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"github.com/gin-gonic/gin"
	cohere "github.com/cohere-ai/cohere-go"
	godotenv "github.com/joho/godotenv"
	// "github.com/gin-contrib/cors"
)

var prompt string
func main() {
	server()
}

func getCohereResponse(ID string) string {
	godotenv.Load() // loads env variables
	POST := ID // this prompt will be received from HTTP request from chrome web extension
	PROMPT := "Your job is to respond to a social media post in an appropriate manner\nPost: \"" + POST + "\"\nResponse:"
	API_KEY := os.Getenv("COHERE_KEY") // gets COHERE_KEY env variable 
	co, err := cohere.CreateClient(API_KEY)
	// if there's an error this prints it and stops program
	if err != nil { // nil represents null
		fmt.Println(err)
		return err.Error()
	}
	
	// generates the text
	response, err := co.Generate(cohere.GenerateOptions{ 
		Model:             "", 
		Prompt: 		   PROMPT,	
		MaxTokens:         50, 
		Temperature:       0.9, 
		K:                 0, 
		P:                 0.75, 
		FrequencyPenalty:  0, 
		PresencePenalty:   0, 
		StopSequences:     []string{}, 
		ReturnLikelihoods: "NONE", 
	  }) 
	  // catching error
	  if err != nil { 
		fmt.Println(err) 
		return err.Error() 
	} 
	returnValue := strings.Split(response.Generations[0].Text, "\n")[0]
	// fmt.Println(returnValue)
	return returnValue
}

func comment(context *gin.Context) {
	var response responseStruct 

	context.BindJSON(&response)
	comment := getCohereResponse(response.ID) // to generate a response from Cohere
	fmt.Println(comment)
	context.IndentedJSON(http.StatusCreated, comment)
}
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {

        c.Header("Access-Control-Allow-Origin", "*")
        c.Header("Access-Control-Allow-Credentials", "true")
        c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

func server() {
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.POST("/comment", comment)
	router.Run("localhost:9090")
}

type responseStruct struct {
	ID 	string `json:"ID"`
}