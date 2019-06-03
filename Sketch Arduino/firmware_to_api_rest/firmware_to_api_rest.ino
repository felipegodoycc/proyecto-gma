#include <ESP8266WiFi.h>

#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

void setup() { 
  Serial.begin(115200);
  Serial.println("Iniciando");//Serial connection
  WiFi.begin("Game Dev", "Gamedev19.");   //WiFi connection
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(5, OUTPUT);
  
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    digitalWrite(LED_BUILTIN, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
    delay(1000);                      // Wait for a second
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    Serial.println("Waiting for connection"); 
  }
 
}
 
void loop() {
  
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    digitalWrite(LED_BUILTIN, LOW);
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject(); 
 
    JSONencoder["sensor"] = 3;
    JSONencoder["valor"] = analogRead(A0);
 
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    Serial.println(JSONmessageBuffer);
 
    HTTPClient http;    //Declare object of class HTTPClient
 
    http.begin("http://us-central1-gma-api-rest.cloudfunctions.net/api/send");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
 
    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();
    
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
    if(httpCode == 200){
      digitalWrite(5, HIGH);
      delay(200);
      digitalWrite(5, LOW);
    }
    http.end();  //Close connection
 
  } else {
    digitalWrite(LED_BUILTIN, LOW);   
    delay(500);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    Serial.println("Waiting for connection"); 

 
  }
 
  delay(5000);  //Send a request every 30 seconds
 
}
