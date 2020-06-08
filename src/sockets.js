const signalR = require("@aspnet/signalr");
const URL_SOCKETS = 'https://sockets.myapp.ws';
const TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0RkE4QzU4OUNBNDQxNEJCNEIzNzdGQkVBRkMzQUI1QkRDMUMzMUMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJoUHFNV0p5a1FVdTBzM2Y3NnZ3NnRiM0J3eHcifQ.eyJuYmYiOjE1OTE2MTM2NjEsImV4cCI6MTU5MTcwMDA2MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5teWFwcC53cyIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5Lm15YXBwLndzL3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoiYXBpMSIsInN1YiI6Ijk4ZGNkYmRlLWVmZGQtNDA5Yi1hN2U2LTJlYjJkMWE2NzQxYyIsImF1dGhfdGltZSI6MTU5MTYxMzY2MSwiaWRwIjoibG9jYWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiOThkY2RiZGUtZWZkZC00MDliLWE3ZTYtMmViMmQxYTY3NDFjIiwic2NvcGUiOlsib3BlbmlkIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.ILqf9_6-Bs45RKB9-oV4YQ_HJ-g2GQRjKWUUgA9uIKzShgpqMMLZ4lMuIvL4Kqxd5_LoBLeFlO3DO9yhE2ccBpO9MWit98k5lK5MXYhCnfWGGpTEQtKJpTQudVJDJPg14_Mk3vpMlwmrH8ZDc-GEardI28q7fs3EHqJomT1NW0xS9mprdkH6bIlHayVrLeAdMpdGexWDxO7fYVB-5cyws9m8kRvtG5hgFcZGD08394CvzATsuk9VTsauu2c52NjqDfAgY-Opu_32lwxio7ceeQ73dUxh0gnLjEvFzEHjwtzmd0u2G0BPANi9D3UO1PiJM9Jrb7eVNBZJVAZ7xZx9Zw';

export const hubConnection = new signalR.HubConnectionBuilder()
.withUrl(`${URL_SOCKETS}/sr/orders`, {accessTokenFactory: () => TOKEN})
.configureLogging(signalR.LogLevel.Information)
.build();

hubConnection.start()
.then(() => {
	console.log('hubConnection started')
}).catch(error => {
	console.log(error)
});

export const hubConnectionChat = new signalR.HubConnectionBuilder()
.withUrl(`${URL_SOCKETS}/sr/chat`, {accessTokenFactory: () => TOKEN})
.configureLogging(signalR.LogLevel.Information)
.build();

setInterval(function () {
	hubConnection
	.invoke('KeepAlive', '')
	.catch(err => console.log("hubConnection KeepAlive Error: " + err));

	hubConnectionChat
	.invoke('KeepAlive', '')
	.catch(err => console.log("hubConnectionChat KeepAlive Error: " + err));
}, 60000);