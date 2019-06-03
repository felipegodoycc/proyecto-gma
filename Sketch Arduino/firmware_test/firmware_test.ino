void setup() {
  Serial.begin(115200);
  Serial.println("Iniciando test");
}

void loop() {
  int raw = analogRead(A0);
  //int db = 10*log10((raw)/(pow(10,-12)));
  //Serial.println(db);
  Serial.println(raw);
  delay(100);
}
