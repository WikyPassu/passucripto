import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-wagmi-charts';

const SIZE = Dimensions.get('window').height;

const Chart = ({sparkline, precision}) => {
  const [isChartActive, setIsChartActive] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Gráfico de los últimos 7 días:");
  const [currentSparkline, setCurrentSparkline] = useState(sparkline);
  const [currentButton, setCurrentButton] = useState(0);

  const handleCurrentButtonChange = (button, startIndex) => {
    if(!button){
      setCurrentTitle("Gráfico de los últimos 7 días:");
    }
    else if(button == 1){
      setCurrentTitle("Gráfico de los últimos 3 días:");
    }
    else{
      setCurrentTitle("Gráfico de las últimas 24 horas:");
    }
    setCurrentButton(button);
    setCurrentSparkline(sparkline.slice(startIndex));
  };

  return (
    <GestureHandlerRootView>
      <View style={{alignItems: "center", justifyContent: "center", margin: 20}}>
        <Text style={styles.chartTitle}>{currentTitle}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, !currentButton ? {borderWidth: 2, borderColor: "white"} : null]}
          onPress={() => handleCurrentButtonChange(0, 0)}
          disabled={!currentButton}
        >
          <Text style={styles.buttonText}>7D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentButton == 1 ? {borderWidth: 2, borderColor: "white"} : null]}
          onPress={() => handleCurrentButtonChange(1, 96)}
          disabled={currentButton == 1}
        >
          <Text style={styles.buttonText}>3D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentButton == 2 ? {borderWidth: 2, borderColor: "white"} : null]}
          onPress={() => handleCurrentButtonChange(2, 144)}
          disabled={currentButton == 2}
        >
          <Text style={styles.buttonText}>1D</Text>
        </TouchableOpacity>
      </View>
      <LineChart.Provider data={currentSparkline}>
        <LineChart height={SIZE / 4.2}>
          <LineChart.Path color="white">
            <LineChart.Gradient />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            color="white"
            onActivated={() => setIsChartActive(true)}
            onEnded={() => setIsChartActive(false)} />
          {
            !isChartActive ? null :
            <Animated.View style={styles.tooltip}>
              <LineChart.PriceText
                style={styles.chartDataPrice}
                precision={precision}
                format={({value}) => {
                  'worklet';
                  if(value){
                    const formattedNumber = parseFloat(value).toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    let newNumber = "";
                    for(let i=0; i<formattedNumber.length; i++){
                      if(formattedNumber[i] == '.')
                        newNumber += ",";
                      else if(formattedNumber[i] == ',')
                        newNumber += ".";
                      else
                        newNumber += formattedNumber[i];
                    }
                    return newNumber + " USD";
                  }
                }}
              />
              <LineChart.DatetimeText style={styles.chartDataDate} variant={"value"}/>
            </Animated.View>
          }
        </LineChart>
      </LineChart.Provider>
    </GestureHandlerRootView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  buttons: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center"
  },
  button: {
    width: 65,
    marginLeft: 5,
    marginRight: 5,
    padding: 3,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#300060"
  },
  chartTitle: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Comfortaa-Bold"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Comfortaa-Bold"
  },
  tooltip: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "#300060"
  },
  chartDataPrice: {
    color: "white",
    fontSize: 18,
    fontFamily: "Comfortaa-Bold"
  },
  chartDataDate: {
    color: "white",
    fontSize: 18,
    fontFamily: "Comfortaa-Bold",
    textAlign: "left"
  }
});