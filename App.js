/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

const handleCameraStream = (images, updatePreview, gl) => {
  const loop = async () => {
    const nextImageTensor = await images.next().value
    console.log(nextImageTensor.toFloat())
    console.log(nextImageTensor.expandDims(0))

    nextImageTensor.toFloat();
    // throws [Error: Argument 'x' passed to 'cast' must be a Tensor or TensorLike, but got 'Tensor']

    nextImageTensor.expandDims(0);
    // throws [Error: Argument 'x' passed to 'expandDims' must be a Tensor or TensorLike, but got 'Tensor']

    // if autorender is false you need the following two lines.
    // updatePreview();
    // gl.endFrameEXP();

    // requestAnimationFrame(loop);
  }
  loop();
}

const App = () => {

  useEffect(() => {
    (async() => {
      await Camera.requestCameraPermissionsAsync()
      await tf.ready()
    })();
  }, [])

  return (
    <SafeAreaView >
      <View>
        <Text> Hello</Text>
        <TensorCamera
        // Standard Camera props
        style={styles.camera}
        type={Camera.Constants.Type.back}
        // Tensor related props
        resizeHeight={640}
        resizeWidth={640}
        resizeDepth={3}
        onReady={handleCameraStream}
        // autorender={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '90%'
  }
});

export default App;
