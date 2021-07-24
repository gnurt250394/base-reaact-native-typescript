'use strict';

import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  Alert,
  Easing,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

let {width, height} = Dimensions.get('window');
const BuyCar = () => {
  const ButtonRef = useRef<any>();
  const [state, setState] = useState({
    animateBtnX: 0,
    animateBtnY: -999,
    addBtnY: -999,
    addBtnX: 0,
    runAnim: new Animated.Value(0),
    endX: 26, // The position of the shopping cart is 26 pixels from the left side of the screen
    endY: height - 44, // The position of the shopping cart is 44 pixels from the bottom of the screen
    curvature: 0.003, // Animation toss height coefficient, the larger the value, the higher the toss
    duration: 800, // animation movement time
  });

  // Get the click coordinate XY
  function getScreenXY(i, item) {
    // const handle = findNodeHandle(ButtonRef.current[i]);
    ButtonRef.current[i].measure((x, y, width, height, pageX, pageY) => {
      console.log(x, y, width, height, pageX, pageY);
      let data = item;
      let pos = [pageX, pageY, state.endX, state.endY];
      setState({
        ...state,
        addBtnY: pageY,
        addBtnX: pageX,
      });
      run(pos, data);
    });
  }
  // Run animation
  const run = (position: number[] = [], data = {}) => {
    if (position.length != 4) {
      return;
    }
    state.runAnim.setValue(0);
    const {inputRange, outputX, outputY} = getPaths(position);
    // console.log(inputRange, outputX, outputY)
    setState({
      ...state,
      animateBtnX: state.runAnim.interpolate({
        inputRange: inputRange,
        outputRange: outputX,
      }),
      animateBtnY: state.runAnim.interpolate({
        inputRange: inputRange,
        outputRange: outputY,
      }),
    });
    // console.log(state.animateBtnX,state.animateBtnY)
    Animated.timing(state.runAnim, {
      toValue: inputRange.length,
      duration: state.duration,
      easing: Easing.linear, // Easing function
      useNativeDriver: false,
    }).start(() => {
      state.runAnim.setValue(0);
      setState({
        ...state,
        addBtnY: -999,
        addBtnX: 0,
      });
    });
  };

  // get the path
  const getPaths = position => {
    const [startX, startY, endX, endY] = position;
    const {curvature} = state,
      speed = 500; //166.67
    let diffX = endX - startX,
      diffY = endY - startY;
    let b = (diffY - curvature * diffX * diffX) / diffX,
      start_x = 0,
      rate = diffX > 0 ? 1 : -1,
      inputRange: any[] = [],
      outputX: any[] = [],
      outputY: any[] = [];
    let step = () => {
      let tangent = 2 * curvature * start_x + b;
      start_x = start_x + rate * Math.sqrt(speed / (tangent * tangent + 1));
      if ((rate == 1 && start_x > diffX) || (rate == -1 && start_x < diffX)) {
        start_x = diffX;
      }
      let x = start_x,
        y = curvature * x * x + b * x;
      inputRange.push(outputX.length);
      outputX.push(x);
      outputY.push(y);
      if (start_x !== diffX) {
        step();
      }
    };
    step();
    return {inputRange, outputX, outputY};
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.scrollView}>
        {[
          'Captain America',
          'Green Arrow',
          'Superman',
          'Batman',
          'Antman',
          'Hulk',
          'Catwoman',
          'Iron Man',
          'Thor Thor',
          'Black Widow',
          ' Eagle Eye Man ',
          ' Huluwa ',
          ' Sun Wukong ',
          ' Bull Demon King ',
          ' Nezha ',
          ' Tang Seng ',
        ].map((item, i) => {
          return (
            <View style={styles.addBtn} key={i}>
              <TouchableOpacity
                ref={ref => (ButtonRef.current[i] = ref)}
                onPress={getScreenXY.bind(this, i, item)}>
                <Icon name={'ios-add-circle'} size={26} color={'#3190e8'} />
              </TouchableOpacity>
              <Text
                style={{fontSize: 14, color: '#333', paddingHorizontal: 10}}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Animated.View
        style={[
          styles.tmpBtn,
          {
            top: state.addBtnY,
            left: state.addBtnX,
            transform: [
              {translateX: state.animateBtnX},
              {translateY: state.animateBtnY},
            ],
          },
        ]}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'red',
            borderRadius: 20,
          }}></View>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: width,
          height: 60,
          flexDirection: 'row',
        }}>
        <View style={{flex: 2, backgroundColor: '#3190e8'}}></View>
        <View style={{flex: 8, backgroundColor: '#000000'}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  scrollView: {
    marginBottom: 60,
  },
  tmpBtn: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
export default BuyCar;
