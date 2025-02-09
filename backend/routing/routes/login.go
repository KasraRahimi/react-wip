package routes

import (
	"backend/database"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
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

type LoginHandler struct{}

func (h *LoginHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	var data loginStruct
	userDao := database.UserDAO{}
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, "The format of JSON information is incorrect")
		return
	}

	user, err := userDao.ReadByUsername(data.Username)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintln(w, "Incorrect username or password")
			return
		default:
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintln(w, "Something went wrong")
			return
		}
	}

	isPasswordCorrect := database.IsPasswordAndHashSame(data.Password, user.PasswordHash)
	if !isPasswordCorrect {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintln(w, "Incorrect username or password")
		return
	}

	responseUser := responseUser{
		Id:       user.Username,
		Email:    user.Email,
		Username: user.Username,
	}

	reponsePayload := loginResponse{
		Token: "empty-token",
		User:  responseUser,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reponsePayload)
}

func (h *LoginHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		h.handlePost(w, r)
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
		return
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintln(w, "You must use POST method for log in")
	}
}
