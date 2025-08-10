
FROM golang:1.22 as builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o my_go_app


FROM alpine:latest

RUN adduser -D appuser

WORKDIR /home/appuser

COPY --from=builder /app/my_go_app .

USER appuser

EXPOSE 8080

CMD ["./my_go_app"]
