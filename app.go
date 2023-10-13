package main

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

var rdb *redis.Client

func (a *App) Connect(clientName string, address string, port string, password string) error {
	var address_with_port = address + ":" + port

	rdb = redis.NewClient(&redis.Options{
		ClientName: clientName,
		Addr:       address_with_port,
		Password:   password,
	})

	_, err := rdb.Ping(a.ctx).Result()

	return err
}

func (a *App) Logout() error {
	err := rdb.Close()

	return err
}

type KeyValue struct {
	Key      string `json:"key"`
	Value    string `json:"value"`
	ExpireAt string `json:"expireAt"`
}

func (a *App) GetKeys() ([]KeyValue, error) {
	var cursor uint64
	var keyValues []KeyValue

	for {
		var keys []string
		var err error

		keys, cursor, err = rdb.Scan(a.ctx, cursor, "*", 0).Result()

		if err != nil {
			return keyValues, err
		}

		for _, key := range keys {
			expireAt := ""
			value, err := rdb.Get(a.ctx, key).Result()

			if err != nil {
				return keyValues, err
			}

			duration, _ := rdb.ExpireTime(a.ctx, key).Result()

			if duration.Seconds() > 0 {
				expire := time.Unix(duration.Milliseconds()/1000, 0)
				expireAt = expire.String()
			}

			var keyValue = KeyValue{
				Key:      key,
				Value:    value,
				ExpireAt: expireAt,
			}

			keyValues = append(keyValues, keyValue)
		}

		if cursor == 0 {
			break
		}
	}

	return keyValues, nil
}

func (a *App) SetKey(key string, value string) error {
	err := rdb.Set(a.ctx, key, value, 0).Err()

	return err
}

func (a *App) DelKey(key string) error {
	err := rdb.Del(a.ctx, key).Err()

	return err
}

func (a *App) DeleteAllKeys() error {
	err := rdb.FlushAll(a.ctx).Err()

	return err
}
