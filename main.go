package main

import (
	"fmt"
	"os"
	"strings"
	cohere "github.com/cohere-ai/cohere-go"
	godotenv "github.com/joho/godotenv"
)

func main() {
	fmt.Println(getCohereResponse())
}

func getCohereResponse() string {
	godotenv.Load() // loads env variables
	POST := "Today is a horrible day! I dont like elon musk :(" // this prompt will be received from HTTP request
	PROMPT := "Your job is to respond to a social media post in an appropriate manner\nPost: \"" + POST + "\"\nResponse:"
	API_KEY := os.Getenv("COHERE_KEY") 
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
		// NumGenerations:    {1}, 
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
	return returnValue
}